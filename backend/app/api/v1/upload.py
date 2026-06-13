from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from app.api.deps import get_current_user_id
from app.database import get_db, Client
from app.services.parser import parse_chat_file
from app.services.analytics import analyze_chat_dataframe
from app.services.gemini import analyze_chat_with_gemini
import uuid

router = APIRouter()

@router.post("")
async def upload_whatsapp_chat(
    file: UploadFile = File(...),
    current_user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db)
):
    # Validate file extension
    if not file.filename.endswith('.txt'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Only WhatsApp .txt transcripts are supported."
        )

    try:
        # Read file contents
        content_bytes = await file.read()
        file_content = content_bytes.decode("utf-8", errors="ignore")
        
        # 1. Parse lines
        parsed_messages = parse_chat_file(file_content)
        if not parsed_messages:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empty or un-parsable WhatsApp transcript."
            )
            
        # 2. Run pandas dataframe analytics
        analytics = analyze_chat_dataframe(parsed_messages)
        
        # 3. Request Gemini AI analysis on a representative slice (e.g., first 80 messages)
        text_sample = "\n".join([
            f"[{msg['date']} {msg['time']}] {msg['sender']}: {msg['message']}" 
            for msg in parsed_messages[:80]
        ])
        ai_insights = analyze_chat_with_gemini(text_sample)

        # 4. Save metadata record to Supabase analyses table
        analysis_id = str(uuid.uuid4())
        analysis_data = {
            "id": analysis_id,
            "user_id": current_user_id,
            "filename": file.filename,
            "file_size_bytes": len(content_bytes),
            "total_messages": analytics["total_messages"],
            "total_words": analytics["total_words"],
            "media_shared_count": analytics["media_shared"],
            "links_shared_count": analytics["links_shared"]
        }
        
        db.table("analyses").insert(analysis_data).execute()

        # 5. Save sub-dimension records in bulk
        # Daily Activity
        daily_records = [
            {"analysis_id": analysis_id, "date": f"2026-01-0{i+1}", "message_count": item["message_count"]}
            for i, item in enumerate(analytics["daily_activity"])
        ]
        if daily_records:
            db.table("daily_activity").insert(daily_records).execute()
            
        # Monthly Timeline
        monthly_records = [
            {"analysis_id": analysis_id, "month_year": item["month_year"], "message_count": item["message_count"]}
            for item in analytics["monthly_timeline"]
        ]
        if monthly_records:
            db.table("monthly_timeline").insert(monthly_records).execute()

        # Active Users
        user_records = [
            {
                "analysis_id": analysis_id, 
                "sender_name": item["sender_name"], 
                "message_count": item["message_count"],
                "word_count": item["word_count"]
            }
            for item in analytics["active_users"]
        ]
        if user_records:
            db.table("active_users").insert(user_records).execute()

        # Emoji Analysis
        emoji_records = [
            {"analysis_id": analysis_id, "emoji": item["emoji"], "count": item["count"]}
            for item in analytics["emoji_analysis"]
        ]
        if emoji_records:
            db.table("emoji_analysis").insert(emoji_records).execute()

        # AI Insights
        ai_insights_data = {
            "analysis_id": analysis_id,
            "toxicity_score": ai_insights["toxicity_score"],
            "detected_language": ai_insights["detected_language"],
            "ai_summary": ai_insights["ai_summary"],
            "topics_detected": ai_insights["topics_detected"],
            "relationship_score": ai_insights["relationship_score"]
        }
        db.table("ai_insights").insert(ai_insights_data).execute()

        # Return full details immediately
        return {
            "status": "success",
            "analysis_id": analysis_id,
            "message": "Chat file uploaded and parsed successfully.",
            "data": {
                "metadata": analysis_data,
                "analytics": analytics,
                "ai_insights": ai_insights_data
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process chat: {str(e)}"
        )

from fastapi import APIRouter, Depends, HTTPException, status
from app.api.deps import get_current_user_id
from app.database import get_db, Client
from app.schemas.schemas import DetailedReportResponse

router = APIRouter()

@router.get("/{analysis_id}", response_model=DetailedReportResponse)
def get_analysis_details(
    analysis_id: str,
    current_user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db)
):
    # 1. Fetch metadata analysis record and verify user permission
    analysis_res = db.table("analyses").select("*").eq("id", analysis_id).execute()
    if not analysis_res.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis report not found."
        )
        
    analysis_data = analysis_res.data[0]
    if analysis_data["user_id"] != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to view this analysis report."
        )

    try:
        # 2. Query related active users
        users_res = db.table("active_users").select("*").eq("analysis_id", analysis_id).execute()
        
        # 3. Query emoji frequencies
        emoji_res = db.table("emoji_analysis").select("*").eq("analysis_id", analysis_id).execute()
        
        # 4. Query timelines
        monthly_res = db.table("monthly_timeline").select("*").eq("analysis_id", analysis_id).execute()
        daily_res = db.table("daily_activity").select("*").eq("analysis_id", analysis_id).execute()
        
        # 5. Query AI Summary insights
        ai_res = db.table("ai_insights").select("*").eq("analysis_id", analysis_id).execute()
        
        ai_insights = ai_res.data[0] if ai_res.data else {
            "toxicity_score": 0.0,
            "detected_language": "Unknown",
            "ai_summary": "No AI insights generated.",
            "topics_detected": [],
            "relationship_score": []
        }

        # Build response payload
        return {
            "analysis_id": analysis_id,
            "metadata": {
                "filename": analysis_data["filename"],
                "total_messages": analysis_data["total_messages"],
                "total_words": analysis_data["total_words"],
                "media_shared": analysis_data["media_shared_count"],
                "links_shared": analysis_data["links_shared_count"]
            },
            "active_users": [
                {
                    "sender_name": item["sender_name"],
                    "message_count": item["message_count"],
                    "word_count": item["word_count"]
                } for item in users_res.data
            ],
            "emoji_analysis": [
                {
                    "emoji": item["emoji"],
                    "count": item["count"]
                } for item in emoji_res.data
            ],
            "timeline": {
                "monthly": [
                    {
                        "month_year": item["month_year"],
                        "message_count": item["message_count"]
                    } for item in monthly_res.data
                ],
                "daily_activity": [
                    {
                        "name": "Day",  # Default category mapping fallback
                        "message_count": item["message_count"]
                    } for item in daily_res.data
                ]
            },
            "ai_insights": {
                "toxicity_score": ai_insights["toxicity_score"],
                "detected_language": ai_insights["detected_language"],
                "ai_summary": ai_insights["ai_summary"],
                "topics_detected": ai_insights["topics_detected"],
                "relationship_score": ai_insights["relationship_score"]
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch report aggregates: {str(e)}"
        )

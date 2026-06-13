from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user_id
from app.database import get_db, Client
from app.schemas.schemas import HistoryItemResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[HistoryItemResponse])
def get_user_analysis_history(
    current_user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db)
):
    try:
        response = db.table("analyses")\
            .select("id, filename, total_messages, created_at")\
            .eq("user_id", current_user_id)\
            .order("created_at", desc=True)\
            .execute()
            
        history_list = []
        for item in response.data:
            history_list.append({
                "id": item["id"],
                "filename": item["filename"],
                "total_messages": item["total_messages"],
                "created_at": item["created_at"]
            })
            
        return history_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {str(e)}")

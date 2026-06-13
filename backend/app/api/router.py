from fastapi import APIRouter
from app.api.v1 import auth, upload, history, analytics

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(upload.router, prefix="/upload", tags=["Upload"])
api_router.include_router(history.router, prefix="/history", tags=["History"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "WhatsInsight AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # Supabase credentials (populated via environment variables)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-supabase-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your-supabase-anon-key")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    # JWT Settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "super-secret-key-change-in-production-123456")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 Hours
    
    # Gemini API Key
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    class Config:
        case_sensitive = True

settings = Settings()

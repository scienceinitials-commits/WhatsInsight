from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include core router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Health"])
def health_check():
    """
    Service status heartbeat endpoint.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": "1.0.0"
    }

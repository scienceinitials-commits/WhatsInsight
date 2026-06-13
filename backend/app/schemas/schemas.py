from pydantic import BaseModel, EmailStr
from typing import List, Dict, Any, Optional
from datetime import datetime

# Auth Schemas
class UserSignUp(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: Optional[str] = None

# Analytics Response Sub-schemas
class ActiveUser(BaseModel):
    sender_name: str
    message_count: int
    word_count: int

class EmojiFreq(BaseModel):
    emoji: str
    count: int

class MonthlyTimelineItem(BaseModel):
    month_year: str
    message_count: int

class DailyActivityItem(BaseModel):
    name: str
    message_count: int

class RelationshipItem(BaseModel):
    pair: str
    score: int
    status: str

class AIInsightsSchema(BaseModel):
    toxicity_score: float
    detected_language: str
    ai_summary: str
    topics_detected: List[str]
    relationship_score: List[RelationshipItem]

class AnalysisMetadata(BaseModel):
    filename: str
    total_messages: int
    total_words: int
    media_shared: int
    links_shared: int

# Main Report Contract
class DetailedReportResponse(BaseModel):
    analysis_id: str
    metadata: AnalysisMetadata
    active_users: List[ActiveUser]
    emoji_analysis: List[EmojiFreq]
    timeline: Dict[str, Any]
    ai_insights: AIInsightsSchema

# History Item
class HistoryItemResponse(BaseModel):
    id: str
    filename: str
    total_messages: int
    created_at: str

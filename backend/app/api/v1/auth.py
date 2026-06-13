from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.schemas import UserSignUp, UserLogin, Token
from app.core.security import get_password_hash, verify_password, create_access_token
from app.database import get_db, Client
import uuid

router = APIRouter()

@router.post("/signup", response_model=Token)
def signup(user_in: UserSignUp, db: Client = Depends(get_db)):
    try:
        # Check if email already exists in users metadata table or auth tables
        # For simplicity, we query a profiles table or simulate user creation
        # using the Supabase auth framework
        auth_response = db.auth.sign_up({
            "email": user_in.email,
            "password": user_in.password,
            "options": {
                "data": {
                    "full_name": user_in.name
                }
            }
        })
        
        if not auth_response.user:
            raise HTTPException(status_code=400, detail="Signup failed.")
            
        access_token = create_access_token(subject=auth_response.user.id)
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_name": user_in.name
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Client = Depends(get_db)):
    try:
        auth_response = db.auth.sign_in_with_password({
            "email": user_in.email,
            "password": user_in.password
        })
        
        if not auth_response.user:
            raise HTTPException(status_code=401, detail="Invalid credentials.")
            
        access_token = create_access_token(subject=auth_response.user.id)
        
        # Extract full name from user metadata if present
        metadata = getattr(auth_response.user, "user_metadata", {}) or {}
        full_name = metadata.get("full_name", "User")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_name": full_name
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )

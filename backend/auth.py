import os
import hashlib
import hmac
import base64
import json
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import models
from database import get_db

# Try importing passlib and jose, fallback to hashlib if not available
try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    USE_PASSLIB = True
except Exception:
    USE_PASSLIB = False

try:
    from jose import jwt, JWTError
    USE_JOSE = True
except Exception:
    USE_JOSE = False

SECRET_KEY = os.getenv("SECRET_KEY", "tradivora_secret_super_secure_key_for_jwt_tokens_2026")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))  # 7 Days default

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login", auto_error=False)

def get_password_hash(password: str) -> str:
    if USE_PASSLIB:
        try:
            return pwd_context.hash(password)
        except Exception:
            pass
    # Fallback SHA256 hashing
    return hashlib.sha256((password + SECRET_KEY).encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if USE_PASSLIB:
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception:
            pass
    return get_password_hash(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    
    if USE_JOSE:
        try:
            return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        except Exception:
            pass

    # Custom JWT Encoder Fallback
    header = {"alg": ALGORITHM, "typ": "JWT"}
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    
    payload_to_encode = to_encode.copy()
    if isinstance(payload_to_encode.get("exp"), datetime):
        payload_to_encode["exp"] = int(payload_to_encode["exp"].timestamp())
        
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload_to_encode).encode()).decode().rstrip("=")
    
    signature_input = f"{header_b64}.{payload_b64}".encode()
    signature = hmac.new(SECRET_KEY.encode(), signature_input, hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip("=")
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[models.User]:
    if not token:
        return None
    
    email = None
    if USE_JOSE:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email = payload.get("sub")
        except JWTError:
            pass

    if not email:
        try:
            parts = token.split(".")
            if len(parts) == 3:
                payload_b64 = parts[1]
                padded_b64 = payload_b64 + "=" * (-len(payload_b64) % 4)
                payload_data = json.loads(base64.urlsafe_b64decode(padded_b64).decode())
                email = payload_data.get("sub")
        except Exception:
            pass

    if not email:
        return None
    
    user = db.query(models.User).filter(models.User.email == email).first()
    return user

def require_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

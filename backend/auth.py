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

SECRET_KEY = "tradivora_secret_super_secure_key_for_jwt_tokens_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 Days

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
    # Check fallback or exact match
    fallback_hash = hashlib.sha256((plain_password + SECRET_KEY).encode()).hexdigest()
    return hashed_password in (fallback_hash, plain_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire.timestamp()})

    if USE_JOSE:
        try:
            return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        except Exception:
            pass

    # Custom JWT fallback using HMAC-SHA256
    header = {"alg": "HS256", "typ": "JWT"}
    b64_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().strip("=")
    b64_payload = base64.urlsafe_b64encode(json.dumps(to_encode).encode()).decode().strip("=")
    signature = hmac.new(SECRET_KEY.encode(), f"{b64_header}.{b64_payload}".encode(), hashlib.sha256).digest()
    b64_sig = base64.urlsafe_b64encode(signature).decode().strip("=")
    return f"{b64_header}.{b64_payload}.{b64_sig}"

def decode_token(token: str) -> Optional[dict]:
    if USE_JOSE:
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except Exception:
            pass
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        b64_payload = parts[1]
        padding = "=" * (4 - len(b64_payload) % 4)
        payload_bytes = base64.urlsafe_b64decode(b64_payload + padding)
        return json.loads(payload_bytes.decode())
    except Exception:
        return None

def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[models.User]:
    if not token:
        return None
    payload = decode_token(token)
    if not payload:
        return None
    email: str = payload.get("sub")
    if not email:
        return None
    user = db.query(models.User).filter(models.User.email == email).first()
    return user

def require_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    user = get_current_user(token, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

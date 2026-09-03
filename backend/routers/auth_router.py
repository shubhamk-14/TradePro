from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=schemas.Token)
def register_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered.")
    
    hashed_pwd = auth.get_password_hash(user_in.password)
    new_user = models.User(
        email=user_in.email,
        hashed_password=hashed_pwd,
        full_name=user_in.full_name,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = auth.create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": new_user}

@router.post("/login", response_model=schemas.Token)
def login_user(user_in: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_in.email).first()

    # Auto-seed demo accounts on-the-fly if missing in deployed database
    stylish_male_pic = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
    
    if not user:
        if user_in.email.lower() == "admin@tradivora.com":
            user = models.User(
                email="admin@tradivora.com",
                hashed_password=auth.get_password_hash("admin123"),
                full_name="Shubham (Lead Trader)",
                role="admin",
                profile_pic=stylish_male_pic
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        elif user_in.email.lower() == "trader@tradivora.com":
            user = models.User(
                email="trader@tradivora.com",
                hashed_password=auth.get_password_hash("trader123"),
                full_name="Pro Investor",
                role="user",
                profile_pic=stylish_male_pic
            )
            db.add(user)
            db.commit()
            db.refresh(user)

    if not user or not auth.verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=schemas.UserResponse)
def get_user_profile(current_user: models.User = Depends(auth.require_current_user)):
    return current_user

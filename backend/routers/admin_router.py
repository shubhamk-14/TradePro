from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, auth

router = APIRouter(prefix="/api/admin", tags=["Admin Panel"])

@router.get("/stats")
def get_admin_stats(
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    users_count = db.query(models.User).count()
    blogs_count = db.query(models.Blog).count()
    courses_count = db.query(models.Course).count()
    messages_count = db.query(models.ContactMessage).count()

    messages = db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).limit(10).all()

    return {
        "users_count": users_count,
        "blogs_count": blogs_count,
        "courses_count": courses_count,
        "messages_count": messages_count,
        "recent_messages": messages
    }

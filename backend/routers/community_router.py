from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/community", tags=["Community Forum"])

@router.get("/posts")
def get_forum_posts(db: Session = Depends(get_db)):
    posts = db.query(models.ForumPost).order_by(models.ForumPost.created_at.desc()).all()
    res = []
    for p in posts:
        res.append({
            "id": p.id,
            "title": p.title,
            "content": p.content,
            "category": p.category,
            "likes": p.likes,
            "comments_count": p.comments_count,
            "created_at": p.created_at,
            "author_name": p.user.full_name if p.user else "Anonymous Trader"
        })
    return res

@router.post("/posts")
def create_forum_post(
    post: schemas.ForumPostCreate,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    new_post = models.ForumPost(
        user_id=current_user.id,
        title=post.title,
        content=post.content,
        category=post.category or "General"
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/blogs", tags=["Blog"])

@router.get("", response_model=List[schemas.BlogResponse])
def get_blogs(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Blog)
    if category and category != "All":
        query = query.filter(models.Blog.category == category)
    if search:
        s = f"%{search}%"
        query = query.filter(models.Blog.title.ilike(s) | models.Blog.content.ilike(s))
    return query.order_by(models.Blog.created_at.desc()).all()

@router.get("/{slug}", response_model=schemas.BlogResponse)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog

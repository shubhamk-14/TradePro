from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, json

router = APIRouter(prefix="/api/courses", tags=["Trading Courses"])

@router.get("")
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(models.Course).all()
    res = []
    for c in courses:
        res.append({
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "level": c.level,
            "is_premium": c.is_premium,
            "lessons_count": c.lessons_count,
            "duration": c.duration,
            "image_url": c.image_url,
            "lessons": json.loads(c.lessons_json) if c.lessons_json else []
        })
    return res

@router.get("/{course_id}")
def get_course_details(course_id: int, db: Session = Depends(get_db)):
    c = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Course not found")
    return {
        "id": c.id,
        "title": c.title,
        "description": c.description,
        "level": c.level,
        "is_premium": c.is_premium,
        "lessons_count": c.lessons_count,
        "duration": c.duration,
        "image_url": c.image_url,
        "lessons": json.loads(c.lessons_json) if c.lessons_json else []
    }

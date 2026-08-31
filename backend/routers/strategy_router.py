from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models, json

router = APIRouter(prefix="/api/strategies", tags=["Trading Strategies"])

@router.get("")
def get_strategies(db: Session = Depends(get_db)):
    strategies = db.query(models.StrategyGuide).all()
    output = []
    for s in strategies:
        output.append({
            "id": s.id,
            "title": s.title,
            "category": s.category,
            "description": s.description,
            "key_points": json.loads(s.key_points) if s.key_points else [],
            "difficulty": s.difficulty,
            "icon_name": s.icon_name
        })
    return output

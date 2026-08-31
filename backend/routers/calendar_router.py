from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/api/calendar", tags=["Economic Calendar"])

@router.get("")
def get_economic_events(db: Session = Depends(get_db)):
    return db.query(models.EconomicEvent).all()

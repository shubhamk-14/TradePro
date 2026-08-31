from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/journal", tags=["Trading Journal"])

@router.get("", response_model=List[schemas.JournalResponse])
def get_journal_entries(
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.TradingJournal).filter(
        models.TradingJournal.user_id == current_user.id
    ).order_by(models.TradingJournal.created_at.desc()).all()

@router.post("", response_model=schemas.JournalResponse)
def create_journal_entry(
    entry: schemas.JournalCreate,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    new_entry = models.TradingJournal(
        user_id=current_user.id,
        symbol=entry.symbol,
        trade_type=entry.trade_type,
        entry_price=entry.entry_price,
        exit_price=entry.exit_price,
        quantity=entry.quantity,
        strategy_used=entry.strategy_used,
        profit_loss=entry.profit_loss,
        trade_notes=entry.trade_notes,
        mistakes=entry.mistakes,
        lessons_learned=entry.lessons_learned
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@router.delete("/{journal_id}")
def delete_journal_entry(
    journal_id: int,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    entry = db.query(models.TradingJournal).filter(
        models.TradingJournal.id == journal_id,
        models.TradingJournal.user_id == current_user.id
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    db.delete(entry)
    db.commit()
    return {"message": "Journal entry deleted"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/watchlist", tags=["Watchlist"])

@router.get("", response_model=List[schemas.WatchlistResponse])
def get_watchlist(
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.Watchlist).filter(models.Watchlist.user_id == current_user.id).all()

@router.post("", response_model=schemas.WatchlistResponse)
def add_to_watchlist(
    item: schemas.WatchlistCreate,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(models.Watchlist).filter(
        models.Watchlist.user_id == current_user.id,
        models.Watchlist.symbol == item.symbol
    ).first()
    if existing:
        return existing
    
    new_item = models.Watchlist(
        user_id=current_user.id,
        symbol=item.symbol,
        name=item.name,
        asset_class=item.asset_class or "stock"
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.delete("/{watchlist_id}")
def remove_from_watchlist(
    watchlist_id: int,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(models.Watchlist).filter(
        models.Watchlist.id == watchlist_id,
        models.Watchlist.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found in watchlist")
    db.delete(item)
    db.commit()
    return {"message": "Asset removed from watchlist"}

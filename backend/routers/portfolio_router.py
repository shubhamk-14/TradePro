from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])

@router.get("", response_model=List[schemas.PortfolioResponse])
def get_portfolio(
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    return db.query(models.Portfolio).filter(models.Portfolio.user_id == current_user.id).all()

@router.post("", response_model=schemas.PortfolioResponse)
def add_portfolio_item(
    item: schemas.PortfolioCreate,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    new_item = models.Portfolio(
        user_id=current_user.id,
        symbol=item.symbol,
        asset_name=item.asset_name,
        buy_price=item.buy_price,
        quantity=item.quantity,
        asset_type=item.asset_type or "Equity"
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.delete("/{portfolio_id}")
def delete_portfolio_item(
    portfolio_id: int,
    current_user: models.User = Depends(auth.require_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(models.Portfolio).filter(
        models.Portfolio.id == portfolio_id,
        models.Portfolio.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Holding not found")
    db.delete(item)
    db.commit()
    return {"message": "Holding deleted successfully"}

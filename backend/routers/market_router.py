from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import random
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/markets", tags=["Live Markets"])

@router.get("", response_model=List[schemas.MarketAssetResponse])
def get_market_assets(
    category: Optional[str] = Query(None, description="Filter by asset class: index, stock, us_market, crypto, forex, commodity"),
    db: Session = Depends(get_db)
):
    query = db.query(models.MarketAsset)
    if category:
        query = query.filter(models.MarketAsset.asset_class == category)
    assets = query.all()

    # Simulate minor dynamic price noise so ticks feel alive
    for asset in assets:
        noise = random.uniform(-0.15, 0.15)
        asset.price = round(asset.price * (1 + noise / 100), 2)
    return assets

@router.get("/{symbol}", response_model=schemas.MarketAssetResponse)
def get_asset_by_symbol(symbol: str, db: Session = Depends(get_db)):
    asset = db.query(models.MarketAsset).filter(models.MarketAsset.symbol == symbol).first()
    if not asset:
        # Return fallback mock asset if not pre-seeded
        return models.MarketAsset(
            symbol=symbol,
            name=f"{symbol} Asset",
            asset_class="stock",
            price=1500.0,
            change=12.5,
            percent_change=0.84,
            high=1520.0,
            low=1485.0,
            volume="1.5M",
            market_status="OPEN"
        )
    return asset

from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    profile_pic: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Market Asset Schemas
class MarketAssetResponse(BaseModel):
    id: int
    symbol: str
    name: str
    asset_class: str
    price: float
    change: float
    percent_change: float
    high: float
    low: float
    volume: str
    market_status: str

    class Config:
        from_attributes = True

# Blog Schemas
class BlogCreate(BaseModel):
    title: str
    slug: str
    category: str
    excerpt: str
    content: str
    author: Optional[str] = "TradePro Team"
    read_time: Optional[str] = "5 min read"
    tags: Optional[str] = ""
    image_url: Optional[str] = None

class BlogResponse(BaseModel):
    id: int
    title: str
    slug: str
    category: str
    excerpt: str
    content: str
    author: str
    read_time: str
    tags: Optional[str]
    image_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Watchlist Schemas
class WatchlistCreate(BaseModel):
    symbol: str
    name: str
    asset_class: Optional[str] = "stock"

class WatchlistResponse(BaseModel):
    id: int
    user_id: int
    symbol: str
    name: str
    asset_class: str
    added_at: datetime

    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioCreate(BaseModel):
    symbol: str
    asset_name: str
    buy_price: float
    quantity: float
    asset_type: Optional[str] = "Equity"

class PortfolioResponse(BaseModel):
    id: int
    user_id: int
    symbol: str
    asset_name: str
    buy_price: float
    quantity: float
    asset_type: str
    added_at: datetime

    class Config:
        from_attributes = True

# Journal Schemas
class JournalCreate(BaseModel):
    symbol: str
    trade_type: str
    entry_price: float
    exit_price: float
    quantity: float
    strategy_used: str
    profit_loss: float
    trade_notes: Optional[str] = None
    mistakes: Optional[str] = None
    lessons_learned: Optional[str] = None

class JournalResponse(BaseModel):
    id: int
    user_id: int
    symbol: str
    trade_type: str
    entry_price: float
    exit_price: float
    quantity: float
    strategy_used: str
    profit_loss: float
    trade_notes: Optional[str]
    mistakes: Optional[str]
    lessons_learned: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Schema
class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ForumPostCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "General"

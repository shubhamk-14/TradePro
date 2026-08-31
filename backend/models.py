from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="user")  # 'user' or 'admin'
    profile_pic = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    watchlists = relationship("Watchlist", back_populates="user", cascade="all, delete-orphan")
    portfolios = relationship("Portfolio", back_populates="user", cascade="all, delete-orphan")
    journals = relationship("TradingJournal", back_populates="user", cascade="all, delete-orphan")
    forum_posts = relationship("ForumPost", back_populates="user", cascade="all, delete-orphan")

class MarketAsset(Base):
    __tablename__ = "market_assets"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    asset_class = Column(String, index=True, nullable=False)  # 'index', 'stock', 'crypto', 'forex', 'commodity'
    price = Column(Float, nullable=False)
    change = Column(Float, nullable=False)
    percent_change = Column(Float, nullable=False)
    high = Column(Float, nullable=False)
    low = Column(Float, nullable=False)
    volume = Column(String, nullable=False)
    market_status = Column(String, default="OPEN")  # 'OPEN', 'CLOSED'
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, default="TradePro Team")
    read_time = Column(String, default="5 min read")
    tags = Column(String, nullable=True)  # Comma separated
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    level = Column(String, nullable=False)  # 'Beginner', 'Intermediate', 'Advanced'
    is_premium = Column(Boolean, default=False)
    lessons_count = Column(Integer, default=0)
    duration = Column(String, default="2 Hours")
    image_url = Column(String, nullable=True)
    lessons_json = Column(Text, nullable=True)  # JSON string of lessons array
    created_at = Column(DateTime, default=datetime.utcnow)

class StrategyGuide(Base):
    __tablename__ = "strategy_guides"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, index=True, nullable=False)  # e.g., 'Price Action', 'ICT', 'SMC', 'Scalping', 'Risk Management'
    description = Column(Text, nullable=False)
    key_points = Column(Text, nullable=False)  # JSON string
    difficulty = Column(String, default="Intermediate")
    icon_name = Column(String, default="TrendingUp")

class Watchlist(Base):
    __tablename__ = "watchlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symbol = Column(String, nullable=False)
    name = Column(String, nullable=False)
    asset_class = Column(String, default="stock")
    added_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="watchlists")

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symbol = Column(String, nullable=False)
    asset_name = Column(String, nullable=False)
    buy_price = Column(Float, nullable=False)
    quantity = Column(Float, nullable=False)
    asset_type = Column(String, default="Equity")
    added_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="portfolios")

class TradingJournal(Base):
    __tablename__ = "trading_journals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symbol = Column(String, nullable=False)
    trade_type = Column(String, nullable=False)  # 'BUY' or 'SELL'
    entry_price = Column(Float, nullable=False)
    exit_price = Column(Float, nullable=False)
    quantity = Column(Float, nullable=False)
    strategy_used = Column(String, nullable=False)
    profit_loss = Column(Float, nullable=False)
    trade_notes = Column(Text, nullable=True)
    mistakes = Column(String, nullable=True)
    lessons_learned = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="journals")

class EconomicEvent(Base):
    __tablename__ = "economic_events"

    id = Column(Integer, primary_key=True, index=True)
    event_title = Column(String, nullable=False)
    country = Column(String, nullable=False)  # 'IN', 'US', 'EU'
    event_date = Column(String, nullable=False)
    impact = Column(String, nullable=False)  # 'HIGH', 'MEDIUM', 'LOW'
    actual = Column(String, nullable=True)
    forecast = Column(String, nullable=True)
    previous = Column(String, nullable=True)

class ForumPost(Base):
    __tablename__ = "forum_posts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, default="General")
    likes = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="forum_posts")

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

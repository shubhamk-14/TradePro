import json
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models
from auth import get_password_hash

def seed_database():
    models.Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    stylish_male_pic = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"

    try:
        # Update ALL existing users to stylish male pic
        existing_users = db.query(models.User).all()
        for u in existing_users:
            u.profile_pic = stylish_male_pic
        db.commit()

        # Seed Users if empty
        admin_existing = db.query(models.User).filter(models.User.email == "admin@tradivora.com").first()
        if not admin_existing:
            admin_user = models.User(
                email="admin@tradivora.com",
                hashed_password=get_password_hash("admin123"),
                full_name="Shubham (Lead Trader)",
                role="admin",
                profile_pic=stylish_male_pic
            )
            demo_user = models.User(
                email="trader@tradivora.com",
                hashed_password=get_password_hash("trader123"),
                full_name="Pro Investor",
                role="user",
                profile_pic=stylish_male_pic
            )
            db.add(admin_user)
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)

            # Add demo portfolio & watchlist
            sample_watchlist = [
                models.Watchlist(user_id=demo_user.id, symbol="RELIANCE", name="Reliance Industries", asset_class="stock"),
                models.Watchlist(user_id=demo_user.id, symbol="TCS", name="Tata Consultancy Services", asset_class="stock"),
                models.Watchlist(user_id=demo_user.id, symbol="BTCUSDT", name="Bitcoin", asset_class="crypto"),
                models.Watchlist(user_id=demo_user.id, symbol="NIFTY 50", name="Nifty 50 Index", asset_class="index")
            ]
            db.add_all(sample_watchlist)

            sample_portfolio = [
                models.Portfolio(user_id=demo_user.id, symbol="RELIANCE", asset_name="Reliance Industries", buy_price=2450.0, quantity=25, asset_type="Equity"),
                models.Portfolio(user_id=demo_user.id, symbol="HDFCBANK", asset_name="HDFC Bank Ltd", buy_price=1520.0, quantity=40, asset_type="Equity"),
                models.Portfolio(user_id=demo_user.id, symbol="INFY", asset_name="Infosys Ltd", buy_price=1420.0, quantity=30, asset_type="Equity"),
                models.Portfolio(user_id=demo_user.id, symbol="BTCUSDT", asset_name="Bitcoin", buy_price=58000.0, quantity=0.15, asset_type="Crypto")
            ]
            db.add_all(sample_portfolio)

            sample_journals = [
                models.TradingJournal(
                    user_id=demo_user.id,
                    symbol="BANKNIFTY",
                    trade_type="BUY",
                    entry_price=47800.0,
                    exit_price=48250.0,
                    quantity=30.0,
                    strategy_used="SMC Order Block + FVG",
                    profit_loss=13500.0,
                    trade_notes="Perfect mitigation of the 15m bullish order block after liquidity sweep.",
                    mistakes="None",
                    lessons_learned="Wait for 15m candle close confirmation before jumping."
                )
            ]
            db.add_all(sample_journals)
            db.commit()

        # 2. Seed Blogs if empty
        if db.query(models.Blog).count() == 0:
            sample_blogs = [
                models.Blog(
                    title="Mastering Smart Money Concepts (SMC): A Comprehensive Guide",
                    slug="mastering-smart-money-concepts",
                    excerpt="Learn how institutional algorithms sweep liquidity and create high-probability order blocks in Nifty & Bank Nifty.",
                    content="Smart Money Concepts (SMC) is the framework used to track central bank and institutional flow...",
                    author="Shubham",
                    category="SMC Strategy",
                    read_time="6 min read"
                ),
                models.Blog(
                    title="Options Buying vs Options Selling: Risk Management for Indian Markets",
                    slug="options-buying-vs-selling",
                    excerpt="Decipher option greeks, theta decay, and delta momentum to optimize your option trading win rates.",
                    content="Options trading in India has witnessed massive retail participation...",
                    author="Shubham",
                    category="Options Trading",
                    read_time="8 min read"
                )
            ]
            db.add_all(sample_blogs)
            db.commit()

        # 3. Seed Courses if empty
        if db.query(models.Course).count() == 0:
            sample_courses = [
                models.Course(
                    title="Institutional SMC & Order Block Mastery",
                    description="Complete blueprint to trade liquidity sweeps, fair value gaps, and high-probability order blocks.",
                    short_description="Complete blueprint to trade liquidity sweeps, fair value gaps, and high-probability order blocks.",
                    full_description="Master the exact framework used by institutional prop desks to trade equity indices.",
                    instructor="Shubham",
                    price=4999.0,
                    duration="12 Hours",
                    level="Advanced",
                    modules_count=8,
                    rating=4.9,
                    category="SMC Trading"
                ),
                models.Course(
                    title="Option Buying Momentum & Scalping Masterclass",
                    description="High-speed scalping strategies for BankNifty & FinNifty zero-hero momentum moves.",
                    short_description="High-speed scalping strategies for BankNifty & FinNifty zero-hero momentum moves.",
                    full_description="Learn how to capture rapid option premium spikes using delta profile and VWAP strategies.",
                    instructor="Shubham",
                    price=3499.0,
                    duration="8 Hours",
                    level="Intermediate",
                    modules_count=6,
                    rating=4.8,
                    category="Options Trading"
                )
            ]
            db.add_all(sample_courses)
            db.commit()

        # 4. Seed Strategies if empty
        if db.query(models.Strategy).count() == 0:
            sample_strats = [
                models.Strategy(
                    title="SMC Order Block & FVG Entry Model",
                    category="Smart Money Concepts",
                    win_rate="78%",
                    risk_reward="1 : 3.5",
                    timeframe="15m / 5m Execution",
                    description="Identifies institutional footprint where banks accumulated orders before an explosive price expansion.",
                    rules_json=json.dumps([
                        "Step 1: Identify 1H/4H Higher Timeframe Liquidity Sweep (BSL or SSL).",
                        "Step 2: Mark the fresh Fair Value Gap (FVG) created during Market Structure Shift (MSS).",
                        "Step 3: Place limit order at 50% FVG retest with stop loss below the sweep low."
                    ]),
                    chart_example_symbol="NSE:BANKNIFTY"
                ),
                models.Strategy(
                    title="VWAP Delta Momentum Scalp",
                    category="Options Scalping",
                    win_rate="72%",
                    risk_reward="1 : 2.0",
                    timeframe="3m / 1m Execution",
                    description="Captures intra-day institutional buying bursts when price crosses VWAP with surging delta volume.",
                    rules_json=json.dumps([
                        "Step 1: Wait for 9:30 AM initial opening range settling.",
                        "Step 2: Watch for VWAP crossover accompanied by 2x average volume spike.",
                        "Step 3: Buy ITM Option contract aiming for 20-30 points scalp."
                    ]),
                    chart_example_symbol="NSE:NIFTY"
                )
            ]
            db.add_all(sample_strats)
            db.commit()

        # 5. Seed Calendar Events if empty
        if db.query(models.EconomicEvent).count() == 0:
            sample_events = [
                models.EconomicEvent(
                    event_title="RBI Monetary Policy Interest Rate Decision",
                    event_date="2026-09-15 10:00 AM IST",
                    country="IN",
                    impact="HIGH",
                    forecast="6.50%",
                    previous="6.50%"
                ),
                models.EconomicEvent(
                    event_title="US Federal Reserve FOMC Interest Rate Decision",
                    event_date="2026-09-18 11:30 PM IST",
                    country="US",
                    impact="HIGH",
                    forecast="5.25%",
                    previous="5.50%"
                ),
                models.EconomicEvent(
                    event_title="India CPI Inflation Data Release (YoY)",
                    event_date="2026-09-22 05:30 PM IST",
                    country="IN",
                    impact="HIGH",
                    forecast="4.80%",
                    previous="5.10%"
                )
            ]
            db.add_all(sample_events)
            db.commit()

        print("Database seed finished successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

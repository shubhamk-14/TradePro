from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import engine, Base
import models
from routers import (
    auth_router, market_router, news_router, strategy_router,
    blog_router, course_router, watchlist_router, portfolio_router,
    journal_router, calculator_router, calendar_router, community_router,
    contact_router, admin_router, option_chain_router
)
from seed_data import seed_database

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Seed Database
    seed_database()
    yield
    # Shutdown logic if needed

app = FastAPI(
    title="TradePro (Tradivora) API",
    description="Next-Gen Institutional Trading Platform API",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(market_router.router)
app.include_router(news_router.router)
app.include_router(strategy_router.router)
app.include_router(blog_router.router)
app.include_router(course_router.router)
app.include_router(watchlist_router.router)
app.include_router(portfolio_router.router)
app.include_router(journal_router.router)
app.include_router(calculator_router.router)
app.include_router(calendar_router.router)
app.include_router(community_router.router)
app.include_router(contact_router.router)
app.include_router(admin_router.router)
app.include_router(option_chain_router.router)

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "TradePro API", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

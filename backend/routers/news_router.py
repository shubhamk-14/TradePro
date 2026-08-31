from fastapi import APIRouter, Query
from typing import List, Optional

router = APIRouter(prefix="/api/news", tags=["Market News"])

SAMPLE_NEWS = [
    {
        "id": 1,
        "title": "RBI Keeps Repo Rate Unchanged at 6.50%: Focus Remains on Inflation Target",
        "category": "Indian Market",
        "time": "15 mins ago",
        "source": "Financial Express",
        "summary": "The Reserve Bank of India Monetary Policy Committee has decided to keep key benchmark interest rates steady while maintaining a withdrawal of accommodation stance.",
        "url": "#",
        "is_breaking": True
    },
    {
        "id": 2,
        "title": "US Tech Rally Drives Nasdaq to Fresh Records Ahead of Key Nvidia Earnings",
        "category": "Global Market",
        "time": "45 mins ago",
        "source": "Bloomberg",
        "summary": "Surging AI hardware demand continues to propel technology megacaps higher as wall street analysts raise price targets.",
        "url": "#",
        "is_breaking": False
    },
    {
        "id": 3,
        "title": "Bitcoin Surges Past $67,000 as Institutional ETF Net Inflows Hit 5-Month High",
        "category": "Crypto",
        "time": "1 hour ago",
        "source": "CoinDesk",
        "summary": "Spot Bitcoin ETFs recorded $420M in single-day net inflows led by BlackRock IBIT and Fidelity FBTC.",
        "url": "#",
        "is_breaking": True
    },
    {
        "id": 4,
        "title": "USD/INR Holds Below 83.50 Level Amid Central Bank Interventions in Forex Spot",
        "category": "Forex",
        "time": "2 hours ago",
        "source": "Reuters",
        "summary": "Rupee stays resilient despite rising US Dollar Index as RBI active dollar sales mitigate downside pressure.",
        "url": "#",
        "is_breaking": False
    },
    {
        "id": 5,
        "title": "Oil Prices Stabilize near $85 as OPEC+ Reaffirms Production Cut Targets",
        "category": "Economy",
        "time": "3 hours ago",
        "source": "CNBC",
        "summary": "Crude oil futures held steady following official statements confirming voluntary output cuts will continue through Q4.",
        "url": "#",
        "is_breaking": False
    },
    {
        "id": 6,
        "title": "Upcoming IPO Alert: Leading Fintech Giant Files DRHP for $500M Public Issue",
        "category": "IPO News",
        "time": "4 hours ago",
        "source": "Mint",
        "summary": "The draft red herring prospectus indicates fresh issue of shares along with offer for sale by early venture investors.",
        "url": "#",
        "is_breaking": False
    }
]

@router.get("")
def get_news(category: Optional[str] = Query(None), search: Optional[str] = Query(None)):
    result = SAMPLE_NEWS
    if category and category != "All":
        result = [n for n in result if n["category"].lower() == category.lower()]
    if search:
        s = search.lower()
        result = [n for n in result if s in n["title"].lower() or s in n["summary"].lower()]
    return result

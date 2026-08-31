from fastapi import APIRouter, Query
from typing import List, Dict, Optional

router = APIRouter(prefix="/api/option-chain", tags=["Option Chain"])

@router.get("")
@router.get("/")
@router.get("/{symbol}")
def get_option_chain(symbol: Optional[str] = "NIFTY"):
    symbol_upper = (symbol or "NIFTY").upper()
    if symbol_upper == "BANKNIFTY":
        spot_price = 52400.0
        step = 100
    elif symbol_upper == "FINNIFTY":
        spot_price = 23600.0
        step = 50
    else:
        spot_price = 24550.0
        step = 50

    chain = []
    base_strike = int(spot_price // step) * step

    total_call_oi = 0
    total_put_oi = 0

    for i in range(-6, 7):
        strike = base_strike + (i * step)
        is_itm_call = strike < spot_price
        is_itm_put = strike > spot_price

        # Simulated Call & Put Open Interest & Premiums
        call_oi = max(10000, 150000 - abs(i) * 22000 + (1500 if i % 2 == 0 else -1200))
        put_oi = max(12000, 160000 - abs(i) * 20000 + (2100 if i % 2 != 0 else -900))
        
        total_call_oi += call_oi
        total_put_oi += put_oi

        call_price = max(5.0, round(spot_price - strike + 120 if is_itm_call else max(10.0, 180 - (strike - spot_price) * 0.8), 2))
        put_price = max(5.0, round(strike - spot_price + 110 if is_itm_put else max(10.0, 170 - (spot_price - strike) * 0.8), 2))

        chain.append({
            "strike": strike,
            "call_oi": call_oi,
            "call_change_oi": "+12.4%",
            "call_price": call_price,
            "call_ltp": call_price,
            "call_iv": round(14.2 + (abs(i) * 0.3), 1),
            "is_atm": i == 0,
            "put_price": put_price,
            "put_ltp": put_price,
            "put_iv": round(15.1 + (abs(i) * 0.2), 1),
            "put_oi": put_oi,
            "put_change_oi": "+8.9%",
        })

    pcr_ratio = round(total_put_oi / max(1, total_call_oi), 2)
    max_pain = base_strike

    return {
        "symbol": symbol_upper,
        "spot_price": spot_price,
        "atm_strike": base_strike,
        "pcr_ratio": pcr_ratio,
        "max_pain": max_pain,
        "total_call_oi": total_call_oi,
        "total_put_oi": total_put_oi,
        "sentiment": "Bullish Bias" if pcr_ratio > 1.0 else "Bearish / Neutral",
        "chain": chain,
        "strikes": chain
    }

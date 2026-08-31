from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/calculators", tags=["Trading Calculators"])

class PositionSizeReq(BaseModel):
    account_balance: float
    risk_percentage: float
    entry_price: float
    stop_loss_price: float

class RiskRewardReq(BaseModel):
    entry_price: float
    stop_loss_price: float
    target_price: float

class SIPReq(BaseModel):
    monthly_investment: float
    expected_return_rate: float
    time_period_years: int

@router.post("/position-size")
def calculate_position_size(req: PositionSizeReq):
    risk_amount = req.account_balance * (req.risk_percentage / 100)
    risk_per_share = abs(req.entry_price - req.stop_loss_price)
    
    if risk_per_share == 0:
        return {"error": "Entry price and Stop Loss price cannot be identical"}
    
    position_units = risk_amount / risk_per_share
    total_position_value = position_units * req.entry_price

    return {
        "risk_amount": round(risk_amount, 2),
        "risk_per_share": round(risk_per_share, 2),
        "position_units": round(position_units, 2),
        "total_position_value": round(total_position_value, 2)
    }

@router.post("/risk-reward")
def calculate_risk_reward(req: RiskRewardReq):
    risk = abs(req.entry_price - req.stop_loss_price)
    reward = abs(req.target_price - req.entry_price)
    
    if risk == 0:
        return {"error": "Risk cannot be zero"}
    
    rr_ratio = reward / risk
    return {
        "risk_points": round(risk, 2),
        "reward_points": round(reward, 2),
        "ratio_string": f"1 : {round(rr_ratio, 2)}",
        "rr_value": round(rr_ratio, 2)
    }

@router.post("/sip")
def calculate_sip(req: SIPReq):
    i = (req.expected_return_rate / 100) / 12
    n = req.time_period_years * 12
    
    # Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    total_value = req.monthly_investment * (((1 + i)**n - 1) / i) * (1 + i)
    total_invested = req.monthly_investment * n
    wealth_gained = total_value - total_invested

    return {
        "total_invested": round(total_invested, 2),
        "wealth_gained": round(wealth_gained, 2),
        "total_value": round(total_value, 2)
    }

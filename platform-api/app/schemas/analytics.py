from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


class OrderAnalyticsResponse(BaseModel):
    id: int
    merchant_id: int
    integration_id: Optional[int] = None
    order_id: str
    platform: str
    order_data: Dict[str, Any]
    is_tap_order: bool
    total_amount: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True


class AnalyticsStats(BaseModel):
    total_orders: int
    tap_orders: int
    regular_orders: int
    total_revenue: float
    tap_revenue: float
    regular_revenue: float
    orders_by_platform: Dict[str, int]
    revenue_by_platform: Dict[str, float]


class AnalyticsResponse(BaseModel):
    merchant_id: int
    period_start: datetime
    period_end: datetime
    stats: AnalyticsStats
    recent_orders: list[OrderAnalyticsResponse]




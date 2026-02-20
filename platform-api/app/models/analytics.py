from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, JSON, Boolean
from datetime import datetime


class OrderAnalytics(Base):
    __tablename__ = "order_analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_id = Column(Integer, ForeignKey("merchants.id"), nullable=False, index=True)
    integration_id = Column(Integer, ForeignKey("integrations.id"), nullable=True, index=True)
    order_id = Column(String(255), nullable=False, index=True)
    platform = Column(String(50), nullable=False, index=True)
    order_data = Column(JSON, nullable=False)
    is_tap_order = Column(Boolean, default=False, nullable=False, index=True)
    total_amount = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

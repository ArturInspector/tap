from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float, Numeric
from datetime import datetime


class Merchant(Base):
    __tablename__ = "merchants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    domain = Column(String(255), nullable=True, unique=True, index=True)
    phone = Column(String(50), nullable=True)
    
    # TAP Protocol fields
    tap_agent_id = Column(Integer, nullable=True, index=True)
    tap_key_id = Column(String(100), nullable=True)
    
    # Fintech fields
    balance_usd = Column(Numeric(10, 2), default=0.00, nullable=False)  # Balance in USD
    balance_kgs = Column(Numeric(10, 2), default=0.00, nullable=False)  # Balance in KGS
    currency = Column(String(3), default="USD", nullable=False)  # Default currency
    kaspi_account = Column(String(50), nullable=True)  # Kaspi account number for withdrawals
    bank_account = Column(String(50), nullable=True)  # Bank account for withdrawals
    
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

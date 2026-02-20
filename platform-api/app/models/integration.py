from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from datetime import datetime
import enum


class PlatformType(str, enum.Enum):
    SHOPIFY = "shopify"
    AMAZON = "amazon"
    WOOCOMMERCE = "woocommerce"


class IntegrationStatus(str, enum.Enum):
    PENDING = "pending"
    ACTIVE = "active"
    ERROR = "error"
    DISABLED = "disabled"


class Integration(Base):
    __tablename__ = "integrations"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_id = Column(Integer, ForeignKey("merchants.id"), nullable=False, index=True)
    platform_type = Column(String(50), nullable=False, index=True)
    credentials = Column(JSON, nullable=False)
    settings = Column(JSON, nullable=True)
    status = Column(String(50), default=IntegrationStatus.PENDING.value, nullable=False, index=True)
    platform_store_id = Column(String(255), nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

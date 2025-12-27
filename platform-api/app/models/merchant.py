from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from datetime import datetime


class Merchant(Base):
    __tablename__ = "merchants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    domain = Column(String(255), nullable=False, unique=True, index=True)
    tap_agent_id = Column(Integer, nullable=True, index=True)
    tap_key_id = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

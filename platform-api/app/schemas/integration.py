from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from app.models.integration import PlatformType, IntegrationStatus


class IntegrationBase(BaseModel):
    platform_type: PlatformType
    credentials: Dict[str, Any] = Field(..., description="Platform API credentials (API keys, tokens, etc.)")
    settings: Optional[Dict[str, Any]] = None


class IntegrationCreate(IntegrationBase):
    merchant_id: int


class IntegrationUpdate(BaseModel):
    credentials: Optional[Dict[str, Any]] = None
    settings: Optional[Dict[str, Any]] = None
    status: Optional[IntegrationStatus] = None


class IntegrationResponse(IntegrationBase):
    id: int
    merchant_id: int
    status: str
    platform_store_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class IntegrationListResponse(BaseModel):
    integrations: list[IntegrationResponse]
    total: int


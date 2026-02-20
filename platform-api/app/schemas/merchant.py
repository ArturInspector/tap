from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class MerchantBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    domain: Optional[str] = Field(None, max_length=255)


class MerchantCreate(MerchantBase):
    phone: Optional[str] = None


class MerchantUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    domain: Optional[str] = Field(None, min_length=1, max_length=255)
    is_active: Optional[bool] = None


class MerchantResponse(MerchantBase):
    id: int
    tap_agent_id: Optional[int] = None
    tap_key_id: Optional[str] = None
    # Fintech fields
    balance_usd: Optional[float] = None
    balance_kgs: Optional[float] = None
    currency: Optional[str] = None
    kaspi_account: Optional[str] = None
    bank_account: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MerchantListResponse(BaseModel):
    merchants: list[MerchantResponse]
    total: int


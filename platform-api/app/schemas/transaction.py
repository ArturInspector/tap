from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal
from app.models.transaction import TransactionStatus, TransactionType


class TransactionBase(BaseModel):
    merchant_id: int
    transaction_type: TransactionType
    amount_original: Decimal = Field(..., ge=0.01, description="Transaction amount")
    currency_original: str = Field(default="USD", max_length=3)
    description: Optional[str] = None


class PaymentProcessRequest(BaseModel):
    """Request to process payment from AI agent"""
    merchant_id: int
    amount: Decimal = Field(..., ge=0.01, description="Payment amount in USD")
    currency: str = Field(default="USD", max_length=3)
    tap_signature: Optional[str] = Field(None, description="TAP signature for verification")
    tap_signature_input: Optional[str] = Field(None, description="TAP signature-input header")
    tap_agent_id: Optional[str] = Field(None, description="AI agent ID from TAP")
    description: Optional[str] = None
    metadata: Optional[dict] = None


class PaymentProcessResponse(BaseModel):
    """Response after processing payment"""
    transaction_id: int
    status: str
    amount_original: Decimal
    currency_original: str
    amount_converted: Optional[Decimal] = None
    currency_converted: Optional[str] = None
    fee_amount: Decimal
    fee_percentage: Decimal
    net_amount: Decimal
    tap_verified: bool
    merchant_balance_usd: Decimal
    merchant_balance_kgs: Decimal
    created_at: datetime


class WithdrawalRequest(BaseModel):
    """Request to withdraw funds to Kaspi/bank"""
    merchant_id: int
    amount: Decimal = Field(..., ge=0.01, description="Withdrawal amount")
    currency: str = Field(default="KGS", max_length=3)
    withdrawal_account: str = Field(..., description="Kaspi account or bank account")
    description: Optional[str] = None


class WithdrawalResponse(BaseModel):
    """Response after withdrawal request"""
    transaction_id: int
    status: str
    amount: Decimal
    currency: str
    withdrawal_account: str
    fee_amount: Decimal
    net_amount: Decimal
    estimated_completion: Optional[datetime] = None
    created_at: datetime


class CurrencyConversionRequest(BaseModel):
    """Request to convert currency"""
    merchant_id: int
    amount: Decimal = Field(..., ge=0.01)
    from_currency: str = Field(..., max_length=3)
    to_currency: str = Field(..., max_length=3)


class CurrencyConversionResponse(BaseModel):
    """Response after currency conversion"""
    transaction_id: int
    amount_original: Decimal
    currency_original: str
    amount_converted: Decimal
    currency_converted: str
    exchange_rate: Decimal
    fee_amount: Decimal
    created_at: datetime


class TransactionResponse(BaseModel):
    """Transaction details response"""
    id: int
    merchant_id: int
    transaction_type: str
    status: str
    amount_original: Decimal
    currency_original: str
    amount_converted: Optional[Decimal] = None
    currency_converted: Optional[str] = None
    fee_amount: Decimal
    fee_percentage: Decimal
    net_amount: Decimal
    tap_verified: bool
    tap_agent_id: Optional[str] = None
    payment_method: Optional[str] = None
    withdrawal_account: Optional[str] = None
    withdrawal_status: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TransactionListResponse(BaseModel):
    """List of transactions with pagination"""
    transactions: list[TransactionResponse]
    total: int
    page: int
    limit: int


class BalanceResponse(BaseModel):
    """Merchant balance information"""
    merchant_id: int
    available_usd: Decimal
    available_kgs: Decimal
    pending_usd: Decimal = Decimal("0.00")
    pending_kgs: Decimal = Decimal("0.00")
    total_received_usd: Decimal = Decimal("0.00")
    total_received_kgs: Decimal = Decimal("0.00")
    total_withdrawn_kgs: Decimal = Decimal("0.00")
    total_fees_usd: Decimal = Decimal("0.00")


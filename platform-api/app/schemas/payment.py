from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from app.models.payment import PaymentStatus, TransactionType


class PaymentRequest(BaseModel):
    """Запрос на обработку платежа от AI агента"""
    merchant_id: int = Field(..., description="ID мерчанта")
    amount_usd: float = Field(..., gt=0, description="Сумма платежа в USD")
    order_id: Optional[str] = Field(None, description="ID заказа от AI агента")
    
    # TAP verification
    tap_signature: Optional[str] = Field(None, description="TAP подпись для верификации")
    tap_signature_input: Optional[str] = Field(None, description="TAP signature-input header")
    tap_agent_id: Optional[str] = Field(None, description="ID AI агента")
    
    # Metadata
    metadata: Optional[Dict[str, Any]] = Field(None, description="Дополнительные данные")


class PaymentResponse(BaseModel):
    """Ответ на запрос платежа"""
    id: int
    transaction_id: str
    merchant_id: int
    amount_usd: float
    amount_kgs: Optional[float] = None
    currency_rate: Optional[float] = None
    
    # Fees
    platform_fee_percent: float
    platform_fee_amount: Optional[float] = None
    net_amount_usd: Optional[float] = None
    net_amount_kgs: Optional[float] = None
    
    # TAP verification
    is_tap_verified: bool
    tap_agent_id: Optional[str] = None
    
    # Status
    status: str
    transaction_type: str
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class WithdrawalRequest(BaseModel):
    """Запрос на вывод средств"""
    merchant_id: int = Field(..., description="ID мерчанта")
    amount_kgs: float = Field(..., gt=0, description="Сумма вывода в KGS")
    withdrawal_method: str = Field(..., description="Метод вывода: kaspi, bank, payme")
    
    # Payment details
    kaspi_account: Optional[str] = Field(None, description="Номер Kaspi счета")
    bank_account: Optional[str] = Field(None, description="Банковский счет")
    
    metadata: Optional[Dict[str, Any]] = Field(None, description="Дополнительные данные")


class WithdrawalResponse(BaseModel):
    """Ответ на запрос вывода"""
    id: int
    merchant_id: int
    amount_kgs: float
    withdrawal_method: str
    withdrawal_fee: float
    status: str
    external_transaction_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TransactionResponse(BaseModel):
    """Транзакция для аналитики"""
    id: int
    transaction_id: str
    merchant_id: int
    transaction_type: str
    amount_usd: Optional[float] = None
    amount_kgs: Optional[float] = None
    status: str
    is_tap_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class BalanceResponse(BaseModel):
    """Баланс мерчанта"""
    merchant_id: int
    available_usd: float = Field(..., description="Доступно для вывода в USD")
    available_kgs: float = Field(..., description="Доступно для вывода в KGS")
    pending_usd: float = Field(..., description="В обработке в USD")
    pending_kgs: float = Field(..., description="В обработке в KGS")
    total_received_usd: float = Field(..., description="Всего получено в USD")
    total_received_kgs: float = Field(..., description="Всего получено в KGS")
    total_withdrawn_kgs: float = Field(..., description="Всего выведено в KGS")
    total_fees_usd: float = Field(..., description="Всего комиссий в USD")


class CurrencyConversionRequest(BaseModel):
    """Запрос на конвертацию валют"""
    amount_usd: float = Field(..., gt=0, description="Сумма в USD")
    target_currency: str = Field(default="KGS", description="Целевая валюта")


class CurrencyConversionResponse(BaseModel):
    """Ответ на конвертацию валют"""
    amount_usd: float
    amount_kgs: float
    currency_rate: float
    timestamp: datetime


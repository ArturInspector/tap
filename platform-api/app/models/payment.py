from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, JSON, Boolean, Enum as SQLEnum, Text
from datetime import datetime
import enum


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TransactionType(str, enum.Enum):
    PAYMENT = "payment"  # Входящий платеж от AI агента
    WITHDRAWAL = "withdrawal"  # Вывод на Kaspi/банк
    FEE = "fee"  # Комиссия
    REFUND = "refund"  # Возврат


class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_id = Column(Integer, ForeignKey("merchants.id"), nullable=False, index=True)
    
    # Payment details
    amount_usd = Column(Float, nullable=False)  # Сумма в USD
    amount_kgs = Column(Float, nullable=True)  # Сумма в KGS после конвертации
    currency_rate = Column(Float, nullable=True)  # Курс USD/KGS на момент транзакции
    
    # Transaction info
    transaction_id = Column(String(255), unique=True, nullable=False, index=True)
    order_id = Column(String(255), nullable=True, index=True)  # ID заказа от AI агента
    
    # TAP verification
    is_tap_verified = Column(Boolean, default=False, nullable=False, index=True)
    tap_signature = Column(Text, nullable=True)  # TAP подпись для верификации
    tap_agent_id = Column(String(255), nullable=True)  # ID AI агента
    
    # Status
    status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False, index=True)
    transaction_type = Column(SQLEnum(TransactionType), default=TransactionType.PAYMENT, nullable=False)
    
    # Fees
    platform_fee_percent = Column(Float, default=2.0, nullable=False)  # 2% комиссия
    platform_fee_amount = Column(Float, nullable=True)  # Сумма комиссии в USD
    net_amount_usd = Column(Float, nullable=True)  # Сумма после комиссии
    net_amount_kgs = Column(Float, nullable=True)  # Сумма после комиссии в KGS
    
    # Metadata
    metadata_json = Column(JSON, nullable=True)  # Дополнительные данные
    error_message = Column(Text, nullable=True)  # Сообщение об ошибке
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


class Withdrawal(Base):
    __tablename__ = "withdrawals"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_id = Column(Integer, ForeignKey("merchants.id"), nullable=False, index=True)
    payment_id = Column(Integer, ForeignKey("payments.id"), nullable=True)  # Связанный платеж
    
    # Withdrawal details
    amount_kgs = Column(Float, nullable=False)  # Сумма вывода в KGS
    withdrawal_method = Column(String(50), nullable=False)  # kaspi, bank, payme
    
    # Kaspi details
    kaspi_account = Column(String(255), nullable=True)  # Номер Kaspi счета
    bank_account = Column(String(255), nullable=True)  # Банковский счет
    
    # Status
    status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False, index=True)
    
    # Fees
    withdrawal_fee = Column(Float, default=100.0, nullable=False)  # 100 KGS фиксированная комиссия
    
    # Metadata
    external_transaction_id = Column(String(255), nullable=True)  # ID транзакции в Kaspi/банке
    metadata_json = Column(JSON, nullable=True)
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


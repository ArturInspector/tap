from app.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Boolean, Text
from datetime import datetime
import enum


class TransactionStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TransactionType(str, enum.Enum):
    PAYMENT = "payment"  # Payment from AI agent
    WITHDRAWAL = "withdrawal"  # Withdrawal to Kaspi/bank
    CONVERSION = "conversion"  # Currency conversion
    FEE = "fee"  # Transaction fee


class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    merchant_id = Column(Integer, ForeignKey("merchants.id"), nullable=False, index=True)
    
    # Transaction details
    transaction_type = Column(String(50), nullable=False, index=True)
    status = Column(String(50), default=TransactionStatus.PENDING.value, nullable=False, index=True)
    
    # Amounts
    amount_original = Column(Numeric(10, 2), nullable=False)  # Original amount
    currency_original = Column(String(3), nullable=False)  # Original currency (USD)
    amount_converted = Column(Numeric(10, 2), nullable=True)  # Converted amount (KGS)
    currency_converted = Column(String(3), nullable=True)  # Converted currency (KGS)
    
    # Fees
    fee_amount = Column(Numeric(10, 2), default=0.00, nullable=False)
    fee_percentage = Column(Numeric(5, 2), default=2.00, nullable=False)  # Default 2%
    net_amount = Column(Numeric(10, 2), nullable=False)  # Amount after fees
    
    # TAP verification
    tap_verified = Column(Boolean, default=False, nullable=False, index=True)
    tap_signature = Column(Text, nullable=True)  # TAP signature for verification
    tap_agent_id = Column(String(100), nullable=True)  # AI agent ID from TAP
    
    # Payment details
    payment_method = Column(String(50), nullable=True)  # "ai_agent", "kaspi", "bank", etc.
    external_transaction_id = Column(String(255), nullable=True, index=True)  # External payment ID
    
    # Withdrawal details (if type is withdrawal)
    withdrawal_account = Column(String(100), nullable=True)  # Kaspi account or bank account
    withdrawal_status = Column(String(50), nullable=True)  # "pending", "completed", "failed"
    
    # Metadata
    description = Column(Text, nullable=True)
    metadata_json = Column(Text, nullable=True)  # JSON string for additional data
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)


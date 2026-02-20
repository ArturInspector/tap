import logging
from decimal import Decimal
from datetime import datetime
from sqlalchemy.orm import Session
from typing import Optional

from app.models.transaction import Transaction, TransactionStatus, TransactionType
from app.models.merchant import Merchant
from app.services.tap_verification import verify_tap_signature
from app.services.currency_converter import convert_currency
from app.services.kaspi_client import KaspiClient

logger = logging.getLogger(__name__)


class PaymentService:
    """Service for processing payments from AI agents"""
    
    DEFAULT_FEE_PERCENTAGE = Decimal("2.00")  # 2% transaction fee
    KASPI_WITHDRAWAL_FEE = Decimal("100.00")  # Fixed 100 KGS for Kaspi withdrawal
    
    def __init__(self, db: Session):
        self.db = db
        self.kaspi_client = KaspiClient()
    
    async def process_payment(
        self,
        merchant_id: int,
        amount: Decimal,
        currency: str = "USD",
        tap_signature: Optional[str] = None,
        tap_signature_input: Optional[str] = None,
        tap_agent_id: Optional[str] = None,
        description: Optional[str] = None,
        metadata: Optional[dict] = None
    ) -> Transaction:
        """
        Process payment from AI agent with TAP verification
        """
        # Get merchant
        merchant = self.db.query(Merchant).filter(Merchant.id == merchant_id).first()
        if not merchant:
            raise ValueError(f"Merchant {merchant_id} not found")
        
        if not merchant.is_active:
            raise ValueError(f"Merchant {merchant_id} is not active")
        
        # Verify TAP signature if provided
        tap_verified = False
        if tap_signature and tap_signature_input:
            try:
                tap_verified = await verify_tap_signature(
                    signature=tap_signature,
                    signature_input=tap_signature_input,
                    merchant_id=merchant_id
                )
                logger.info(f"TAP verification for merchant {merchant_id}: {tap_verified}")
            except Exception as e:
                logger.error(f"TAP verification failed: {e}")
                tap_verified = False
        
        # Calculate fees
        fee_amount = (amount * self.DEFAULT_FEE_PERCENTAGE) / Decimal("100")
        net_amount = amount - fee_amount
        
        # Convert currency (USD → KGS)
        amount_kgs = None
        exchange_rate = None
        if currency == "USD":
            try:
                conversion_result = await convert_currency(
                    amount=amount,
                    from_currency="USD",
                    to_currency="KGS"
                )
                amount_kgs = conversion_result["amount_converted"]
                exchange_rate = conversion_result["exchange_rate"]
            except Exception as e:
                logger.error(f"Currency conversion failed: {e}")
        
        # Create transaction
        transaction = Transaction(
            merchant_id=merchant_id,
            transaction_type=TransactionType.PAYMENT.value,
            status=TransactionStatus.PROCESSING.value,
            amount_original=amount,
            currency_original=currency,
            amount_converted=amount_kgs,
            currency_converted="KGS" if amount_kgs else None,
            fee_amount=fee_amount,
            fee_percentage=self.DEFAULT_FEE_PERCENTAGE,
            net_amount=net_amount,
            tap_verified=tap_verified,
            tap_signature=tap_signature,
            tap_agent_id=tap_agent_id,
            payment_method="ai_agent",
            description=description or f"Payment from AI agent",
            metadata_json=str(metadata) if metadata else None
        )
        
        self.db.add(transaction)
        self.db.flush()
        
        # Update merchant balance
        merchant.balance_usd += net_amount
        if amount_kgs:
            merchant.balance_kgs += amount_kgs
        
        # Mark transaction as completed
        transaction.status = TransactionStatus.COMPLETED.value
        transaction.completed_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(transaction)
        
        logger.info(f"Payment processed: transaction_id={transaction.id}, amount={amount} {currency}, tap_verified={tap_verified}")
        
        return transaction
    
    async def process_withdrawal(
        self,
        merchant_id: int,
        amount: Decimal,
        currency: str = "KGS",
        withdrawal_account: str = None,
        description: Optional[str] = None
    ) -> Transaction:
        """
        Process withdrawal to Kaspi or bank account
        """
        # Get merchant
        merchant = self.db.query(Merchant).filter(Merchant.id == merchant_id).first()
        if not merchant:
            raise ValueError(f"Merchant {merchant_id} not found")
        
        # Check balance
        if currency == "KGS":
            if merchant.balance_kgs < amount:
                raise ValueError(f"Insufficient balance. Available: {merchant.balance_kgs} KGS, Requested: {amount} KGS")
        elif currency == "USD":
            if merchant.balance_usd < amount:
                raise ValueError(f"Insufficient balance. Available: {merchant.balance_usd} USD, Requested: {amount} USD")
        
        # Calculate fees
        fee_amount = self.KASPI_WITHDRAWAL_FEE if currency == "KGS" else Decimal("5.00")  # $5 for USD withdrawals
        net_amount = amount - fee_amount
        
        # Create transaction
        transaction = Transaction(
            merchant_id=merchant_id,
            transaction_type=TransactionType.WITHDRAWAL.value,
            status=TransactionStatus.PENDING.value,
            amount_original=amount,
            currency_original=currency,
            fee_amount=fee_amount,
            fee_percentage=Decimal("0.00"),  # Fixed fee
            net_amount=net_amount,
            withdrawal_account=withdrawal_account or merchant.kaspi_account,
            withdrawal_status="pending",
            description=description or f"Withdrawal to {withdrawal_account}",
            payment_method="kaspi" if currency == "KGS" else "bank"
        )
        
        self.db.add(transaction)
        self.db.flush()
        
        # Update merchant balance
        if currency == "KGS":
            merchant.balance_kgs -= amount
        else:
            merchant.balance_usd -= amount
        
        # Process withdrawal (mock for demo)
        try:
            withdrawal_result = await self.kaspi_client.process_withdrawal(
                account=withdrawal_account or merchant.kaspi_account,
                amount=net_amount,
                currency=currency
            )
            
            transaction.external_transaction_id = withdrawal_result.get("transaction_id")
            transaction.status = TransactionStatus.COMPLETED.value
            transaction.withdrawal_status = "completed"
            transaction.completed_at = datetime.utcnow()
        except Exception as e:
            logger.error(f"Withdrawal processing failed: {e}")
            transaction.status = TransactionStatus.FAILED.value
            transaction.withdrawal_status = "failed"
            # Refund balance
            if currency == "KGS":
                merchant.balance_kgs += amount
            else:
                merchant.balance_usd += amount
        
        self.db.commit()
        self.db.refresh(transaction)
        
        logger.info(f"Withdrawal processed: transaction_id={transaction.id}, amount={amount} {currency}")
        
        return transaction


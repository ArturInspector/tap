from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from decimal import Decimal

from app.database.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import (
    PaymentProcessRequest,
    PaymentProcessResponse,
    TransactionResponse,
    TransactionListResponse,
    BalanceResponse
)
from app.services.payment_service import PaymentService

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/process", response_model=PaymentProcessResponse, status_code=status.HTTP_201_CREATED)
async def process_payment(
    payment_request: PaymentProcessRequest,
    db: Session = Depends(get_db)
):
    """
    Process payment from AI agent with TAP verification
    
    This endpoint:
    1. Verifies TAP signature (fraud prevention)
    2. Processes payment
    3. Converts USD → KGS
    4. Applies transaction fee (2%)
    5. Updates merchant balance
    """
    try:
        service = PaymentService(db)
        
        transaction = await service.process_payment(
            merchant_id=payment_request.merchant_id,
            amount=payment_request.amount,
            currency=payment_request.currency,
            tap_signature=payment_request.tap_signature,
            tap_signature_input=payment_request.tap_signature_input,
            tap_agent_id=payment_request.tap_agent_id,
            description=payment_request.description,
            metadata=payment_request.metadata
        )
        
        # Get updated merchant balance
        from app.models.merchant import Merchant
        merchant = db.query(Merchant).filter(Merchant.id == payment_request.merchant_id).first()
        
        return PaymentProcessResponse(
            transaction_id=transaction.id,
            status=transaction.status,
            amount_original=transaction.amount_original,
            currency_original=transaction.currency_original,
            amount_converted=transaction.amount_converted,
            currency_converted=transaction.currency_converted,
            fee_amount=transaction.fee_amount,
            fee_percentage=transaction.fee_percentage,
            net_amount=transaction.net_amount,
            tap_verified=transaction.tap_verified,
            merchant_balance_usd=merchant.balance_usd,
            merchant_balance_kgs=merchant.balance_kgs,
            created_at=transaction.created_at
        )
        
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Payment processing failed: {str(e)}")


@router.get("/transactions", response_model=TransactionListResponse)
async def list_transactions(
    merchant_id: Optional[int] = None,
    status: Optional[str] = None,
    transaction_type: Optional[str] = None,
    tap_verified: Optional[bool] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    List transactions with filters
    
    Filters:
    - merchant_id: Filter by merchant
    - status: Filter by transaction status
    - transaction_type: Filter by type (payment, withdrawal, etc.)
    - tap_verified: Filter by TAP verification status
    """
    query = db.query(Transaction)
    
    if merchant_id:
        query = query.filter(Transaction.merchant_id == merchant_id)
    if status:
        query = query.filter(Transaction.status == status)
    if transaction_type:
        query = query.filter(Transaction.transaction_type == transaction_type)
    if tap_verified is not None:
        query = query.filter(Transaction.tap_verified == tap_verified)
    
    total = query.count()
    transactions = query.order_by(Transaction.created_at.desc()).offset(skip).limit(limit).all()
    
    return TransactionListResponse(
        transactions=[TransactionResponse.model_validate(t) for t in transactions],
        total=total,
        page=skip // limit + 1 if limit > 0 else 1,
        limit=limit
    )


@router.get("/transactions/{transaction_id}", response_model=TransactionResponse)
async def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    """
    Get transaction details by ID
    """
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    
    if not transaction:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
    
    return TransactionResponse.model_validate(transaction)


@router.get("/merchants/{merchant_id}/balance", response_model=BalanceResponse)
async def get_merchant_balance(
    merchant_id: int,
    db: Session = Depends(get_db)
):
    """
    Get merchant balance and transaction statistics
    """
    from app.models.merchant import Merchant
    
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Merchant not found")
    
    # Calculate statistics from transactions
    from decimal import Decimal
    
    completed_payments = db.query(Transaction).filter(
        Transaction.merchant_id == merchant_id,
        Transaction.transaction_type == "payment",
        Transaction.status == "completed"
    ).all()
    
    total_received_usd = sum(
        (t.net_amount or Decimal("0.00")) for t in completed_payments 
        if t.currency_original == "USD"
    ) or Decimal("0.00")
    total_received_kgs = sum(
        (t.net_amount or Decimal("0.00")) for t in completed_payments 
        if t.currency_original == "KGS"
    ) or Decimal("0.00")
    total_fees_usd = sum(
        (t.fee_amount or Decimal("0.00")) for t in completed_payments 
        if t.currency_original == "USD"
    ) or Decimal("0.00")
    
    # Pending transactions
    pending_payments = db.query(Transaction).filter(
        Transaction.merchant_id == merchant_id,
        Transaction.transaction_type == "payment",
        Transaction.status.in_(["pending", "processing"])
    ).all()
    
    pending_usd = sum(
        (t.net_amount or Decimal("0.00")) for t in pending_payments 
        if t.currency_original == "USD"
    ) or Decimal("0.00")
    pending_kgs = sum(
        (t.net_amount or Decimal("0.00")) for t in pending_payments 
        if t.currency_original == "KGS"
    ) or Decimal("0.00")
    
    return BalanceResponse(
        merchant_id=merchant_id,
        available_usd=merchant.balance_usd or Decimal("0.00"),
        available_kgs=merchant.balance_kgs or Decimal("0.00"),
        pending_usd=pending_usd or Decimal("0.00"),
        pending_kgs=pending_kgs or Decimal("0.00"),
        total_received_usd=total_received_usd or Decimal("0.00"),
        total_received_kgs=total_received_kgs or Decimal("0.00"),
        total_withdrawn_kgs=Decimal("0.00"),  # Not used in MVP
        total_fees_usd=total_fees_usd or Decimal("0.00")
    )


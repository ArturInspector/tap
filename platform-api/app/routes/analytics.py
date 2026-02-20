from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import Optional

from app.database.database import get_db
from app.models.analytics import OrderAnalytics
from app.models.merchant import Merchant
from app.models.transaction import Transaction, TransactionType, TransactionStatus
from app.schemas.analytics import AnalyticsResponse, AnalyticsStats, OrderAnalyticsResponse

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/merchants/{merchant_id}", response_model=AnalyticsResponse)
def get_merchant_analytics(
    merchant_id: int,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    period_end = datetime.utcnow()
    period_start = period_end - timedelta(days=days)
    
    orders = db.query(OrderAnalytics).filter(
        OrderAnalytics.merchant_id == merchant_id,
        OrderAnalytics.created_at >= period_start,
        OrderAnalytics.created_at <= period_end
    ).all()
    
    total_orders = len(orders)
    tap_orders = sum(1 for o in orders if o.is_tap_order)
    regular_orders = total_orders - tap_orders
    
    total_revenue = sum(o.total_amount or 0 for o in orders)
    tap_revenue = sum(o.total_amount or 0 for o in orders if o.is_tap_order)
    regular_revenue = total_revenue - tap_revenue
    
    orders_by_platform = {}
    revenue_by_platform = {}
    for order in orders:
        platform = order.platform
        orders_by_platform[platform] = orders_by_platform.get(platform, 0) + 1
        revenue_by_platform[platform] = revenue_by_platform.get(platform, 0) + (order.total_amount or 0)
    
    stats = AnalyticsStats(
        total_orders=total_orders,
        tap_orders=tap_orders,
        regular_orders=regular_orders,
        total_revenue=total_revenue,
        tap_revenue=tap_revenue,
        regular_revenue=regular_revenue,
        orders_by_platform=orders_by_platform,
        revenue_by_platform=revenue_by_platform,
    )
    
    recent_orders = sorted(orders, key=lambda x: x.created_at, reverse=True)[:20]
    
    return AnalyticsResponse(
        merchant_id=merchant_id,
        period_start=period_start,
        period_end=period_end,
        stats=stats,
        recent_orders=recent_orders,
    )


@router.get("/orders", response_model=list[OrderAnalyticsResponse])
def list_orders(
    merchant_id: Optional[int] = None,
    platform: Optional[str] = None,
    is_tap_order: Optional[bool] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(OrderAnalytics)
    
    if merchant_id:
        query = query.filter(OrderAnalytics.merchant_id == merchant_id)
    if platform:
        query = query.filter(OrderAnalytics.platform == platform)
    if is_tap_order is not None:
        query = query.filter(OrderAnalytics.is_tap_order == is_tap_order)
    
    orders = query.order_by(OrderAnalytics.created_at.desc()).offset(skip).limit(limit).all()
    return orders


@router.get("/transactions", response_model=dict)
def get_transaction_analytics(
    merchant_id: Optional[int] = None,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db)
):
    """
    Fintech analytics for transactions
    
    Returns:
    - Total transaction volume
    - Fee revenue
    - TAP verified vs unverified transactions
    - Currency conversion stats
    - Withdrawal stats
    """
    period_end = datetime.utcnow()
    period_start = period_end - timedelta(days=days)
    
    query = db.query(Transaction).filter(
        Transaction.created_at >= period_start,
        Transaction.created_at <= period_end
    )
    
    if merchant_id:
        query = query.filter(Transaction.merchant_id == merchant_id)
    
    transactions = query.all()
    
    # Calculate stats
    total_volume = sum(float(t.amount_original) for t in transactions)
    total_fees = sum(float(t.fee_amount) for t in transactions)
    
    tap_verified_count = sum(1 for t in transactions if t.tap_verified)
    tap_verified_volume = sum(float(t.amount_original) for t in transactions if t.tap_verified)
    
    payments = [t for t in transactions if t.transaction_type == TransactionType.PAYMENT.value]
    withdrawals = [t for t in transactions if t.transaction_type == TransactionType.WITHDRAWAL.value]
    
    completed_count = sum(1 for t in transactions if t.status == TransactionStatus.COMPLETED.value)
    failed_count = sum(1 for t in transactions if t.status == TransactionStatus.FAILED.value)
    
    # Currency conversion stats
    conversions = [t for t in transactions if t.amount_converted is not None]
    total_converted_volume = sum(float(t.amount_converted) for t in conversions)
    
    return {
        "period_start": period_start,
        "period_end": period_end,
        "merchant_id": merchant_id,
        "stats": {
            "total_transactions": len(transactions),
            "total_volume_usd": total_volume,
            "total_fees": total_fees,
            "average_fee_percentage": float(total_fees / total_volume * 100) if total_volume > 0 else 0,
            "tap_verified": {
                "count": tap_verified_count,
                "volume_usd": tap_verified_volume,
                "percentage": (tap_verified_count / len(transactions) * 100) if transactions else 0
            },
            "transaction_types": {
                "payments": len(payments),
                "withdrawals": len(withdrawals),
                "payments_volume": sum(float(t.amount_original) for t in payments),
                "withdrawals_volume": sum(float(t.amount_original) for t in withdrawals)
            },
            "status": {
                "completed": completed_count,
                "failed": failed_count,
                "pending": len(transactions) - completed_count - failed_count
            },
            "currency_conversion": {
                "count": len(conversions),
                "total_converted_kgs": total_converted_volume,
                "average_rate": float(total_converted_volume / total_volume) if total_volume > 0 else 0
            }
        }
    }


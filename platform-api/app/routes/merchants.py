from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.merchant import Merchant
from app.schemas.merchant import MerchantCreate, MerchantUpdate, MerchantResponse, MerchantListResponse

router = APIRouter(prefix="/merchants", tags=["merchants"])


@router.post("", response_model=MerchantResponse, status_code=201)
def create_merchant(merchant: MerchantCreate, db: Session = Depends(get_db)):
    # Проверяем только email (domain может быть None)
    existing = db.query(Merchant).filter(Merchant.email == merchant.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Merchant with this email already exists")
    
    # Проверяем domain только если он указан и не пустой
    if merchant.domain and merchant.domain.strip():
        existing_domain = db.query(Merchant).filter(Merchant.domain == merchant.domain).first()
        if existing_domain:
            raise HTTPException(status_code=400, detail="Merchant with this domain already exists")
    
    # Создаем мерчанта, очищая пустые строки в domain
    merchant_data = merchant.model_dump()
    if merchant_data.get('domain') == '':
        merchant_data['domain'] = None
    
    db_merchant = Merchant(**merchant_data)
    db.add(db_merchant)
    db.commit()
    db.refresh(db_merchant)
    return db_merchant


@router.get("", response_model=MerchantListResponse)
def list_merchants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    total = db.query(Merchant).count()
    merchants = db.query(Merchant).offset(skip).limit(limit).all()
    return MerchantListResponse(merchants=merchants, total=total)


@router.get("/{merchant_id}", response_model=MerchantResponse)
def get_merchant(merchant_id: int, db: Session = Depends(get_db)):
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    return merchant


@router.patch("/{merchant_id}", response_model=MerchantResponse)
def update_merchant(merchant_id: int, merchant_update: MerchantUpdate, db: Session = Depends(get_db)):
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    update_data = merchant_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(merchant, field, value)
    
    db.commit()
    db.refresh(merchant)
    return merchant


@router.delete("/{merchant_id}", status_code=204)
def delete_merchant(merchant_id: int, db: Session = Depends(get_db)):
    merchant = db.query(Merchant).filter(Merchant.id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    db.delete(merchant)
    db.commit()
    return None


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.integration import Integration, IntegrationStatus
from app.models.merchant import Merchant
from app.schemas.integration import IntegrationCreate, IntegrationUpdate, IntegrationResponse, IntegrationListResponse

router = APIRouter(prefix="/integrations", tags=["integrations"])


@router.post("", response_model=IntegrationResponse, status_code=201)
def create_integration(integration: IntegrationCreate, db: Session = Depends(get_db)):
    merchant = db.query(Merchant).filter(Merchant.id == integration.merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant not found")
    
    existing = db.query(Integration).filter(
        Integration.merchant_id == integration.merchant_id,
        Integration.platform_type == integration.platform_type.value
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Integration for this platform already exists")
    
    db_integration = Integration(
        merchant_id=integration.merchant_id,
        platform_type=integration.platform_type.value,
        credentials=integration.credentials,
        settings=integration.settings,
    )
    db.add(db_integration)
    db.commit()
    db.refresh(db_integration)
    return db_integration


@router.get("", response_model=IntegrationListResponse)
def list_integrations(merchant_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    query = db.query(Integration)
    if merchant_id:
        query = query.filter(Integration.merchant_id == merchant_id)
    
    total = query.count()
    integrations = query.offset(skip).limit(limit).all()
    return IntegrationListResponse(integrations=integrations, total=total)


@router.get("/{integration_id}", response_model=IntegrationResponse)
def get_integration(integration_id: int, db: Session = Depends(get_db)):
    integration = db.query(Integration).filter(Integration.id == integration_id).first()
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    return integration


@router.patch("/{integration_id}", response_model=IntegrationResponse)
def update_integration(integration_id: int, integration_update: IntegrationUpdate, db: Session = Depends(get_db)):
    integration = db.query(Integration).filter(Integration.id == integration_id).first()
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    update_data = integration_update.model_dump(exclude_unset=True)
    if "status" in update_data:
        if isinstance(update_data["status"], IntegrationStatus):
            update_data["status"] = update_data["status"].value
    
    for field, value in update_data.items():
        setattr(integration, field, value)
    
    db.commit()
    db.refresh(integration)
    return integration


@router.delete("/{integration_id}", status_code=204)
def delete_integration(integration_id: int, db: Session = Depends(get_db)):
    integration = db.query(Integration).filter(Integration.id == integration_id).first()
    if not integration:
        raise HTTPException(status_code=404, detail="Integration not found")
    
    db.delete(integration)
    db.commit()
    return None


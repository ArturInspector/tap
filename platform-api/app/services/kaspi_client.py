import logging
from decimal import Decimal
from typing import Dict, Optional
import uuid

logger = logging.getLogger(__name__)


class KaspiClient:
    """
    Mock Kaspi API client for demo
    
    In production, would integrate with real Kaspi API
    """
    
    async def process_withdrawal(
        self,
        account: str,
        amount: Decimal,
        currency: str = "KGS"
    ) -> Dict[str, str]:
        """
        Process withdrawal to Kaspi account
        
        For demo, simulates successful withdrawal.
        In production, would make real API call to Kaspi.
        """
        logger.info(f"Processing Kaspi withdrawal: account={account}, amount={amount} {currency}")
        
        # Simulate API delay
        import asyncio
        await asyncio.sleep(0.5)
        
        # Mock successful response
        transaction_id = f"KASPI_{uuid.uuid4().hex[:12].upper()}"
        
        logger.info(f"Kaspi withdrawal successful: transaction_id={transaction_id}")
        
        return {
            "transaction_id": transaction_id,
            "status": "completed",
            "account": account,
            "amount": str(amount),
            "currency": currency
        }
    
    async def get_balance(self, account: str) -> Dict[str, str]:
        """
        Get Kaspi account balance (mock)
        """
        return {
            "account": account,
            "balance": "0.00",
            "currency": "KGS"
        }


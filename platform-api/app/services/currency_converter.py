import logging
from decimal import Decimal
from typing import Dict

logger = logging.getLogger(__name__)

# Mock exchange rates for demo
# In production, would fetch from real API (e.g., exchangerate-api.com)
EXCHANGE_RATES = {
    "USD_KGS": Decimal("89.50"),  # 1 USD = 89.50 KGS (approximate rate)
    "KGS_USD": Decimal("0.0112"),  # 1 KGS = 0.0112 USD
}


async def convert_currency(
    amount: Decimal,
    from_currency: str,
    to_currency: str
) -> Dict[str, Decimal]:
    """
    Convert currency (USD ↔ KGS)
    
    For demo, uses mock exchange rates.
    In production, would fetch real-time rates from API.
    """
    if from_currency == to_currency:
        return {
            "amount_converted": amount,
            "exchange_rate": Decimal("1.00")
        }
    
    # Get exchange rate
    rate_key = f"{from_currency}_{to_currency}"
    exchange_rate = EXCHANGE_RATES.get(rate_key)
    
    if not exchange_rate:
        raise ValueError(f"Exchange rate not available for {from_currency} → {to_currency}")
    
    # Convert amount
    amount_converted = amount * exchange_rate
    
    logger.info(f"Currency conversion: {amount} {from_currency} → {amount_converted} {to_currency} (rate: {exchange_rate})")
    
    return {
        "amount_converted": amount_converted,
        "exchange_rate": exchange_rate
    }


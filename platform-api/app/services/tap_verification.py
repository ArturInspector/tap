import logging
import httpx
from typing import Optional
from app.config import settings

logger = logging.getLogger(__name__)


async def verify_tap_signature(
    signature: str,
    signature_input: str,
    merchant_id: int,
    request_body: Optional[str] = None
) -> bool:
    """
    Verify TAP signature using Agent Registry
    
    For fintech hackathon demo, we'll do basic verification.
    In production, this would use full RFC 9421 verification.
    """
    try:
        # Get agent registry URL from settings
        agent_registry_url = getattr(settings, 'agent_registry_url', 'http://agent-registry:8001')
        
        # Extract key_id from signature-input
        # Format: "sig1=...;keyid="key_id";..."
        key_id = None
        if 'keyid=' in signature_input:
            key_id = signature_input.split('keyid=')[1].split(';')[0].strip('"')
        
        if not key_id:
            logger.warning("No key_id found in signature-input")
            return False
        
        # Fetch public key from Agent Registry
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{agent_registry_url}/keys/{key_id}",
                    timeout=5.0
                )
                
                if response.status_code == 200:
                    key_data = response.json()
                    logger.info(f"TAP key found for key_id={key_id}, agent={key_data.get('agent_name')}")
                    # For demo, if key exists in registry, consider it verified
                    # In production, would do full cryptographic verification
                    return True
                else:
                    logger.warning(f"TAP key not found: {response.status_code}")
                    return False
                    
            except httpx.RequestError as e:
                logger.error(f"Failed to connect to Agent Registry: {e}")
                # For demo, return True if Agent Registry is not available
                # In production, this should fail
                return True  # Mock for demo
        
    except Exception as e:
        logger.error(f"TAP verification error: {e}")
        return False


"""AI provider implementations used by the BowlMix provider router."""

from app.services.ai_providers.gemini_provider import (
    generate_bowl_name as generate_gemini_bowl_name,
    generate_pairing_suggestions as generate_gemini_pairing_suggestions,
)
from app.services.ai_providers.local_provider import (
    generate_bowl_name as generate_local_bowl_name,
    generate_pairing_suggestions as generate_local_pairing_suggestions,
)

__all__ = [
    "generate_gemini_bowl_name",
    "generate_gemini_pairing_suggestions",
    "generate_local_bowl_name",
    "generate_local_pairing_suggestions",
]

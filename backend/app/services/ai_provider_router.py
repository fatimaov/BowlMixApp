"""Provider-agnostic routing for BowlMix AI calls."""

import os

from app.services.ai_providers import (
    generate_gemini_bowl_name,
    generate_local_bowl_name,
)


def generate_ai_bowl_name(bowl):
    """Route bowl-name generation to the configured provider.

    ``mock`` (and missing or unsupported configuration) deliberately returns
    ``None`` so the naming service can use its existing fallback logic.
    """
    provider = os.getenv("AI_PROVIDER", "mock").strip().lower()

    if provider == "gemini":
        return generate_gemini_bowl_name(bowl)

    if provider == "local":
        return generate_local_bowl_name(bowl)

    return None

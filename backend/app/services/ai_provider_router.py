"""Provider-agnostic routing for BowlMix AI calls."""

import os

from app.services.ai_providers import (
    generate_gemini_bowl_name,
    generate_gemini_pairing_suggestions,
    generate_local_bowl_name,
    generate_local_pairing_suggestions,
)


def generate_ai_bowl_name(prompt):
    """Route bowl-name generation to the configured provider.

    ``mock`` (and missing or unsupported configuration) deliberately returns
    ``None`` so the naming service can use its existing fallback logic.
    """
    provider = os.getenv("AI_PROVIDER", "mock").strip().lower()

    if provider == "gemini":
        return generate_gemini_bowl_name(prompt)

    if provider == "local":
        return generate_local_bowl_name(prompt)

    return None


def generate_ai_pairing_suggestions(prompt):
    """Route pairing-suggestion generation to the configured provider.

    ``mock`` (and missing or unsupported configuration) deliberately returns
    ``None`` so the pairing-suggestions service can use its mock or fallback
    logic.
    """
    provider = os.getenv("AI_PROVIDER", "mock").strip().lower()

    if provider == "gemini":
        return generate_gemini_pairing_suggestions(prompt)

    if provider == "local":
        return generate_local_pairing_suggestions(prompt)

    return None

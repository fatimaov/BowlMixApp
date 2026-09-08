"""Gemini HTTP provider for BowlMix bowl-name generation."""

import os

import requests


GEMINI_INTERACTIONS_URL = (
    "https://generativelanguage.googleapis.com/v1beta/interactions"
)
API_REVISION = "2026-05-20"


def generate_bowl_name(prompt):
    """Send a bowl-name prompt to Gemini and return a normalized result."""
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    model = os.getenv("GEMINI_MODEL", "").strip()
    timeout_value = os.getenv("AI_TIMEOUT_SECONDS", "").strip()

    if not api_key:
        return _failure("GEMINI_API_KEY is not configured.")
    if not model:
        return _failure("GEMINI_MODEL is not configured.")
    if not timeout_value:
        return _failure("AI_TIMEOUT_SECONDS is not configured.")

    try:
        timeout = float(timeout_value)
    except ValueError:
        return _failure("AI_TIMEOUT_SECONDS must be a number.")

    if timeout <= 0:
        return _failure("AI_TIMEOUT_SECONDS must be greater than zero.")

    if not isinstance(prompt, str) or not prompt.strip():
        return _failure("Gemini input must be a non-empty string.")

    try:
        response = requests.post(
            GEMINI_INTERACTIONS_URL,
            headers={
                "x-goog-api-key": api_key,
                "Content-Type": "application/json",
                "Api-Revision": API_REVISION,
            },
            json={"model": model, "input": prompt},
            timeout=timeout,
        )
    except requests.Timeout:
        return _failure("Gemini request timed out.")
    except requests.RequestException as error:
        return _failure(f"Gemini request failed: {error}")

    if not 200 <= response.status_code < 300:
        return _failure(f"Gemini returned HTTP {response.status_code}.")

    try:
        response_data = response.json()
    except ValueError:
        return _failure("Gemini returned invalid JSON.")

    text = _extract_text(response_data)
    if not text:
        return _failure("Gemini response did not include text.")

    return {
        "success": True,
        "text": text,
        "provider": "gemini",
    }


def _extract_text(response_data):
    steps = response_data.get("steps") if isinstance(response_data, dict) else None
    if isinstance(steps, list):
        for step in reversed(steps):
            if not isinstance(step, dict) or step.get("type") != "model_output":
                continue

            content = step.get("content")
            if not isinstance(content, list):
                continue

            text_parts = [
                item.get("text", "").strip()
                for item in content
                if isinstance(item, dict) and isinstance(item.get("text"), str)
            ]
            text = " ".join(part for part in text_parts if part)
            if text:
                return text

    return None


def _failure(error):
    return {
        "success": False,
        "text": None,
        "provider": "gemini",
        "error": error,
    }

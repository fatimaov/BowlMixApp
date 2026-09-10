"""LM Studio OpenAI-compatible provider for BowlMix bowl-name generation."""

import os

import requests


def generate_bowl_name(prompt):
    """Send a bowl-name prompt to LM Studio and return a normalized result."""
    base_url = os.getenv("LOCAL_AI_BASE_URL", "").strip()
    model = os.getenv("LOCAL_AI_MODEL", "").strip()
    timeout_value = os.getenv("AI_TIMEOUT_SECONDS", "").strip()

    if not base_url:
        return _failure("LOCAL_AI_BASE_URL is not configured.")
    if not model:
        return _failure("LOCAL_AI_MODEL is not configured.")
    if not timeout_value:
        return _failure("AI_TIMEOUT_SECONDS is not configured.")

    try:
        timeout = float(timeout_value)
    except ValueError:
        return _failure("AI_TIMEOUT_SECONDS must be a number.")

    if timeout <= 0:
        return _failure("AI_TIMEOUT_SECONDS must be greater than zero.")

    if not isinstance(prompt, str) or not prompt.strip():
        return _failure("Local AI input must be a non-empty string.")

    endpoint = f"{base_url.rstrip('/')}/v1/responses"

    try:
        response = requests.post(
            endpoint,
            headers={"Content-Type": "application/json"},
            json={"model": model, "input": prompt},
            timeout=timeout,
        )
    except requests.Timeout:
        return _failure("Local AI request timed out.")
    except requests.RequestException as error:
        return _failure(f"Local AI request failed: {error}")

    if not 200 <= response.status_code < 300:
        return _failure(f"Local AI returned HTTP {response.status_code}.")

    try:
        response_data = response.json()
    except ValueError:
        return _failure("Local AI returned invalid JSON.")

    text = _extract_text(response_data)
    if not text:
        return _failure("Local AI response did not include text.")


    return {
        "success": True,
        "text": text,
        "provider": "local",
        "error": None,
    }


def generate_pairing_suggestions(prompt):
    """Placeholder for LM Studio-backed Build Mode pairing suggestions."""
    # TODO: Reuse the provider request configuration above once the pairing
    # prompt and response contract are implemented.
    return {
        "success": False,
        "text": None,
        "provider": "local",
        "error": "Pairing suggestions are not implemented yet.",
    }


def _extract_text(response_data):
    """Extract output text from an OpenAI-compatible Responses payload."""
    if not isinstance(response_data, dict):
        return None

    output_text = response_data.get("output_text")
    if isinstance(output_text, str) and output_text.strip():
        return _normalize_text(output_text)

    output = response_data.get("output")
    if not isinstance(output, list):
        return None

    text_parts = []
    for item in output:
        if not isinstance(item, dict):
            continue

        if item.get("type") == "output_text" and isinstance(item.get("text"), str):
            text_parts.append(_normalize_text(item["text"]))
            continue

        content = item.get("content")
        if not isinstance(content, list):
            continue

        for content_item in content:
            if (
                isinstance(content_item, dict)
                and content_item.get("type") == "output_text"
                and isinstance(content_item.get("text"), str)
            ):
                text_parts.append(_normalize_text(content_item["text"]))

    text = " ".join(part for part in text_parts if part)
    return text or None


def _normalize_text(text):
    """Remove an optional Markdown code-fence wrapper from model output."""
    text = text.strip()
    lines = text.splitlines()

    if (
        len(lines) >= 2
        and lines[0].strip().startswith("```")
        and lines[-1].strip() == "```"
    ):
        return "\n".join(lines[1:-1]).strip()

    return text


def _failure(error):
    return {
        "success": False,
        "text": None,
        "provider": "local",
        "error": error,
    }

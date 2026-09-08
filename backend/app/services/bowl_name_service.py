import json
import random

from app.services.ai_provider_router import generate_ai_bowl_name

NAME_ADJECTIVES = (
    "Bright",
    "Crisp",
    "Fresh",
    "Golden",
    "Garden",
    "Sunny",
    "Bold",
    "Zesty",
    "Cozy",
    "Happy",
    "Lively",
    "Mellow",
    "Radiant",
    "Savory",
    "Vibrant",
    "Wild",
)

NAME_NOUNS = (
    "Sprout",
    "Harvest",
    "Fusion",
    "Crunch",
    "Blend",
    "Mix",
    "Glow",
    "Drizzle",
    "Ripple",
    "Medley",
    "Bounty",
    "Feast",
    "Twist",
    "Bloom",
    "Stack",
    "Dash",
)

DEFAULT_BOWL_NAME = "Bowl Mix"


def generate_bowl_name(bowl):
    ai_name = _try_generate_ai_bowl_name(bowl)
    if ai_name:
        return ai_name

    name = generate_rule_based_bowl_name(bowl)
    return name or DEFAULT_BOWL_NAME


def generate_unique_bowl_name(bowl, used_names):
    used_names = set(used_names or [])

    ai_name = _try_generate_ai_bowl_name(bowl)
    if ai_name and ai_name not in used_names:
        return ai_name

    possible_names = build_possible_names()
    available_names = [name for name in possible_names if name not in used_names]

    if available_names:
        return random.choice(available_names)

    fallback_name = generate_bowl_name(bowl)
    if fallback_name not in used_names:
        return fallback_name

    suffix = 2
    while f"{fallback_name} {suffix}" in used_names:
        suffix += 1

    return f"{fallback_name} {suffix}"


def generate_rule_based_bowl_name(bowl):
    adjective = random.choice(NAME_ADJECTIVES)
    noun = random.choice(NAME_NOUNS)
    return f"{adjective} {noun}".strip()


def build_possible_names():
    return [
        f"{adjective} {noun}" for adjective in NAME_ADJECTIVES for noun in NAME_NOUNS
    ]


def _try_generate_ai_bowl_name(bowl):
    try:
        prompt = _build_bowl_name_prompt(bowl)
        result = generate_ai_bowl_name(prompt)
    except Exception:
        return None

    if not isinstance(result, dict) or not result.get("success"):
        return None

    candidate = result.get("text")
    if not isinstance(candidate, str):
        return None

    candidate = candidate.strip()
    if not candidate or len(candidate) > 80 or "\n" in candidate:
        return None


    return candidate


def _build_bowl_name_prompt(bowl):
    ingredients = bowl.get("ingredients", {}) if isinstance(bowl, dict) else {}
    return (
        "Create one playful, lightweight bowl name. Use the ingredients as "
        "inspiration, but do not make the name recipe-like. Return only the "
        "name, with no quotation marks or explanation.\n\n"
        f"Bowl ingredients:\n{json.dumps(ingredients, ensure_ascii=False)}"
    )

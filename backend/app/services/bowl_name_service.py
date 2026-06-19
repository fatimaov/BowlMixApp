import random


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
    name = generate_rule_based_bowl_name(bowl)
    return name or DEFAULT_BOWL_NAME


def generate_unique_bowl_name(bowl, used_names):
    used_names = set(used_names or [])
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
        f"{adjective} {noun}"
        for adjective in NAME_ADJECTIVES
        for noun in NAME_NOUNS
    ]

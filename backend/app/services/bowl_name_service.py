import random


NAME_ADJECTIVES = (
    "Fresh",
    "Golden",
    "Garden",
    "Sunny",
    "Bold",
    "Bright",
    "Zesty",
    "Cozy",
)

NAME_NOUNS = (
    "Harvest",
    "Crunch",
    "Fusion",
    "Blend",
    "Mix",
    "Glow",
    "Sprout",
    "Drizzle",
)

DEFAULT_BOWL_NAME = "Bowl Mix"


def generate_bowl_name(bowl):
    name = generate_rule_based_bowl_name(bowl)
    return name or DEFAULT_BOWL_NAME


def generate_rule_based_bowl_name(bowl):
    adjective = random.choice(NAME_ADJECTIVES)
    noun = random.choice(NAME_NOUNS)
    return f"{adjective} {noun}".strip()

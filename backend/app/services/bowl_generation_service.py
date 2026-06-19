import random
from collections import defaultdict


CATEGORY_RULES = {
    "bases": {"min": 1, "max": 1},
    "proteins": {"min": 1, "max": 2},
    "vegetables": {"min": 1, "max": 3},
    "toppings": {"min": 0, "max": 2},
    "crunch_elements": {"min": 0, "max": 1},
    "sauces": {"min": 0, "max": 2},
    "extras": {"min": 0, "max": 1},
}

REQUIRED_CATEGORIES = ("bases", "proteins", "vegetables")

CATEGORY_SLUG_OUTPUT_KEYS = {
    "crunch": "crunch_elements",
}


def generate_generate_mode_bowls(ingredient_pool):
    ingredients_by_category = group_ingredients_by_category(ingredient_pool)
    validate_required_categories(ingredients_by_category)

    bowls = []
    for bowl_number in range(1, 4):
        bowl_ingredients = {}

        for category_key, rules in CATEGORY_RULES.items():
            category_ingredients = ingredients_by_category.get(category_key, [])
            selected_ingredients = select_random_ingredients(
                category_ingredients,
                rules["min"],
                rules["max"],
            )
            bowl_ingredients[category_key] = [
                serialize_ingredient(ingredient) for ingredient in selected_ingredients
            ]

        bowls.append(
            {
                "name": f"Demo Bowl {bowl_number}",
                "ingredients": bowl_ingredients,
            }
        )

    return bowls


def group_ingredients_by_category(ingredient_pool):
    ingredients_by_category = defaultdict(list)

    for ingredient in ingredient_pool:
        category_slug = ingredient.category.slug
        category_key = CATEGORY_SLUG_OUTPUT_KEYS.get(category_slug, category_slug)
        ingredients_by_category[category_key].append(ingredient)

    return dict(ingredients_by_category)


def validate_required_categories(ingredients_by_category):
    for category_key in REQUIRED_CATEGORIES:
        if not ingredients_by_category.get(category_key):
            raise ValueError(
                f"Cannot generate bowls without default ingredients for required "
                f"category: {category_key}"
            )


def select_random_ingredients(ingredients, min_count, max_count):
    available_count = len(ingredients)
    if available_count < min_count:
        raise ValueError(
            f"Cannot select {min_count} ingredient(s) from a pool of {available_count}."
        )

    selected_count = random.randint(min_count, min(max_count, available_count))
    if selected_count == 0:
        return []

    return random.sample(ingredients, selected_count)


def serialize_ingredient(ingredient):
    return {
        "id": ingredient.id,
        "name": ingredient.name,
        "category": {
            "id": ingredient.category.id,
            "name": ingredient.category.name,
            "slug": ingredient.category.slug,
            "color_key": ingredient.category.color_key,
            "shape_family": ingredient.category.shape_family,
        },
        "visual_pattern": ingredient.visual_pattern,
    }

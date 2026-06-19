import random
from collections import defaultdict

from app.services.bowl_name_service import generate_bowl_name
from app.services.bowl_validation_service import (
    CATEGORY_RULES,
    get_ingredient_category_key,
    get_ingredient_id,
    get_ingredient_ids,
    validate_generation_inputs,
)


def generate_generate_mode_bowls(
    ingredient_pool,
    locked_ingredients=None,
    excluded_ingredients=None,
):
    locked_ingredients = locked_ingredients or []
    excluded_ingredients = excluded_ingredients or []
    available_ingredient_pool = remove_excluded_ingredients(
        ingredient_pool,
        excluded_ingredients,
    )
    ingredients_by_category = group_ingredients_by_category(available_ingredient_pool)
    locked_ingredients_by_category = group_ingredients_by_category(locked_ingredients)

    validate_generation_inputs(
        ingredients_by_category,
        locked_ingredients_by_category,
        available_ingredient_pool,
        locked_ingredients,
        excluded_ingredients,
    )

    bowls = []
    for _ in range(3):
        bowl_ingredients = {}

        for category_key, rules in CATEGORY_RULES.items():
            category_ingredients = ingredients_by_category.get(category_key, [])
            locked_category_ingredients = locked_ingredients_by_category.get(
                category_key,
                [],
            )
            selected_ingredients = select_random_ingredients(
                category_ingredients,
                locked_category_ingredients,
                rules["min"],
                rules["max"],
            )
            bowl_ingredients[category_key] = [
                serialize_ingredient(ingredient) for ingredient in selected_ingredients
            ]

        bowl = {"ingredients": bowl_ingredients}
        bowl["name"] = generate_bowl_name(bowl)
        bowls.append(
            {
                "name": bowl["name"],
                "ingredients": bowl["ingredients"],
            }
        )

    return bowls


def group_ingredients_by_category(ingredient_pool):
    ingredients_by_category = defaultdict(list)

    for ingredient in ingredient_pool:
        category_key = get_ingredient_category_key(ingredient)
        ingredients_by_category[category_key].append(ingredient)

    return dict(ingredients_by_category)


def remove_excluded_ingredients(ingredient_pool, excluded_ingredients):
    excluded_ids = get_ingredient_ids(excluded_ingredients)
    return [
        ingredient
        for ingredient in ingredient_pool
        if get_ingredient_id(ingredient) not in excluded_ids
    ]


def select_random_ingredients(ingredients, locked_ingredients, min_count, max_count):
    locked_ids = get_ingredient_ids(locked_ingredients)
    unlocked_ingredients = [
        ingredient
        for ingredient in ingredients
        if get_ingredient_id(ingredient) not in locked_ids
    ]
    locked_count = len(locked_ingredients)
    minimum_count = max(min_count, locked_count)
    available_count = locked_count + len(unlocked_ingredients)

    if available_count < minimum_count:
        raise ValueError(
            f"Cannot select {minimum_count} ingredient(s) from a pool of "
            f"{available_count}."
        )

    selected_count = random.randint(minimum_count, min(max_count, available_count))
    random_count = selected_count - locked_count
    if random_count == 0:
        return list(locked_ingredients)

    return list(locked_ingredients) + random.sample(unlocked_ingredients, random_count)


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

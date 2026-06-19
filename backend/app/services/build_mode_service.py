from app.services.bowl_name_service import generate_bowl_name
from app.services.bowl_validation_service import (
    CATEGORY_RULES,
    CATEGORY_SLUG_OUTPUT_KEYS,
    get_ingredient_category_key,
    validate_bowl_composition,
)


def generate_build_mode_bowl(selected_ingredients):
    selected_ingredients = selected_ingredients or []
    ingredients_by_category = group_selected_ingredients_by_category(
        selected_ingredients
    )
    validate_bowl_composition(ingredients_by_category)

    bowl = {
        "ingredients": {
            category_key: [
                serialize_ingredient(ingredient)
                for ingredient in ingredients_by_category[category_key]
            ]
            for category_key in CATEGORY_RULES
        }
    }
    bowl["name"] = generate_bowl_name(bowl)

    return {
        "name": bowl["name"],
        "ingredients": bowl["ingredients"],
    }


def group_selected_ingredients_by_category(selected_ingredients):
    ingredients_by_category = {category_key: [] for category_key in CATEGORY_RULES}

    if isinstance(selected_ingredients, dict):
        for category_key, ingredients in selected_ingredients.items():
            normalized_category_key = normalize_category_key(category_key)
            if normalized_category_key not in CATEGORY_RULES:
                raise ValueError(
                    f"Unsupported ingredient category: {normalized_category_key}."
                )

            ingredients_by_category[normalized_category_key].extend(ingredients or [])

        return ingredients_by_category

    for ingredient in selected_ingredients:
        category_key = get_ingredient_category_key(ingredient)
        if category_key not in CATEGORY_RULES:
            raise ValueError(f"Unsupported ingredient category: {category_key}.")

        ingredients_by_category[category_key].append(ingredient)

    return ingredients_by_category


def normalize_category_key(category_key):
    return CATEGORY_SLUG_OUTPUT_KEYS.get(category_key, category_key)


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

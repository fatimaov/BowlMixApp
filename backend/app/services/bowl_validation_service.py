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
MAX_LOCKED_CATEGORIES = 3

CATEGORY_SLUG_OUTPUT_KEYS = {
    "crunch": "crunch_elements",
}


def validate_generation_inputs(
    ingredients_by_category,
    locked_ingredients_by_category,
    ingredient_pool,
    locked_ingredients,
    excluded_ingredients,
):
    validate_locked_exclusions(locked_ingredients, excluded_ingredients)
    validate_locked_ingredients_in_pool(ingredient_pool, locked_ingredients)
    validate_locked_category_count(locked_ingredients_by_category)
    validate_locked_ingredient_limits(locked_ingredients_by_category)
    validate_required_categories(ingredients_by_category)


def validate_locked_ingredient_limits(locked_ingredients_by_category):
    for category_key, locked_ingredients in locked_ingredients_by_category.items():
        if category_key not in CATEGORY_RULES:
            raise ValueError(f"Unsupported locked ingredient category: {category_key}")

        max_count = CATEGORY_RULES[category_key]["max"]
        locked_count = len(locked_ingredients)
        if locked_count > max_count:
            raise ValueError(
                f"Too many locked ingredients for {category_key}: "
                f"{locked_count} locked, maximum is {max_count}."
            )


def validate_locked_category_count(locked_ingredients_by_category):
    locked_category_count = sum(
        1 for ingredients in locked_ingredients_by_category.values() if ingredients
    )

    if locked_category_count > MAX_LOCKED_CATEGORIES:
        raise ValueError(
            f"Locked ingredients may be used in at most {MAX_LOCKED_CATEGORIES} "
            f"categories."
        )


def validate_required_categories(ingredients_by_category):
    for category_key in REQUIRED_CATEGORIES:
        if not ingredients_by_category.get(category_key):
            raise ValueError(
                f"Cannot generate bowls without available ingredients for required "
                f"category: {category_key}."
            )


def validate_locked_exclusions(locked_ingredients, excluded_ingredients):
    excluded_ids = get_ingredient_ids(excluded_ingredients)

    for ingredient in locked_ingredients:
        if get_ingredient_id(ingredient) in excluded_ids:
            raise ValueError(
                f"Ingredient cannot be both locked and excluded: {ingredient.name}."
            )


def validate_locked_ingredients_in_pool(ingredient_pool, locked_ingredients):
    ingredient_pool_ids = get_ingredient_ids(ingredient_pool)

    for ingredient in locked_ingredients:
        if get_ingredient_id(ingredient) not in ingredient_pool_ids:
            raise ValueError(
                f"Locked ingredient is not available for generation: "
                f"{ingredient.name}."
            )


def get_ingredient_category_key(ingredient):
    category_slug = ingredient.category.slug
    return CATEGORY_SLUG_OUTPUT_KEYS.get(category_slug, category_slug)


def get_ingredient_ids(ingredients):
    return {get_ingredient_id(ingredient) for ingredient in ingredients}


def get_ingredient_id(ingredient):
    return ingredient.id

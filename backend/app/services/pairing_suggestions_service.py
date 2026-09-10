"""Build Mode AI pairing-suggestion service.

The future pairing-suggestions route should remain thin and delegate its
business logic to this service.
"""

from app.services.bowl_validation_service import (
    CATEGORY_RULES,
    CATEGORY_SLUG_OUTPUT_KEYS,
)
from app.services.ingredient_service import (
    get_active_available_ingredients_for_user,
    get_active_available_ingredient_rows_for_user,
    get_category_by_id,
    get_is_available,
    normalize_selected_ingredient_ids,
)


def build_pairing_suggestion_context(
    user_id,
    target_category_id,
    selected_ingredient_ids,
):
    """Build the validated Build Mode context and target candidate pool.

    Returned ingredients are ORM objects for internal service use. A future
    response formatter can serialize the final, validated suggestions.
    """
    target_category = get_category_by_id(target_category_id)
    if target_category is None:
        raise ValueError("Category not found.")

    target_category_key = CATEGORY_SLUG_OUTPUT_KEYS.get(
        target_category.slug,
        target_category.slug,
    )
    if target_category_key not in CATEGORY_RULES:
        raise ValueError("Category is not supported in Build Mode.")

    normalized_selected_ids = normalize_selected_ingredient_ids(
        selected_ingredient_ids
    )
    selected_ingredients = get_active_available_ingredients_for_user(
        user_id,
        normalized_selected_ids,
    )
    selected_by_category = {category_key: [] for category_key in CATEGORY_RULES}
    selected_target_ingredients = []
    selected_other_ingredients = []

    for ingredient in selected_ingredients:
        category_key = CATEGORY_SLUG_OUTPUT_KEYS.get(
            ingredient.category.slug,
            ingredient.category.slug,
        )
        if category_key not in selected_by_category:
            raise ValueError("Selected ingredient category is not supported in Build Mode.")

        selected_by_category[category_key].append(ingredient)

        if ingredient.category_id == target_category.id:
            selected_target_ingredients.append(ingredient)
        else:
            selected_other_ingredients.append(ingredient)

    selected_target_ids = {
        ingredient.id for ingredient in selected_target_ingredients
    }
    candidate_rows = get_active_available_ingredient_rows_for_user(user_id)
    available_candidates = []
    unavailable_candidates = []

    for ingredient, user_ingredient in candidate_rows:
        if (
            ingredient.category_id != target_category.id
            or ingredient.id in selected_target_ids
        ):
            continue

        if get_is_available(ingredient, user_ingredient):
            available_candidates.append(ingredient)
        else:
            unavailable_candidates.append(ingredient)

    available_candidates.sort(key=lambda ingredient: ingredient.name.lower())
    unavailable_candidates.sort(key=lambda ingredient: ingredient.name.lower())

    target_max = CATEGORY_RULES[target_category_key]["max"]
    return {
        "target_category": target_category,
        "target_category_key": target_category_key,
        "selected_ingredients_by_category": selected_by_category,
        "selected_target_ingredients": selected_target_ingredients,
        "selected_other_ingredients": selected_other_ingredients,
        "has_useful_pairing_context": bool(selected_other_ingredients),
        "target_category_is_full": len(selected_target_ingredients) >= target_max,
        "available_candidates": available_candidates,
        "unavailable_candidates": unavailable_candidates,
    }


def get_pairing_suggestions(
    *,
    target_category,
    current_selections,
    ingredient_pool,
    availability_state,
):
    """Return pairing suggestions for a Build Mode category.

    This function intentionally contains the service boundary and no business
    logic yet. The eventual route should validate the request shape and call
    this function with authenticated user data.
    """
    # TODO: Build the pairing context from authenticated user data.
    # TODO: Call the selected AI provider only when useful context exists.
    # TODO: Validate provider output and map it to existing active ingredients.
    # TODO: Fall back to randomized valid suggestions when AI is unavailable.
    # TODO: Return clean formatted suggestions with availability state.
    _ = (target_category, current_selections, ingredient_pool, availability_state)
    return []

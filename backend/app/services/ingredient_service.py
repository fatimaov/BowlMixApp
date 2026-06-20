from sqlalchemy import and_, func, or_, select
from sqlalchemy.orm import joinedload

from app.config.extensions import db
from app.models import Ingredient, IngredientCategory, UserIngredient


MIN_SEARCH_LENGTH = 3
DEFAULT_CUSTOM_VISUAL_PATTERN = "solid"


def get_user_ingredients(user_id, search=None):
    search_text = normalize_search(search)
    statement = (
        select(Ingredient, UserIngredient)
        .join(Ingredient.category)
        .outerjoin(
            UserIngredient,
            and_(
                UserIngredient.ingredient_id == Ingredient.id,
                UserIngredient.user_id == user_id,
            ),
        )
        .where(
            Ingredient.is_active.is_(True),
            or_(
                Ingredient.is_default.is_(True),
                Ingredient.creator_user_id == user_id,
            ),
        )
        .options(joinedload(Ingredient.category))
    )

    if should_apply_search(search_text):
        statement = statement.where(
            func.lower(Ingredient.name).contains(search_text.lower())
        )

    rows = db.session.execute(statement).all()
    serialized_ingredients = [
        serialize_ingredient_for_management(ingredient, user_ingredient)
        for ingredient, user_ingredient in rows
    ]

    return sorted(
        serialized_ingredients,
        key=lambda ingredient: (
            ingredient["category"]["sort_order"],
            not ingredient["is_available"],
            ingredient["name"].lower(),
        ),
    )


def get_ingredient_selector_options(user_id, category_id, search=None):
    category = get_category_by_id(category_id)
    if category is None:
        raise ValueError("Category not found.")

    search_text = normalize_search(search)
    statement = (
        select(Ingredient, UserIngredient)
        .outerjoin(
            UserIngredient,
            and_(
                UserIngredient.ingredient_id == Ingredient.id,
                UserIngredient.user_id == user_id,
            ),
        )
        .where(
            Ingredient.category_id == category.id,
            Ingredient.is_active.is_(True),
            or_(
                Ingredient.is_default.is_(True),
                Ingredient.creator_user_id == user_id,
            ),
        )
        .options(joinedload(Ingredient.category))
    )

    if should_apply_search(search_text):
        statement = statement.where(
            func.lower(Ingredient.name).contains(search_text.lower())
        )

    rows = db.session.execute(statement).all()
    serialized_ingredients = [
        serialize_ingredient_for_selector(ingredient, user_ingredient)
        for ingredient, user_ingredient in rows
    ]

    return sorted(
        serialized_ingredients,
        key=lambda ingredient: (
            not ingredient["is_available"],
            ingredient["name"].lower(),
        ),
    )


def create_custom_ingredient(user_id, data):
    data = data or {}
    name = validate_ingredient_name(data.get("name"))
    category_id = data.get("category_id")
    category = get_category_by_id(category_id)

    if category is None:
        raise ValueError("Category not found.")

    validate_unique_visible_ingredient_name(user_id, category.id, name)

    ingredient = Ingredient(
        name=name,
        category_id=category.id,
        visual_pattern=normalize_visual_pattern(data.get("visual_pattern")),
        is_default=False,
        creator_user_id=user_id,
        is_active=True,
    )
    db.session.add(ingredient)
    db.session.flush()

    user_ingredient = UserIngredient(
        user_id=user_id,
        ingredient_id=ingredient.id,
        is_available=True,
    )
    db.session.add(user_ingredient)
    db.session.commit()

    return serialize_ingredient_for_management(ingredient, user_ingredient)


def update_custom_ingredient(user_id, ingredient_id, data):
    ingredient = get_active_custom_ingredient_for_user(user_id, ingredient_id)
    data = data or {}
    name = validate_ingredient_name(data.get("name"))

    validate_unique_visible_ingredient_name(
        user_id,
        ingredient.category_id,
        name,
        excluded_ingredient_id=ingredient.id,
    )

    ingredient.name = name
    db.session.commit()

    return serialize_ingredient_for_management(
        ingredient,
        get_user_ingredient(user_id, ingredient.id),
    )


def soft_delete_custom_ingredient(user_id, ingredient_id):
    ingredient = get_active_custom_ingredient_for_user(user_id, ingredient_id)
    ingredient.is_active = False
    db.session.commit()

    return {"success": True}


def get_category_by_id(category_id):
    if category_id is None:
        raise ValueError("Category is required.")

    try:
        normalized_category_id = int(category_id)
    except (TypeError, ValueError):
        raise ValueError("Category is invalid.") from None

    statement = select(IngredientCategory).where(
        IngredientCategory.id == normalized_category_id
    )
    return db.session.execute(statement).scalar_one_or_none()


def get_active_custom_ingredient_for_user(user_id, ingredient_id):
    statement = (
        select(Ingredient)
        .where(
            Ingredient.id == ingredient_id,
            Ingredient.is_active.is_(True),
            Ingredient.is_default.is_(False),
            Ingredient.creator_user_id == user_id,
        )
        .options(joinedload(Ingredient.category))
    )
    ingredient = db.session.execute(statement).scalar_one_or_none()

    if ingredient is None:
        raise ValueError("Custom ingredient not found.")

    return ingredient


def get_user_ingredient(user_id, ingredient_id):
    statement = select(UserIngredient).where(
        UserIngredient.user_id == user_id,
        UserIngredient.ingredient_id == ingredient_id,
    )
    return db.session.execute(statement).scalar_one_or_none()


def validate_unique_visible_ingredient_name(
    user_id,
    category_id,
    name,
    excluded_ingredient_id=None,
):
    statement = select(Ingredient).where(
        Ingredient.category_id == category_id,
        Ingredient.is_active.is_(True),
        func.lower(Ingredient.name) == name.lower(),
        or_(
            Ingredient.is_default.is_(True),
            Ingredient.creator_user_id == user_id,
        ),
    )

    if excluded_ingredient_id is not None:
        statement = statement.where(Ingredient.id != excluded_ingredient_id)

    duplicate_ingredient = db.session.execute(statement.limit(1)).scalar_one_or_none()
    if duplicate_ingredient is not None:
        raise ValueError("Ingredient name already exists in this category.")


def serialize_ingredient_for_management(ingredient, user_ingredient=None):
    return serialize_ingredient(
        ingredient,
        user_ingredient=user_ingredient,
        can_edit=can_edit_ingredient(ingredient),
        can_delete=can_delete_ingredient(ingredient),
        can_toggle_availability=True,
    )


def serialize_ingredient_for_selector(ingredient, user_ingredient=None):
    is_available = get_is_available(ingredient, user_ingredient)
    return serialize_ingredient(
        ingredient,
        user_ingredient=user_ingredient,
        can_toggle_availability=True,
        selectable=is_available,
    )


def serialize_ingredient(
    ingredient,
    user_ingredient=None,
    can_edit=None,
    can_delete=None,
    can_toggle_availability=None,
    selectable=None,
):
    is_available = get_is_available(ingredient, user_ingredient)
    serialized = {
        "id": ingredient.id,
        "name": ingredient.name,
        "category": {
            "id": ingredient.category.id,
            "name": ingredient.category.name,
            "slug": ingredient.category.slug,
            "sort_order": ingredient.category.sort_order,
        },
        "is_default": ingredient.is_default,
        "is_active": ingredient.is_active,
        "is_available": is_available,
        "visual_pattern": ingredient.visual_pattern,
    }

    if can_edit is not None:
        serialized["can_edit"] = can_edit

    if can_delete is not None:
        serialized["can_delete"] = can_delete

    if can_toggle_availability is not None:
        serialized["can_toggle_availability"] = can_toggle_availability

    if selectable is not None:
        serialized["selectable"] = selectable

    return serialized


def can_edit_ingredient(ingredient):
    return not ingredient.is_default


def can_delete_ingredient(ingredient):
    return not ingredient.is_default


def get_is_available(ingredient, user_ingredient=None):
    if user_ingredient is None:
        return True

    return user_ingredient.is_available


def validate_ingredient_name(name):
    normalized_name = normalize_ingredient_name(name)
    if not normalized_name:
        raise ValueError("Ingredient name is required.")

    return normalized_name


def normalize_ingredient_name(name):
    if name is None:
        return ""

    return str(name).strip()


def normalize_visual_pattern(visual_pattern):
    if visual_pattern is None:
        return DEFAULT_CUSTOM_VISUAL_PATTERN

    normalized_visual_pattern = str(visual_pattern).strip()
    return normalized_visual_pattern or DEFAULT_CUSTOM_VISUAL_PATTERN


def normalize_search(search):
    if search is None:
        return ""

    return str(search).strip()


def should_apply_search(search_text):
    return len(search_text) >= MIN_SEARCH_LENGTH

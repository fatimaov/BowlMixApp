from datetime import datetime, timezone

from sqlalchemy import and_, or_, select
from sqlalchemy.orm import joinedload

from app.config.extensions import db
from app.models import Ingredient, SavedBowl, SavedBowlIngredient, UserIngredient
from app.services.snapshot_service import (
    create_snapshot_records,
    serialize_snapshots,
)


MAX_BOWL_NAME_LENGTH = 120


def create_saved_bowl(user_id, data):
    data = data or {}
    ai_generated_name = validate_bowl_name(
        data.get("ai_generated_name") or data.get("name"),
        field_name="Bowl name",
    )
    custom_name = normalize_optional_bowl_name(data.get("custom_name"))
    ingredient_ids = extract_ingredient_ids(data)
    ingredients = get_available_ingredients_for_snapshot(user_id, ingredient_ids)

    saved_bowl = SavedBowl(
        user_id=user_id,
        custom_name=custom_name,
        ai_generated_name=ai_generated_name,
        deleted_at=None,
    )
    db.session.add(saved_bowl)
    db.session.flush()

    snapshots = create_snapshot_records(saved_bowl.id, ingredients)
    db.session.commit()

    return serialize_saved_bowl_detail(saved_bowl, snapshots)


def get_saved_bowls(user_id):
    statement = (
        select(SavedBowl)
        .where(
            SavedBowl.user_id == user_id,
            SavedBowl.deleted_at.is_(None),
        )
        .order_by(SavedBowl.created_at.desc(), SavedBowl.id.desc())
    )
    saved_bowls = db.session.execute(statement).scalars().all()

    return [
        serialize_saved_bowl_list_item(
            saved_bowl,
            get_snapshot_records(saved_bowl.id),
        )
        for saved_bowl in saved_bowls
    ]


def get_saved_bowl(user_id, saved_bowl_id):
    saved_bowl = get_active_saved_bowl_for_user(user_id, saved_bowl_id)
    return serialize_saved_bowl_detail(saved_bowl, get_snapshot_records(saved_bowl.id))


def rename_saved_bowl(user_id, saved_bowl_id, new_name):
    saved_bowl = get_active_saved_bowl_for_user(user_id, saved_bowl_id)
    saved_bowl.custom_name = validate_bowl_name(new_name, field_name="Bowl name")
    db.session.commit()

    return serialize_saved_bowl_detail(saved_bowl, get_snapshot_records(saved_bowl.id))


def soft_delete_saved_bowl(user_id, saved_bowl_id):
    saved_bowl = get_active_saved_bowl_for_user(user_id, saved_bowl_id)
    saved_bowl.deleted_at = datetime.now(timezone.utc)
    db.session.commit()

    return {"success": True}


def get_active_saved_bowl_for_user(user_id, saved_bowl_id):
    statement = select(SavedBowl).where(
        SavedBowl.id == saved_bowl_id,
        SavedBowl.user_id == user_id,
        SavedBowl.deleted_at.is_(None),
    )
    saved_bowl = db.session.execute(statement).scalar_one_or_none()

    if saved_bowl is None:
        raise ValueError("Saved bowl not found.")

    return saved_bowl


def get_snapshot_records(saved_bowl_id):
    statement = (
        select(SavedBowlIngredient)
        .where(SavedBowlIngredient.saved_bowl_id == saved_bowl_id)
        .order_by(
            SavedBowlIngredient.sort_order_snapshot,
            SavedBowlIngredient.ingredient_name_snapshot,
            SavedBowlIngredient.id,
        )
    )
    return db.session.execute(statement).scalars().all()


def get_available_ingredients_for_snapshot(user_id, ingredient_ids):
    statement = (
        select(Ingredient)
        .outerjoin(
            UserIngredient,
            and_(
                UserIngredient.ingredient_id == Ingredient.id,
                UserIngredient.user_id == user_id,
            ),
        )
        .where(
            Ingredient.id.in_(ingredient_ids),
            Ingredient.is_active.is_(True),
            or_(
                Ingredient.is_default.is_(True),
                Ingredient.creator_user_id == user_id,
            ),
            or_(
                UserIngredient.id.is_(None),
                UserIngredient.is_available.is_(True),
            ),
        )
        .options(joinedload(Ingredient.category))
    )
    ingredients = db.session.execute(statement).scalars().all()
    ingredients_by_id = {ingredient.id: ingredient for ingredient in ingredients}

    missing_ids = [
        ingredient_id
        for ingredient_id in ingredient_ids
        if ingredient_id not in ingredients_by_id
    ]
    if missing_ids:
        raise ValueError("Bowl contains unavailable or invalid ingredients.")

    return [ingredients_by_id[ingredient_id] for ingredient_id in ingredient_ids]


def extract_ingredient_ids(data):
    composition = get_bowl_composition(data)
    raw_ingredients = flatten_composition(composition)
    ingredient_ids = [
        extract_ingredient_id(ingredient)
        for ingredient in raw_ingredients
    ]

    if not ingredient_ids:
        raise ValueError("Saved bowl must include at least one ingredient.")

    if len(ingredient_ids) != len(set(ingredient_ids)):
        raise ValueError("Saved bowl contains duplicate ingredients.")

    return ingredient_ids


def get_bowl_composition(data):
    if "ingredients" in data:
        return data.get("ingredients")

    bowl = data.get("bowl")
    if isinstance(bowl, dict) and "ingredients" in bowl:
        return bowl.get("ingredients")

    raise ValueError("Saved bowl ingredients are required.")


def flatten_composition(composition):
    if isinstance(composition, dict):
        flattened = []
        for ingredients in composition.values():
            flattened.extend(flatten_composition(ingredients))
        return flattened

    if isinstance(composition, list):
        return composition

    raise ValueError("Saved bowl ingredients are invalid.")


def extract_ingredient_id(ingredient):
    if isinstance(ingredient, dict):
        ingredient_id = ingredient.get("id") or ingredient.get("ingredient_id")
    else:
        ingredient_id = ingredient

    try:
        return int(ingredient_id)
    except (TypeError, ValueError):
        raise ValueError("Saved bowl contains an invalid ingredient.") from None


def serialize_saved_bowl_list_item(saved_bowl, snapshots):
    serialized = serialize_saved_bowl_base(saved_bowl)
    serialized["ingredient_count"] = len(snapshots)
    serialized["ingredients"] = serialize_snapshots(snapshots)
    return serialized


def serialize_saved_bowl_detail(saved_bowl, snapshots):
    serialized = serialize_saved_bowl_base(saved_bowl)
    serialized["ingredients"] = serialize_snapshots(snapshots)
    return serialized


def serialize_saved_bowl_base(saved_bowl):
    display_name = saved_bowl.custom_name or saved_bowl.ai_generated_name
    return {
        "id": saved_bowl.id,
        "user_id": saved_bowl.user_id,
        "name": display_name,
        "custom_name": saved_bowl.custom_name,
        "ai_generated_name": saved_bowl.ai_generated_name,
        "created_at": serialize_datetime(saved_bowl.created_at),
        "deleted_at": serialize_datetime(saved_bowl.deleted_at),
    }


def validate_bowl_name(name, field_name="Name"):
    normalized_name = normalize_bowl_name(name)
    if not normalized_name:
        raise ValueError(f"{field_name} is required.")

    if len(normalized_name) > MAX_BOWL_NAME_LENGTH:
        raise ValueError(
            f"{field_name} must be {MAX_BOWL_NAME_LENGTH} characters or fewer."
        )

    return normalized_name


def normalize_optional_bowl_name(name):
    normalized_name = normalize_bowl_name(name)
    if not normalized_name:
        return None

    if len(normalized_name) > MAX_BOWL_NAME_LENGTH:
        raise ValueError(
            f"Custom name must be {MAX_BOWL_NAME_LENGTH} characters or fewer."
        )

    return normalized_name


def normalize_bowl_name(name):
    if name is None:
        return ""

    return str(name).strip()


def serialize_datetime(value):
    if value is None:
        return None

    return value.isoformat()

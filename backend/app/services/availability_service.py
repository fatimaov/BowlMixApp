from sqlalchemy import and_, or_, select
from sqlalchemy.orm import joinedload

from app.config.extensions import db
from app.models import Ingredient, UserIngredient


def set_ingredient_availability(user_id, ingredient_id, is_available):
    validate_is_available(is_available)

    ingredient = get_active_available_scope_ingredient(user_id, ingredient_id)
    user_ingredient = get_user_ingredient(user_id, ingredient.id)

    if user_ingredient is None:
        user_ingredient = UserIngredient(
            user_id=user_id,
            ingredient_id=ingredient.id,
        )
        db.session.add(user_ingredient)

    user_ingredient.is_available = is_available
    db.session.commit()

    return serialize_availability(user_ingredient, ingredient)


def get_active_available_scope_ingredient(user_id, ingredient_id):
    statement = (
        select(Ingredient)
        .where(
            Ingredient.id == ingredient_id,
            Ingredient.is_active.is_(True),
            or_(
                Ingredient.is_default.is_(True),
                and_(
                    Ingredient.is_default.is_(False),
                    Ingredient.creator_user_id == user_id,
                ),
            ),
        )
        .options(joinedload(Ingredient.category))
    )
    ingredient = db.session.execute(statement).scalar_one_or_none()

    if ingredient is None:
        raise ValueError("Ingredient not found.")

    return ingredient


def get_user_ingredient(user_id, ingredient_id):
    statement = select(UserIngredient).where(
        UserIngredient.user_id == user_id,
        UserIngredient.ingredient_id == ingredient_id,
    )
    return db.session.execute(statement).scalar_one_or_none()


def validate_is_available(is_available):
    if not isinstance(is_available, bool):
        raise ValueError("Availability must be a boolean.")


def serialize_availability(user_ingredient, ingredient):
    return {
        "ingredient_id": ingredient.id,
        "user_id": user_ingredient.user_id,
        "is_available": user_ingredient.is_available,
        "ingredient_name": ingredient.name,
        "category": {
            "id": ingredient.category.id,
            "slug": ingredient.category.slug,
        },
    }

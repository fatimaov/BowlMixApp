from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.config.extensions import db
from app.models import Ingredient
from app.services.bowl_generation_service import generate_generate_mode_bowls


def generate_public_demo_bowls():
    statement = (
        select(Ingredient)
        .options(joinedload(Ingredient.category))
        .where(
            Ingredient.is_default.is_(True),
            Ingredient.is_active.is_(True),
        )
    )
    ingredient_pool = db.session.execute(statement).scalars().all()

    return generate_generate_mode_bowls(
        ingredient_pool,
        locked_ingredients=[],
        excluded_ingredients=[],
    )

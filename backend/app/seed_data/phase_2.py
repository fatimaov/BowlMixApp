from sqlalchemy import select

from app.config.extensions import db
from app.models import Ingredient, IngredientCategory
from app.seed_data.categories import CATEGORIES
from app.seed_data.ingredients import DEFAULT_INGREDIENTS


def seed_phase_2_data():
    categories_by_slug = {}

    for category_data in CATEGORIES:
        category = db.session.scalar(
            select(IngredientCategory).where(
                IngredientCategory.slug == category_data["slug"]
            )
        )

        if category is None:
            category = IngredientCategory(**category_data)
            db.session.add(category)
        else:
            category.name = category_data["name"]
            category.color_key = category_data["color_key"]
            category.shape_family = category_data["shape_family"]
            category.sort_order = category_data["sort_order"]

        categories_by_slug[category_data["slug"]] = category

    db.session.flush()

    for ingredient_data in DEFAULT_INGREDIENTS:
        category = categories_by_slug[ingredient_data["category_slug"]]
        ingredient = db.session.scalar(
            select(Ingredient).where(
                Ingredient.category_id == category.id,
                Ingredient.name == ingredient_data["name"],
                Ingredient.is_default.is_(True),
            )
        )

        if ingredient is None:
            ingredient = Ingredient(
                name=ingredient_data["name"],
                category_id=category.id,
                visual_pattern=ingredient_data["visual_pattern"],
                is_default=True,
                creator_user_id=None,
                is_active=True,
            )
            db.session.add(ingredient)
        else:
            ingredient.visual_pattern = ingredient_data["visual_pattern"]
            ingredient.creator_user_id = None
            ingredient.is_active = True

    db.session.commit()

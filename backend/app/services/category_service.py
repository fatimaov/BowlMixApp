from sqlalchemy import select

from app.config.extensions import db
from app.models import IngredientCategory
from app.models.ingredient import APPROVED_VISUAL_PATTERNS


def get_categories():
    statement = select(IngredientCategory).order_by(IngredientCategory.sort_order.asc())
    categories = db.session.execute(statement).scalars().all()
    return [serialize_category(category) for category in categories]


def get_approved_visual_patterns():
    return list(APPROVED_VISUAL_PATTERNS)


def serialize_category(category):
    return {
        "id": category.id,
        "name": category.name,
        "slug": category.slug,
        "color_key": category.color_key,
        "shape_family": category.shape_family,
        "sort_order": category.sort_order,
    }

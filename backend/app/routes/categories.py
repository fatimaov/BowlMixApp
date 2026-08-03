from flask import Blueprint, jsonify

from app.services.category_service import (
    get_approved_visual_patterns,
    get_categories,
)

categories_bp = Blueprint("categories", __name__)


@categories_bp.get("/categories")
def get_categories_route():
    categories = get_categories()
    visual_patterns = get_approved_visual_patterns()

    return (
        jsonify(
            {
                "success": True,
                "data": {
                    "categories": categories,
                    "visual_patterns": visual_patterns,
                },
            }
        ),
        200,
    )

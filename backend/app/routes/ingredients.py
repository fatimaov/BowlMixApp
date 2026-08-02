from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.ingredient_service import (
    get_ingredient_selector_options,
    get_user_ingredients,
)

ingredients_bp = Blueprint("ingredients", __name__)


@ingredients_bp.get("/ingredients")
@jwt_required()
def get_ingredients_route():
    current_user_id = get_jwt_identity()
    search = request.args.get("search")
    category_id = request.args.get("category_id")

    try:
        if category_id is not None:
            ingredients = get_ingredient_selector_options(
                current_user_id,
                category_id,
                search=search,
            )
        else:
            ingredients = get_user_ingredients(current_user_id, search=search)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INGREDIENTS_FETCH_ERROR",
                        "message": str(error),
                    },
                }
            ),
            400,
        )

    return (
        jsonify(
            {
                "success": True,
                "data": {
                    "ingredients": ingredients,
                },
            }
        ),
        200,
    )

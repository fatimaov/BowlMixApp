from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.availability_service import set_ingredient_availability
from app.services.ingredient_service import (
    create_ingredient_for_user,
    get_ingredient_selector_options,
    get_user_ingredients,
    update_ingredient_for_user,
)
from app.utils import get_json_object_payload

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


@ingredients_bp.post("/ingredients")
@jwt_required()
def create_ingredient_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    try:
        ingredient = create_ingredient_for_user(current_user_id, request_payload)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INGREDIENT_CREATE_ERROR",
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
                    "ingredient": ingredient,
                },
            }
        ),
        201,
    )


@ingredients_bp.patch("/ingredients/<int:ingredient_id>")
@jwt_required()
def update_ingredient_route(ingredient_id):
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    try:
        result = update_ingredient_for_user(
            current_user_id,
            ingredient_id,
            request_payload,
        )
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INGREDIENT_UPDATE_ERROR",
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
                "data": result,
            }
        ),
        200,
    )


@ingredients_bp.patch("/ingredients/<int:ingredient_id>/availability")
@jwt_required()
def update_ingredient_availability_route(ingredient_id):
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()
    is_available = request_payload.get("is_available")

    if len(request_payload) != 1 or "is_available" not in request_payload:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INGREDIENT_AVAILABILITY_ERROR",
                        "message": "Availability updates require only is_available.",
                    },
                }
            ),
            400,
        )

    try:
        availability = set_ingredient_availability(
            current_user_id,
            ingredient_id,
            is_available,
        )
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INGREDIENT_AVAILABILITY_ERROR",
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
                    "availability": availability,
                },
            }
        ),
        200,
    )

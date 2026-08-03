from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.saved_bowl_service import create_saved_bowl, get_saved_bowls
from app.utils import get_json_object_payload

saved_bowls_bp = Blueprint("saved_bowls", __name__)


@saved_bowls_bp.get("/saved-bowls")
@jwt_required()
def get_saved_bowls_route():
    current_user_id = get_jwt_identity()

    try:
        saved_bowls = get_saved_bowls(current_user_id)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "SAVED_BOWLS_FETCH_ERROR",
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
                    "saved_bowls": saved_bowls,
                },
            }
        ),
        200,
    )


@saved_bowls_bp.post("/saved-bowls")
@jwt_required()
def create_saved_bowl_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    try:
        saved_bowl = create_saved_bowl(current_user_id, request_payload)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "SAVED_BOWL_CREATE_ERROR",
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
                    "saved_bowl": saved_bowl,
                },
            }
        ),
        201,
    )

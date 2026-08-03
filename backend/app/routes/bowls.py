from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.build_mode_service import build_bowl_for_user
from app.services.generate_mode_service import generate_bowls_for_user
from app.utils import get_json_object_payload

bowls_bp = Blueprint("bowls", __name__)


@bowls_bp.post("/bowls/build")
@jwt_required()
def build_bowl_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    try:
        bowl = build_bowl_for_user(current_user_id, request_payload)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "BUILD_BOWL_ERROR",
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
                    "bowl": bowl,
                },
            }
        ),
        200,
    )


@bowls_bp.post("/bowls/generate")
@jwt_required()
def generate_bowls_route():
    request_payload, error_response = get_json_object_payload(required=False)
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    try:
        bowls = generate_bowls_for_user(current_user_id, request_payload)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "GENERATE_BOWLS_ERROR",
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
                    "bowls": bowls,
                },
            }
        ),
        200,
    )

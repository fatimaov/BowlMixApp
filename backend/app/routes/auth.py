from flask import Blueprint, jsonify, request

from app.services.auth_service import register_user, serialize_user

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/auth/register")
def register_user_route():
    request_payload = request.get_json(silent=True)

    if request_payload is None:
        return jsonify(
            {
                "success": False,
                "error": {
                    "code": "INVALID_JSON",
                    "message": "Request body must be valid JSON.",
                },
            }
        ), 400

    if not isinstance(request_payload, dict):
        return jsonify(
            {
                "success": False,
                "error": {
                    "code": "INVALID_PAYLOAD",
                    "message": "Request body must be a JSON object.",
                },
            }
        ), 400

    try:
        user = register_user(request_payload)
    except ValueError as error:
        return jsonify(
            {
                "success": False,
                "error": {
                    "code": "REGISTER_VALIDATION_ERROR",
                    "message": str(error),
                },
            }
        ), 400

    return jsonify(
        {
            "success": True,
            "data": {
                "user": serialize_user(user),
            },
        }
    ), 201



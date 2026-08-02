from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from app.services.auth_service import (
    get_user_by_id,
    login_user,
    register_user,
    serialize_user,
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/auth/register")
def register_user_route():
    request_payload = request.get_json(silent=True)

    if request_payload is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INVALID_JSON",
                        "message": "Request body must be valid JSON.",
                    },
                }
            ),
            400,
        )

    if not isinstance(request_payload, dict):
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INVALID_PAYLOAD",
                        "message": "Request body must be a JSON object.",
                    },
                }
            ),
            400,
        )

    try:
        user = register_user(request_payload)
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "REGISTER_VALIDATION_ERROR",
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
                    "user": serialize_user(user),
                },
            }
        ),
        201,
    )


@auth_bp.post("/auth/login")
def login_user_route():
    request_payload = request.get_json(silent=True)

    if request_payload is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INVALID_JSON",
                        "message": "Request body must be valid JSON.",
                    },
                }
            ),
            400,
        )

    if not isinstance(request_payload, dict):
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "INVALID_PAYLOAD",
                        "message": "Request body must be a JSON object.",
                    },
                }
            ),
            400,
        )

    try:
        user = login_user(request_payload)
    except ValueError as error:
        error_message = str(error)
        error_code = "INVALID_CREDENTIALS"

        if error_message in {"Email is required.", "Password is required."}:
            error_code = "LOGIN_VALIDATION_ERROR"

        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": error_code,
                        "message": error_message,
                    },
                }
            ),
            400,
        )

    access_token = create_access_token(identity=str(user.id))

    return (
        jsonify(
            {
                "success": True,
                "data": {
                    "user": serialize_user(user),
                    "access_token": access_token,
                    "token_type": "Bearer",
                },
            }
        ),
        200,
    )


@auth_bp.get("/auth/me")
@jwt_required()
def get_current_user_route():
    current_user_id = get_jwt_identity()
    user = get_user_by_id(current_user_id)

    if user is None:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "USER_NOT_FOUND",
                        "message": "User not found.",
                    },
                }
            ),
            404,
        )

    return (
        jsonify(
            {
                "success": True,
                "data": {
                    "user": serialize_user(user),
                },
            }
        ),
        200,
    )

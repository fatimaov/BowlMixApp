from flask import Blueprint, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

from app.services.auth_service import (
    change_user_password,
    get_user_by_id,
    login_user,
    register_user,
    serialize_user,
    soft_delete_user,
    update_user_profile,
)
from app.utils import get_json_object_payload, json_error

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/auth/register")
def register_user_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

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
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

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


@auth_bp.patch("/auth/me")
@jwt_required()
def update_current_user_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    if request_payload.get("is_active") is False:
        if len(request_payload) != 1:
            return json_error(
                "INVALID_PAYLOAD",
                "Soft delete requests may only include is_active.",
                400,
            )

        try:
            soft_delete_user(current_user_id)
        except ValueError as error:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": {
                            "code": "USER_UPDATE_ERROR",
                            "message": str(error),
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
                        "message": "User deactivated successfully.",
                    },
                }
            ),
            200,
        )

    if "is_active" in request_payload:
        return json_error(
            "INVALID_PAYLOAD",
            "is_active may only be set to false for soft delete.",
            400,
        )

    try:
        if "current_password" in request_payload or "new_password" in request_payload:
            change_user_password(current_user_id, request_payload)

        user = update_user_profile(current_user_id, request_payload)
    except ValueError as error:
        error_message = str(error)
        status_code = 404 if error_message == "User not found." else 400

        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "USER_UPDATE_ERROR",
                        "message": error_message,
                    },
                }
            ),
            status_code,
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

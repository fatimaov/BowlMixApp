from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.saved_bowl_service import (
    create_saved_bowl,
    get_saved_bowls,
    rename_saved_bowl,
    soft_delete_saved_bowl,
)
from app.utils import get_json_object_payload, json_error

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


@saved_bowls_bp.patch("/saved-bowls/<int:saved_bowl_id>")
@jwt_required()
def update_saved_bowl_route(saved_bowl_id):
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    current_user_id = get_jwt_identity()

    if request_payload.get("deleted_at") is True:
        if len(request_payload) != 1:
            return json_error(
                "INVALID_PAYLOAD",
                "Soft delete requests may only include deleted_at.",
                400,
            )

        try:
            soft_delete_saved_bowl(current_user_id, saved_bowl_id)
        except ValueError as error:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": {
                            "code": "SAVED_BOWL_UPDATE_ERROR",
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
                        "message": "Saved bowl deleted successfully.",
                    },
                }
            ),
            200,
        )

    if "deleted_at" in request_payload:
        return json_error(
            "INVALID_PAYLOAD",
            "deleted_at may only be set to true for soft delete.",
            400,
        )

    new_name = request_payload.get("custom_name")
    if new_name is None:
        new_name = request_payload.get("name")

    if new_name is None:
        return json_error(
            "INVALID_PAYLOAD",
            "Saved bowl update requires only name or custom_name, or deleted_at=true.",
            400,
        )

    allowed_fields = {"name", "custom_name"}
    if len(request_payload) != 1 or set(request_payload) - allowed_fields:
        return json_error(
            "INVALID_PAYLOAD",
            "Saved bowl update only supports name or custom_name.",
            400,
        )

    try:
        saved_bowl = rename_saved_bowl(current_user_id, saved_bowl_id, new_name)
    except ValueError as error:
        error_message = str(error)
        status_code = 404 if error_message == "Saved bowl not found." else 400

        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "SAVED_BOWL_UPDATE_ERROR",
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
                    "saved_bowl": saved_bowl,
                },
            }
        ),
        200,
    )

from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.pairing_suggestions_service import get_pairing_suggestions
from app.utils import get_json_object_payload, json_error

ai_bp = Blueprint("ai", __name__)


@ai_bp.post("/ai/pairing-suggestions")
@jwt_required()
def get_pairing_suggestions_route():
    request_payload, error_response = get_json_object_payload()
    if error_response is not None:
        return error_response

    required_fields = {"target_category_id", "selected_ingredient_ids"}
    if set(request_payload) != required_fields:
        return json_error(
            "PAIRING_SUGGESTIONS_ERROR",
            "Pairing suggestions require target_category_id and "
            "selected_ingredient_ids.",
            400,
        )

    current_user_id = get_jwt_identity()

    try:
        pairing_suggestions = get_pairing_suggestions(
            current_user_id,
            request_payload["target_category_id"],
            request_payload["selected_ingredient_ids"],
        )
    except ValueError as error:
        return json_error(
            "PAIRING_SUGGESTIONS_ERROR",
            str(error),
            400,
        )

    return (
        jsonify(
            {
                "success": True,
                "data": {
                    "pairing_suggestions": pairing_suggestions,
                },
            }
        ),
        200,
    )

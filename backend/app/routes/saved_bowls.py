from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.saved_bowl_service import get_saved_bowls

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

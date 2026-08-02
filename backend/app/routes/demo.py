from flask import Blueprint, jsonify
from app.services.public_demo_service import generate_public_demo_bowls
from app.utils import get_json_object_payload, json_error

public_demo_bp = Blueprint("demo", __name__)


@public_demo_bp.post("/demo/bowls/generate")
def generate_demo_bowls():
    request_payload, error_response = get_json_object_payload(required=False)
    if error_response is not None:
        return error_response

    if request_payload:
        return json_error(
            "UNSUPPORTED_DEMO_OPTIONS",
            "Public demo generation does not accept request options.",
            400,
        )

    try:
        generated_demo_bowls = generate_public_demo_bowls()
    except ValueError as error:
        return (
            jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "DEMO_GENERATION_ERROR",
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
                    "bowls": generated_demo_bowls,
                },
            }
        ),
        200,
    )

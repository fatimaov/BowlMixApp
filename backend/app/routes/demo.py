from flask import Blueprint, jsonify, request
from app.services.public_demo_service import generate_public_demo_bowls

public_demo_bp = Blueprint("demo", __name__)

@public_demo_bp.post("/demo/bowls/generate")
def generate_demo_bowls():
    if request.data:
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
        if request_payload:
            return jsonify(
                {
                    "success": False,
                    "error": {
                        "code": "UNSUPPORTED_DEMO_OPTIONS",
                        "message": (
                            "Public demo generation does not accept request options."
                        ),
                    },
                }
            ), 400

    try:
        generated_demo_bowls = generate_public_demo_bowls()
    except ValueError as error:
        return jsonify(
            {
                "success": False,
                "error": {
                    "code": "DEMO_GENERATION_ERROR",
                    "message": str(error),
                },
            }
        ), 400

    return jsonify(
        {
            "success": True,
            "data": {
                "bowls": generated_demo_bowls,
            },
        }
    ), 200

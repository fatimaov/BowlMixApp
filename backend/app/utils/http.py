from flask import jsonify, request


def json_error(code, message, status_code):
    return (
        jsonify(
            {
                "success": False,
                "error": {
                    "code": code,
                    "message": message,
                },
            }
        ),
        status_code,
    )


def rate_limit_error_handler(_error):
    return json_error(
        "RATE_LIMIT_EXCEEDED",
        "Too many requests. Please try again later.",
        429,
    )


def get_json_object_payload(required=True):
    request_payload = request.get_json(silent=True)

    if request_payload is None:
        if not required and not request.data:
            return None, None

        return None, json_error(
            "INVALID_JSON",
            "Request body must be valid JSON.",
            400,
        )

    if not isinstance(request_payload, dict):
        return None, json_error(
            "INVALID_PAYLOAD",
            "Request body must be a JSON object.",
            400,
        )

    return request_payload, None

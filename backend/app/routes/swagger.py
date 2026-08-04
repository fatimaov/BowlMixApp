from pathlib import Path

from flask import Blueprint, send_file
from flask_swagger_ui import get_swaggerui_blueprint

DOCS_DIR = Path(__file__).resolve().parents[2] / "docs"
OPENAPI_FILE = DOCS_DIR / "openapi.yaml"
SWAGGER_URL = "/api/docs"
OPENAPI_URL = "/api/swagger.yaml"

swagger_bp = Blueprint("swagger", __name__)

swagger_ui_bp = get_swaggerui_blueprint(
    SWAGGER_URL,
    OPENAPI_URL,
    config={
        "app_name": "BowlMix API Docs",
    },
)


@swagger_bp.get("/swagger.yaml")
def get_openapi_spec():
    return send_file(OPENAPI_FILE, mimetype="application/yaml")

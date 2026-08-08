from pathlib import Path

from flask import Blueprint, redirect, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint

DOCS_DIR = Path(__file__).resolve().parents[2] / "docs"
OPENAPI_DIR = DOCS_DIR / "openapi"
SWAGGER_URL = "/api/docs"
OPENAPI_URL = "/openapi.yaml"

openapi_docs_bp = Blueprint("openapi_docs", __name__)

swagger_ui_bp = get_swaggerui_blueprint(
    SWAGGER_URL,
    OPENAPI_URL,
    config={
        "app_name": "BowlMix API Docs",
    },
)


@openapi_docs_bp.get("/openapi.yaml")
def get_root_openapi_spec():
    return send_from_directory(OPENAPI_DIR, "openapi.yaml", mimetype="application/yaml")


@openapi_docs_bp.get("/")
def redirect_root_to_docs():
    return redirect(SWAGGER_URL)


@openapi_docs_bp.get("/openapi/<path:filename>")
def get_openapi_asset(filename):
    return send_from_directory(OPENAPI_DIR, filename, mimetype="application/yaml")

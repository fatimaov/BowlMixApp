import os
from flask import Flask

from app.admin import setup_admin
from app.commands import register_commands
from app.config import Config, init_extensions
from app.routes import register_blueprints
from app.utils import rate_limit_error_handler

# Import models so Flask-Migrate and SQLAlchemy know every mapped table.
from app import models


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    enable_admin = os.getenv("ENABLE_ADMIN", "").strip().lower() in {
        "1",
        "true",
        "yes",
        "on",
    }
    is_development = os.getenv("FLASK_ENV", "").strip().lower() == "development"

    if enable_admin and is_development:
        setup_admin(app)

    register_commands(app)
    init_extensions(app)
    app.register_error_handler(429, rate_limit_error_handler)
    register_blueprints(app)

    return app

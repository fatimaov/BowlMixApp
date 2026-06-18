from flask import Flask

from app.admin import setup_admin
from app.commands import register_commands
from app.config.extensions import init_extensions
from app.config.settings import Config
from app.routes import register_blueprints
from app.models import __all__


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    setup_admin(app)
    register_commands(app)
    init_extensions(app)
    register_blueprints(app)

    return app

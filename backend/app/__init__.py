from flask import Flask

from app.config.extensions import init_extensions
from app.config.settings import Config
from app.routes import register_blueprints


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    init_extensions(app)
    register_blueprints(app)

    return app

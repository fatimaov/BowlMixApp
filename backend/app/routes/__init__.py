from app.routes.health import health_bp
from app.routes.demo import public_demo_bp


def register_blueprints(app):
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(public_demo_bp, url_prefix="/api")

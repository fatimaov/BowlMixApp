from app.routes.health import health_bp
from app.routes.demo import public_demo_bp
from app.routes.auth import auth_bp
from app.routes.bowls import bowls_bp
from app.routes.ingredients import ingredients_bp


def register_blueprints(app):
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(public_demo_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(bowls_bp, url_prefix="/api")
    app.register_blueprint(ingredients_bp, url_prefix="/api")

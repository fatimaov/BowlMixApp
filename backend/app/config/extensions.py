from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    get_jwt_identity,
    verify_jwt_in_request,
)
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()


def rate_limit_identity():
    try:
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
    except Exception:
        user_id = None

    if user_id is not None:
        return f"user:{user_id}"

    return f"ip:{get_remote_address()}"


limiter = Limiter(rate_limit_identity)


def init_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=False,
    )
    limiter.init_app(app)

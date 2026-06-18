from flask_admin import Admin


admin = Admin(name="BowlMix Admin")


def setup_admin(app):
    admin.init_app(app)

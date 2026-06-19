from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from app.config.extensions import db
from app.models import (
    Ingredient,
    IngredientCategory,
    SavedBowl,
    SavedBowlIngredient,
    User,
    UserIngredient,
)


admin = Admin(name="BowlMix Admin")
_models_registered = False


class BaseModelView(ModelView):
    column_display_pk = True

    def scaffold_list_columns(self):
        columns = super().scaffold_list_columns()
        return ["id", *[column for column in columns if column != "id"]]


def register_model_views():
    global _models_registered

    if _models_registered:
        return

    admin.add_view(BaseModelView(User, db.session))
    admin.add_view(BaseModelView(IngredientCategory, db.session))
    admin.add_view(BaseModelView(Ingredient, db.session))
    admin.add_view(BaseModelView(UserIngredient, db.session))
    admin.add_view(BaseModelView(SavedBowl, db.session))
    admin.add_view(BaseModelView(SavedBowlIngredient, db.session))
    _models_registered = True


def setup_admin(app):
    register_model_views()
    admin.init_app(app)

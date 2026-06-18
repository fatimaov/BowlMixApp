from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.config.extensions import db


class IngredientCategory(db.Model):
    __tablename__ = "ingredient_categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    slug: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    color_key: Mapped[str] = mapped_column(String(50), nullable=False)
    shape_family: Mapped[str] = mapped_column(String(50), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

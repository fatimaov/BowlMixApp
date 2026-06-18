from sqlalchemy import Boolean, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.extensions import db


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredient_categories.id"),
        nullable=False,
    )
    visual_pattern: Mapped[str] = mapped_column(String(50), nullable=False)
    is_default: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    creator_user_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    category: Mapped["IngredientCategory"] = relationship(
        "IngredientCategory",
        back_populates="ingredients",
    )
    user_ingredients: Mapped[list["UserIngredient"]] = relationship(
        "UserIngredient",
        back_populates="ingredient",
    )

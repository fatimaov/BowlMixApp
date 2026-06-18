from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.extensions import db


class SavedBowlIngredient(db.Model):
    __tablename__ = "saved_bowl_ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    saved_bowl_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("saved_bowls.id"),
        nullable=False,
    )
    ingredient_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredients.id"),
        nullable=False,
    )
    category_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredient_categories.id"),
        nullable=False,
    )
    ingredient_name_snapshot: Mapped[str] = mapped_column(String(100), nullable=False)
    category_name_snapshot: Mapped[str] = mapped_column(String(50), nullable=False)
    category_slug_snapshot: Mapped[str] = mapped_column(String(50), nullable=False)
    color_key_snapshot: Mapped[str] = mapped_column(String(50), nullable=False)
    shape_family_snapshot: Mapped[str] = mapped_column(String(50), nullable=False)
    visual_pattern_snapshot: Mapped[str] = mapped_column(String(50), nullable=False)
    sort_order_snapshot: Mapped[int] = mapped_column(Integer, nullable=False)

    saved_bowl: Mapped["SavedBowl"] = relationship("SavedBowl")
    ingredient: Mapped["Ingredient"] = relationship("Ingredient")
    category: Mapped["IngredientCategory"] = relationship("IngredientCategory")

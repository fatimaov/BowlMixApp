from sqlalchemy import Boolean, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.extensions import db


class UserIngredient(db.Model):
    __tablename__ = "user_ingredients"
    __table_args__ = (
        UniqueConstraint("user_id", "ingredient_id"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )
    ingredient_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredients.id"),
        nullable=False,
    )
    is_available: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    user: Mapped["User"] = relationship(
        "User",
        back_populates="user_ingredients",
    )
    ingredient: Mapped["Ingredient"] = relationship(
        "Ingredient",
        back_populates="user_ingredients",
    )

"""add ingredient visual pattern check

Revision ID: f2b4c6d8e9a1
Revises: a4d8f2c1b7e9
Create Date: 2026-08-02 21:40:00.000000

"""

from alembic import op

# revision identifiers, used by Alembic.
revision = "f2b4c6d8e9a1"
down_revision = "a4d8f2c1b7e9"
branch_labels = None
depends_on = None


def upgrade():
    op.create_check_constraint(
        "ck_ingredients_visual_pattern_allowed",
        "ingredients",
        "visual_pattern IN ('solid', 'dots', 'stripes', 'grid', "
        "'speckled', 'ring', 'split')",
    )


def downgrade():
    op.drop_constraint(
        "ck_ingredients_visual_pattern_allowed",
        "ingredients",
        type_="check",
    )

"""Add saved bowl soft delete timestamp

Revision ID: a4d8f2c1b7e9
Revises: 9c1a2b3d4e5f
Create Date: 2026-06-20 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "a4d8f2c1b7e9"
down_revision = "9c1a2b3d4e5f"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "saved_bowls",
        sa.Column("deleted_at", sa.DateTime(), nullable=True),
    )


def downgrade():
    op.drop_column("saved_bowls", "deleted_at")

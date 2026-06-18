"""add user is_active

Revision ID: 7b1f0c9d2e3a
Revises: 3689aea354c3
Create Date: 2026-06-18 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "7b1f0c9d2e3a"
down_revision = "3689aea354c3"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "users",
        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.true(),
        ),
    )
    op.alter_column("users", "is_active", server_default=None)


def downgrade():
    op.drop_column("users", "is_active")

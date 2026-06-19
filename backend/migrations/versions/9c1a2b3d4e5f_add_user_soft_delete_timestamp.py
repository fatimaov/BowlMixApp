"""Add user soft delete timestamp

Revision ID: 9c1a2b3d4e5f
Revises: 7b1f0c9d2e3a
Create Date: 2026-06-19 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9c1a2b3d4e5f"
down_revision = "7b1f0c9d2e3a"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("deleted_at", sa.DateTime(), nullable=True))
    op.create_unique_constraint("uq_users_username", "users", ["username"])


def downgrade():
    op.drop_constraint("uq_users_username", "users", type_="unique")
    op.drop_column("users", "deleted_at")

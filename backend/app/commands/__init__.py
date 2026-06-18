from app.commands.seed import register_seed_commands


def register_commands(app):
    register_seed_commands(app)

import click

from app.seed_data.phase_2 import seed_phase_2_data


@click.command("seed-phase-2")
def seed_phase_2_command():
    seed_phase_2_data()
    click.echo("Seeded Phase 2 categories and default ingredients.")


def register_seed_commands(app):
    app.cli.add_command(seed_phase_2_command)

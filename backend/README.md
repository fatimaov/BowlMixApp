# BowlMix Backend

This backend is an API-only Flask service for BowlMix. It does not serve the React frontend and all API routes live under `/api`.

## Local setup

1. Create and activate a Python virtual environment.
2. Install dependencies:
   - with Pipenv: `pipenv install`
   - or with pip: `pip install flask flask-cors flask-sqlalchemy flask-migrate flask-jwt-extended python-dotenv psycopg2-binary sqlalchemy flask-admin email-validator`
3. Copy `.env.example` to `.env` and update values as needed.
4. Create a local PostgreSQL database for BowlMix.
5. Apply migrations from the `backend/` directory:
   - `pipenv run upgrade`
6. Seed the default categories and ingredients:
   - `pipenv run command seed-phase-2`
7. Start the API from the `backend/` directory:
   - `pipenv run start`

## Environment variables

- `FLASK_APP`: Flask entry point, defaults to `run.py`
- `FLASK_ENV`: environment name such as `development`
- `FLASK_SECRET_KEY`: BowlMix environment variable for the Flask app secret
- `JWT_SECRET_KEY`: JWT signing key
- `DATABASE_URL`: PostgreSQL SQLAlchemy connection string such as `postgresql://username:password@localhost:5432/bowlmix`
- `CORS_ORIGINS`: comma-separated allowed frontend origins

## Secret key mapping

BowlMix uses `FLASK_SECRET_KEY` as the environment variable name.

Flask still expects the secret in the configuration key `SECRET_KEY`.

The backend maps:

```txt
FLASK_SECRET_KEY -> Config.SECRET_KEY -> Flask SECRET_KEY
```

Example:

```env
FLASK_SECRET_KEY=your-flask-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=postgresql://username:password@localhost:5432/bowlmix
```

## Database and migrations

PostgreSQL is the only supported database for the backend.

Flask-SQLAlchemy and Flask-Migrate are configured. The current schema includes:

- users, including soft-delete fields
- ingredient categories
- ingredients
- user ingredient availability records
- saved bowls
- saved bowl ingredient snapshots

Run migrations from `backend/`:

```bash
pipenv run upgrade
```

Create new migrations after model changes:

```bash
pipenv run migrate -m "Describe model change"
pipenv run upgrade
```

## Seed data

Phase 2 seed data creates the fixed category set and default ingredients.

Run from `backend/`:

```bash
pipenv run command seed-phase-2
```

## Admin

Flask-Admin is wired into the app for local model inspection. Registered models include users, categories, ingredients, user ingredient availability records, saved bowls, and saved bowl ingredient snapshots.

Admin list views show the database primary key `id` column first.

## Service layer

Phase 3 backend service work has started. The service layer currently includes:

- `auth_service.py`: registration, login validation, password hashing, active user lookup, profile updates, password changes, soft deletion, and safe user serialization.
- `ingredient_service.py`: My Ingredients listing, selector options, custom ingredient creation, custom ingredient renaming, and custom ingredient soft deletion. Availability toggling is intentionally not implemented here.
- `public_demo_service.py`: public demo bowl generation using active default ingredients.
- `generate_mode_service.py`: Generate Mode bowl suggestions, locks, exclusions, and per-batch unique names.
- `build_mode_service.py`: Build Mode bowl finalization from user-selected ingredients.
- `bowl_validation_service.py`: shared category rules and validation helpers.
- `bowl_name_service.py`: rule-based bowl naming fallback.

Routes for these services are not implemented yet.

## Flask shell examples

Run a service directly from Flask shell:

```bash
pipenv run command shell
```

Example public demo generation:

```python
from app.services.public_demo_service import generate_public_demo_bowls

bowls = generate_public_demo_bowls()
```

Example auth service usage:

```python
from app.services.auth_service import register_user, login_user, serialize_user

user = register_user({
    "username": "demo_user",
    "email": "demo@example.com",
    "password": "password123",
})

serialize_user(login_user({
    "email": "demo@example.com",
    "password": "password123",
}))
```

Example ingredient listing:

```python
from app.services.ingredient_service import get_user_ingredients

ingredients = get_user_ingredients(user.id)
```

## Common Commands

Run these from `backend/`:

```bash
pipenv run start
pipenv run init
pipenv run migrate
pipenv run upgrade
pipenv run downgrade
```

The migration commands use `flask --app run.py ...` under the hood so Flask can find the current app factory setup directly from `run.py` without depending on a separately exported `FLASK_APP` value in your shell.

## Health check

Run:

```bash
curl http://127.0.0.1:5000/api/health
```

Expected response:

```json
{ "status": "ok", "service": "bowlmix-api" }
```

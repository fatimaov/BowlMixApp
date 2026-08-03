# BowlMix Backend

API-only Flask backend for BowlMix. The backend owns authentication, persistence, ingredient personalization, deterministic bowl generation, and saved bowl snapshots. It does not serve the React frontend.

Current route coverage includes health, public demo generation, auth, public category metadata, authenticated ingredient management, and authenticated bowl build/generate endpoints.

## Implemented So Far

- Flask app factory, config, CORS, SQLAlchemy, migrations, JWT setup, and Flask-Admin wiring.
- PostgreSQL models and migrations for users, categories, ingredients, user ingredient availability, saved bowls, and saved bowl ingredient snapshots.
- Seed command for the fixed ingredient categories and default ingredients.
- Auth/account service for registration, login validation, password hashing, profile updates, password changes, active-user lookup, and user soft deletion.
- Deterministic Build Mode and Generate Mode services with shared bowl composition validation and rule-based naming.
- Public demo generation using active default ingredients.
- Ingredient management service for My Ingredients, selector options, custom ingredient create/update, and custom ingredient soft deletion.
- Availability service for user-specific `UserIngredient.is_available` updates.
- Saved bowl service and snapshot service for saving bowls with stable ingredient/category visual snapshots.

Not implemented yet:

- AI API routes.
- Frontend integration.
- Backend AI provider integration.

## Requirements

- Python 3.13
- Pipenv
- PostgreSQL

## Environment Variables

- `FLASK_APP`: Flask entry point
- `FLASK_ENV`: environment label
- `ENABLE_ADMIN`: set to a truthy value like `1` or `true` to expose Flask-Admin only when `FLASK_ENV=development`
- `FLASK_SECRET_KEY`: app secret used by Flask through `Config.SECRET_KEY`
- `JWT_SECRET_KEY`: JWT signing key
- `DATABASE_URL`: PostgreSQL SQLAlchemy connection string
- `CORS_ORIGINS`: comma-separated allowed frontend origins

Secret key mapping:

```txt
FLASK_SECRET_KEY -> Config.SECRET_KEY -> Flask SECRET_KEY
```

## Setup

Run commands from `backend/`.

1. Install dependencies:

```bash
pipenv install
```

2. Create `.env` from the project environment example and set local values:

```env
FLASK_APP=run.py
FLASK_ENV=development
ENABLE_ADMIN=true
FLASK_SECRET_KEY=your-flask-secret-key
JWT_SECRET_KEY=change-me-too
DATABASE_URL=postgresql://username:password@localhost:5432/bowlmix
CORS_ORIGINS=http://localhost:5173
```

3. Create the local PostgreSQL database named in `DATABASE_URL`.

4. Apply migrations:

```bash
pipenv run upgrade
```

5. Seed default categories and ingredients:

```bash
pipenv run command seed-phase-2
```

6. Start the backend:

```bash
pipenv run start
```

The default local API URL is `http://127.0.0.1:5000`.


## Common Commands

Run from `backend/`.

```bash
pipenv run start
pipenv run command shell
pipenv run migrate -m "Describe model change"
pipenv run upgrade
pipenv run downgrade
pipenv run command seed-phase-2
```

## How To Check

Health route:

```bash
curl http://127.0.0.1:5000/api/health
```

Expected:

```json
{ "service": "bowlmix-api", "status": "ok" }
```

Compile backend Python files:

```bash
pipenv run python -m compileall app
```

Quick service smoke check from Flask shell:

```bash
pipenv run command shell
```

```python
from app.services.public_demo_service import generate_public_demo_bowls

generate_public_demo_bowls()
```

## Service Map

- `auth_service.py`: account creation, login validation, profile/password updates, user soft delete, user serialization.
- `ingredient_service.py`: full ingredient serialization, My Ingredients data, selector data, custom ingredient CRUD.
- `availability_service.py`: user-specific availability toggles only.
- `build_mode_service.py`: validates and finalizes one user-built bowl.
- `generate_mode_service.py`: generates three deterministic bowl suggestions with locks and exclusions.
- `bowl_validation_service.py`: shared category limits and generation validation.
- `bowl_name_service.py`: rule-based bowl names and per-batch unique naming.
- `public_demo_service.py`: simplified public Generate Mode flow.
- `category_service.py`: shared category metadata and approved visual patterns for frontend rendering.
- `saved_bowl_service.py`: saved bowl create/list/detail/rename/soft-delete lifecycle.
- `snapshot_service.py`: saved bowl ingredient snapshot creation and serialization.

## Database Notes

Saved bowl ingredients are snapshots. When a bowl is saved, the backend copies ingredient name, category name, category slug, category color key, category shape family, visual pattern, and category sort order into `saved_bowl_ingredients`.

This keeps saved bowls stable even if ingredients, categories, or visual metadata change later.

Default ingredients are stored once in `ingredients` and are treated as available for every user unless a user-specific override exists. `user_ingredients` stores only per-user availability overrides and custom-ingredient availability, so a row is created when a user toggles an ingredient instead of pre-populating default rows for every account.

## Admin

Flask-Admin is available for local model inspection once the app is running. Registered models include users, ingredient categories, ingredients, user ingredient availability records, saved bowls, and saved bowl ingredient snapshots.

## Recent Implementation Summary

- Added authenticated ingredient routes for `GET /api/ingredients`, `POST /api/ingredients`, `PATCH /api/ingredients/<id>`, and `PATCH /api/ingredients/<id>/availability`.
- Added public category metadata route `GET /api/categories` for shared category labels, ordering, styling metadata, and approved visual patterns used across public and authenticated frontend flows.
- Added authenticated bowl routes for `POST /api/bowls/build` and `POST /api/bowls/generate` backed by the implemented Build Mode and Generate Mode services.
- Added authenticated saved bowl route `GET /api/saved-bowls` for listing the current user's saved bowl snapshots.
- Added `POST /api/demo/bowls/generate` for public demo bowl generation with active default ingredients.
- Added auth routes for `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, and `PATCH /api/auth/me`.
- Added Black as a backend dev package and applied formatting updates.

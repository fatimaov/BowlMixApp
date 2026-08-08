# BowlMix Backend

API-only Flask backend for BowlMix. The backend owns authentication, persistence, ingredient personalization, deterministic bowl generation, and saved bowl snapshots. It does not serve the React frontend.

Current route coverage includes health, public demo generation, auth, categories, authenticated ingredient management, authenticated bowl build/generate, and authenticated saved bowl list/create/update.

## Features

- Flask app factory, config, CORS, SQLAlchemy, migrations, JWT setup, and Flask-Admin wiring.
- PostgreSQL models and migrations for users, categories, ingredients, user ingredient availability, saved bowls, and saved bowl ingredient snapshots.
- Seed command for the fixed ingredient categories and default ingredients.
- Auth/account service for registration, login validation, password hashing, profile updates, password changes, active-user lookup, and user soft deletion.
- Deterministic Build Mode and Generate Mode services with shared bowl composition validation and rule-based naming.
- Public demo generation using active default ingredients.
- Ingredient management service for My Ingredients, selector options, custom ingredient create/update, and custom ingredient soft deletion.
- Availability service for user-specific `UserIngredient.is_available` updates.
- Saved bowl service and snapshot service for saving bowls with stable ingredient/category visual snapshots plus server-side save validation.
- OpenAPI spec serving plus Swagger UI docs for local API exploration at `/openapi.yaml` and `/api/docs/`.

Not implemented:

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
- `ENABLE_SWAGGER_TRY_OUT`: set to a truthy value like `1` or `true` to enable Swagger UI `Try it out`; defaults to enabled in development and disabled otherwise
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
ENABLE_SWAGGER_TRY_OUT=true
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

For a production-style WSGI launch on Linux, use Gunicorn with the Flask app exposed by `run.py`:

```bash
pipenv run gunicorn run:app
```

`pipenv run start` runs the built-in Flask development server. Gunicorn is intended for Unix-like environments and will not run on native Windows because it depends on Unix-only modules.

## API Docs

Once the backend is running locally:

- OpenAPI spec: `http://127.0.0.1:5000/openapi.yaml`
- Swagger UI: `http://127.0.0.1:5000/api/docs/`

Swagger UI `Try it out` is enabled when `ENABLE_SWAGGER_TRY_OUT=true`. If the variable is unset, it defaults to enabled for `FLASK_ENV=development` and disabled otherwise.

Referenced OpenAPI assets are served from `backend/docs/openapi/`.

## Common Commands

Run from `backend/`.

```bash
pipenv run start
pipenv run gunicorn run:app
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

OpenAPI docs:

```bash
curl http://127.0.0.1:5000/openapi.yaml
```

Swagger UI:

Open `http://127.0.0.1:5000/api/docs/` in a browser.

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

## Testing

- Postman happy-flow verification passed successfully on August 3, 2026.
- Postman edge-case verification passed successfully for the documented scenarios on August 3, 2026.
- Consolidated Postman summary:
  - [backend/docs/testing/postman-summary.md](./docs/testing/postman-summary.md)
- Additional smoke tests and ad hoc manual checks were also performed during development and are called out in the consolidated summary, but are not exhaustively itemized there.

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

- Saved bowl ingredients are snapshots. When a bowl is saved, the backend copies ingredient and category display metadata into `saved_bowl_ingredients` so saved bowls remain stable even if source data changes later.
- Saved bowl create requests are validated server-side before snapshot creation. Submitted ingredient IDs must belong to valid available ingredients for the current user and must satisfy the shared category min/max rules.
- Default ingredients are stored once in `ingredients` and are treated as available for every user unless a user-specific override exists. `user_ingredients` stores only per-user availability overrides and custom-ingredient availability.

## Admin

Flask-Admin is available for local model inspection once the app is running. Registered models include users, ingredient categories, ingredients, user ingredient availability records, saved bowls, and saved bowl ingredient snapshots.

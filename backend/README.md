# BowlMix Backend

This backend is an API-only Flask service for BowlMix. It does not serve the React frontend and all API routes live under `/api`.

## Local setup

1. Create and activate a Python virtual environment.
2. Install dependencies:
   - with Pipenv: `pipenv install`
   - or with pip: `pip install flask flask-cors flask-sqlalchemy flask-migrate flask-jwt-extended python-dotenv psycopg2-binary`
3. Copy `.env.example` to `.env` and update values as needed.
4. Start the API from the `backend/` directory:
   - `python run.py`

## Environment variables

- `FLASK_APP`: Flask entry point, defaults to `run.py`
- `FLASK_ENV`: environment name such as `development`
- `SECRET_KEY`: Flask secret key
- `JWT_SECRET_KEY`: JWT signing key
- `DATABASE_URL`: SQLAlchemy connection string
- `CORS_ORIGINS`: comma-separated allowed frontend origins

## Database and migrations

Flask-SQLAlchemy and Flask-Migrate are configured, but no models or migrations exist yet.

When models are added later, initialize migrations from `backend/`:

```bash
flask db init
flask db migrate -m "Initial schema"
flask db upgrade
```

## Health check

Run:

```bash
curl http://127.0.0.1:5000/api/health
```

Expected response:

```json
{ "status": "ok", "service": "bowlmix-api" }
```

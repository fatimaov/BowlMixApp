# BowlMix Backend

This backend is an API-only Flask service for BowlMix. It does not serve the React frontend and all API routes live under `/api`.

## Local setup

1. Create and activate a Python virtual environment.
2. Install dependencies:
   - with Pipenv: `pipenv install`
   - or with pip: `pip install flask flask-cors flask-sqlalchemy flask-migrate flask-jwt-extended python-dotenv psycopg2-binary`
3. Copy `.env.example` to `.env` and update values as needed.
4. Create a local PostgreSQL database for BowlMix.
5. Start the API from the `backend/` directory:
   - `python run.py`

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

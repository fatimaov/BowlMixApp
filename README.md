# BowlMix

BowlMix is a full-stack web app for quick bowl meal inspiration. Users can build a bowl manually or generate bowl ideas from available ingredients, then save favorites for later.

## MVP Summary

The MVP centers on a lightweight bowl generation experience with two main flows:

- Build Mode for manual bowl creation
- Generate Mode for automatic bowl suggestions

It also includes user accounts, ingredient availability management, saved bowls, and a limited public demo.

## Main Features

- User registration and login
- Personalized ingredients
- Ingredient availability tracking
- Manual bowl building
- Automatic bowl generation
- Saved bowls
- Public demo access

## Tech Stack

- Frontend: React, Vite, JavaScript, Bootstrap
- Backend: Python, Flask, Flask-JWT-Extended, Flask-SQLAlchemy
- Database: PostgreSQL

## Architecture Summary

BowlMix follows a decoupled full-stack architecture:

- React/Vite frontend for the interface and routing
- Flask backend for authentication, business logic, and API endpoints
- PostgreSQL for persistent data storage

The frontend communicates with the backend through REST APIs, and the backend owns generation logic and database access.

## Current Project Status

BowlMix is currently in planning and early implementation. The repository documents the intended MVP scope and architecture while development continues.

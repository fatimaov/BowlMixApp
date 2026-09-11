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
- Build Mode AI pairing suggestions with safe fallback results
- Automatic bowl generation
- Saved bowls
- Public demo access

## Tech Stack

- Frontend: React, Vite, JavaScript, Bootstrap
- Backend: Python, Flask, Flask-JWT-Extended, Flask-SQLAlchemy
- Database: PostgreSQL
- AI: Gemini or local LM Studio through a backend-only provider layer

## Architecture Summary

BowlMix follows a decoupled full-stack architecture:

- React/Vite frontend for the interface and routing
- Flask backend for authentication, business logic, and API endpoints
- PostgreSQL for persistent data storage

The frontend communicates with the backend through REST APIs, and the backend owns generation logic and database access.

## Current Project Status

BowlMix is under active development. The core backend is complete, and the remaining work is frontend integration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

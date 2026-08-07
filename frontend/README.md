# BowlMix Frontend

React + Vite frontend for BowlMix with Bootstrap wired globally and React Router configured for public and protected app routes.

Current baseline:

- global Bootstrap CSS/JS plus lightweight theme overrides
- centralized router with demo, auth, dashboard, ingredients, saved bowls, profile, and not-found routes
- protected route gate using a temporary local token check (`bowlmix_user_token`)
- architecture-aligned `src/` folder structure ready for implementation

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.
- `npm run lint` runs Oxlint.

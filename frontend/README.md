# BowlMix Frontend

React + TypeScript + Vite frontend for BowlMix. The frontend owns the application shell, routing, shared UI, client-side state, and communication with the Flask API.

The frontend app is available at [https://bowlmix-app.vercel.app/](https://bowlmix-app.vercel.app/).

## Current Project Status

The frontend foundation and typed API service layer are in place. Authentication, category loading, and user-ingredient state are wired through React providers. The page bodies and most feature components are still scaffolds and have not yet been assembled into the final product flows.

## Features

- Vite, React, TypeScript, React Router, Bootstrap, and CSS Modules setup.
- Public and protected route structure with a `ProtectedRoute` guard.
- Authentication state with login, logout, session restoration, profile updates, and account deactivation.
- Category reference data and user-ingredient state management with reducers and contexts.
- Typed REST services for authentication, categories, ingredients, demo generation, bowl generation, pairing suggestions, and saved bowls.
- Shared component scaffolding for navigation, buttons, modals, loading/error states, ingredients, bowls, and generator workflows.
- Vercel SPA rewrites for client-side routing.

## Requirements

- Node.js 22.20.0 (the expected version is documented in `.nvmrc`)
- npm (dependencies are locked in `package-lock.json`)
- `nvm` is optional but recommended

If you use `nvm`, run these commands from `frontend/`:

```bash
nvm install
nvm use
```

## Setup

Run commands from `frontend/`.

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set the API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the frontend:

```bash
npm run dev
```

The default local URL is `http://localhost:5173`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/demo` | Public demo |
| `/login` | Login |
| `/signup` | Sign up |
| `/app/generator-dashboard` | Protected generator dashboard |
| `/app/my-ingredients` | Protected ingredient management |
| `/app/saved-bowls` | Protected saved bowls |
| `/app/profile` | Protected profile |

## Common Commands

Run from `frontend/`.

```bash
npm run dev
npm run build
npm run preview
npm run lint
npx tsc --noEmit
```

## How To Check

- Type-check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`

## Service Map

- `src/services/apiClient.ts`: shared API request handling, JSON parsing, auth headers, and error handling.
- `src/services/authService.ts`: registration, login, current-user, profile, and account deactivation requests.
- `src/services/categoriesService.ts`: category metadata requests.
- `src/services/userIngredientsService.ts`: ingredient loading, search, selector options, mutations, and availability updates.
- `src/services/demoService.ts`: public demo generation.
- `src/services/bowlsService.ts`: Build Mode and Generate Mode requests.
- `src/services/pairingSuggestionsService.ts`: Build Mode pairing suggestions.
- `src/services/savedBowlsService.ts`: saved bowl list, create, rename, and delete requests.

## Testing

- TypeScript validation passes with `npx tsc --noEmit`.
- Lint passes with warnings for unfinished scaffold code.
- Page bodies and feature-specific UI behavior remain under active implementation.

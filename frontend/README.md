# BowlMix Frontend

React + TypeScript + Vite frontend for BowlMix. The frontend owns the application shell, client-side routing, shared UI components, page layouts, and client-side state orchestration. It does not serve the backend API.

The frontend app is available at [https://bowlmix-app.vercel.app/](https://bowlmix-app.vercel.app/).

Current route coverage includes the landing page, public demo, authentication page shells, protected application routes, and a 404 page. The frontend state architecture is in place for authentication, public category reference data, and authenticated user ingredients. The service-layer functions are currently typed placeholders; backend HTTP integration and most page bodies are still being implemented.

## Features

- Vite app shell with responsive styling and shared navigation.
- React Router route definitions for public and protected pages.
- JWT authentication state with login, logout, session restoration, current-user updates, and account deactivation orchestration.
- `AuthProvider` and `useAuth` for shared authentication state and actions.
- `ProtectedRoute` that waits for session restoration and then checks `isAuthenticated` before rendering private routes.
- `CategoriesProvider` and `useCategories` for public category metadata, approved visual patterns, loading state, errors, and category lookup by slug.
- `UserIngredientsProvider` and `useUserIngredients` for the full ingredient pool, My Ingredients search results, category-based selector options, availability updates, custom ingredient creation, renaming, and soft deletion.
- Reducer-based state transitions for authentication, categories, and user ingredients.
- Separate service-layer placeholders for authentication, categories, and user-ingredient API operations.
- Bootstrap 5, Bootstrap Icons, CSS Modules, shared design tokens, and fingerprint visual-system placeholders.
- Reusable component scaffolding for bowls, ingredients, generator workflows, modals, loading states, and error states.

## Requirements

- Node.js 22.20.0 (the expected version is documented in `.nvmrc`)
- npm (the frontend package manager; dependencies are locked in `package-lock.json`)
- `nvm` is optional but recommended for installing and switching to the project Node.js version

If you use `nvm`, run these commands from `frontend/`:

```bash
nvm install
nvm use
```

If you do not use `nvm`, manually install the Node.js version specified in `.nvmrc`.

## Setup

Run commands from `frontend/`.

1. Install dependencies:

```bash
npm install
```

2. Start the frontend:

```bash
npm run dev
```

The default local URL is `http://localhost:5173`.

## Frontend Architecture

The application providers are mounted in this order:

```text
CategoriesProvider
└── AuthProvider
    └── UserIngredientsProvider
        └── RouterProvider
```

- `CategoriesProvider` owns public category reference data and is independent of authentication.
- `AuthProvider` owns the current token, authenticated user, session restoration, and account actions.
- `UserIngredientsProvider` is nested inside `AuthProvider` so authenticated ingredient requests can use the current token.
- `ProtectedRoute` guards private routes using authentication state rather than checking only whether a local-storage value exists.

The backend-facing service functions are intentionally separate from the contexts. Contexts coordinate reducer state and successful responses; service files will contain the actual HTTP requests.

## State Contexts

### Authentication

Located in `src/context/auth/`.

- `AuthContext.tsx`: provider orchestration for authentication and session actions.
- `authReducer.ts`: login, logout, auth-error, user-update, and account-deletion state transitions.
- `authTypes.ts`: user, token, response, payload, error, state, and context types.
- `useAuth.ts`: typed context consumer hook.
- `src/services/authService.ts`: typed placeholder functions for backend authentication requests.

### Categories

Located in `src/context/categories/`.

The category context stores category metadata used across the application:

- Category names and slugs
- Backend color keys
- Shape-family metadata
- Category sort order
- Approved visual-pattern values
- Loading and error state

The fingerprint component will translate backend shape-family and visual-pattern values into CSS Module rules. Unknown values can use frontend fallback styling.

### User ingredients

Located in `src/context/userIngredients/`.

The user-ingredient context separates the two backend response views:

- The management pool for the My Ingredients page, including edit/delete permissions.
- Category-based selector options for the ingredient-selection modal, including `selectable` state.

Supported state transitions include full-pool loading, global search, selector loading/search, custom ingredient creation, renaming, availability updates, and soft deletion. Successful mutations update local state without refetching the complete ingredient pool.

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

## Backend Integration Status

The frontend service layer currently defines typed placeholders for the backend operations but does not yet perform HTTP requests.

Planned service integrations include:

- Authentication: login, current-user lookup, profile updates, password changes, and account deactivation.
- Categories: category metadata and approved visual patterns from `GET /api/categories`.
- User ingredients: full pool, search, category selector options, custom creation, rename, availability updates, and soft deletion.

Until those service functions are implemented, providers can expose their loading/error states but cannot retrieve live backend data.

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

Type-check the frontend:

```bash
npx tsc --noEmit
```

Build the production bundle:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Testing

- TypeScript validation currently passes with `npx tsc --noEmit`.
- Service-layer HTTP requests are not implemented yet, so live authentication, category loading, and user-ingredient flows are not available through the frontend.
- Page bodies and feature-specific UI behavior remain under active implementation.

## Service Map

- `src/services/authService.ts`: typed placeholders for authentication and account requests.
- `src/services/categoriesService.ts`: typed placeholder for category reference data and approved visual patterns.
- `src/services/userIngredientsService.ts`: typed placeholders for user-ingredient loading, search, selector options, mutations, and availability updates.

## Styling Notes

- `src/styles/variables.css`: shared design tokens, category colors, backend color-key aliases, and category fallback color.
- `src/styles/globals.css`: global application styles.
- `src/components/bowls/BowlFingerprint/BowlFingerprint.module.css`: fingerprint-specific layout, pattern, shape-family, and fallback rule placeholders.
- CSS Modules are used for component-scoped styles; shared design tokens remain global CSS custom properties.

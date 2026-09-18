# BowlMix Frontend

React + TypeScript + Vite frontend for BowlMix. The frontend owns the application shell, client-side routing, shared UI components, and page layouts. It does not serve the backend API.

The frontend app is available at [https://bowlmix-app.vercel.app/](https://bowlmix-app.vercel.app/).

Current route coverage includes the landing page, public demo, authentication page shells, protected application routes, and a 404 page. Most page bodies, API integration, authentication behavior, and data behavior are still being implemented.

## Features

- Vite app shell with responsive styling and shared navigation.
- React Router route definitions for public and protected pages.
- Temporary protected-route check using the `bowlmix_user_token` local-storage value.
- Bootstrap 5, Bootstrap Icons, CSS Modules, and shared design tokens.
- Reusable component scaffolding for bowls, ingredients, generator workflows, modals, loading states, and error states.

## Requirements

- Node.js 22.20.0
- npm

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
```

# BowlMix Frontend

React + TypeScript + Vite frontend for BowlMix. It uses React Router, Bootstrap 5, Bootstrap Icons, CSS Modules, and shared design tokens.

## Current implementation

- Landing page with BowlMix branding and links to the demo, signup, and login flows.
- Public demo page with an app header, content-card placeholder, generate action, and bowl image.
- Basic login and signup page shells with navigation between them.
- Protected `/app/*` routes using the temporary `bowlmix_user_token` local-storage check.
- Route placeholders for the generator dashboard, My Ingredients, Saved Bowls, Profile, and 404 pages.
- Component scaffolding for buttons, headers, logos, cards, loading/error states, ingredient management, bowl results, and generator workflows.
- Shared color, typography, spacing, layout, and breakpoint tokens in `src/styles/variables.css`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/demo` | Public demo |
| `/login` | Login shell |
| `/signup` | Signup shell |
| `/app/generator-dashboard` | Protected generator dashboard |
| `/app/my-ingredients` | Protected ingredient management |
| `/app/saved-bowls` | Protected saved bowls |
| `/app/profile` | Protected profile |

Most authenticated pages and shared components are currently visual placeholders awaiting their full interaction and data behavior.

## Scripts

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run preview  # preview the production build
npm run lint     # run Oxlint
```

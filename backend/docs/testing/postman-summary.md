# Postman Test Summary

## Purpose

Summarize the BowlMix backend scenarios validated in Postman without splitting the record across separate happy-flow and edge-case documents.

This file captures the documented Postman coverage only. Additional smoke tests and ad hoc manual checks were also performed during development, but they are not exhaustively itemized here.

## Test Environment

- Run date: August 3, 2026
- Environment: Local development
- Backend base URL: `http://127.0.0.1:5000`
- Collection name: `BowlMix API`
- Tester: Fatima

## Evidence

- Supporting screenshot: `runner-summary.png`
- Notes: Keep a single Postman runner summary screenshot as lightweight evidence for the documented collection coverage.

## Result Summary

- Happy-flow Postman run: `Passed`
- Edge-case Postman runs: `Passed`
- Smoke and manual checks: completed in addition to the documented Postman coverage

## Happy-Flow Coverage

The main end-to-end success path was validated through Postman using a generated user, authenticated requests, bowl generation/build operations, and saved bowl lifecycle requests.

Covered flow:

1. `POST /api/demo/bowls/generate`
2. `POST /api/auth/register`
3. `POST /api/auth/login`
4. `GET /api/auth/me`
5. `PATCH /api/auth/me`
6. `GET /api/categories`
7. `GET /api/ingredients`
8. `GET /api/ingredients?category_id=...`
9. `POST /api/ingredients`
10. `PATCH /api/ingredients/:id`
11. `PATCH /api/ingredients/:id/availability`
12. `POST /api/bowls/generate`
13. `POST /api/bowls/build`
14. `POST /api/saved-bowls`
15. `GET /api/saved-bowls`
16. `PATCH /api/saved-bowls/:id`
17. `PATCH /api/saved-bowls/:id`
18. `PATCH /api/auth/me`

Happy-flow validation confirmed:

- Core auth flows work end to end
- Public and authenticated routes are wired correctly
- Seeded category and ingredient data supports the main bowl flows
- Bowl generation, build, save, rename, and soft-delete flows work together
- Postman variable chaining across the collection works as expected

## Edge-Case Coverage

Selected negative and boundary-oriented scenarios were also validated in Postman.

### Auth

- Register:
  - Invalid email -> expected `400`, passed
  - Duplicate email -> expected `400`, passed
  - Duplicate username -> expected `400`, passed
- Login:
  - Wrong password -> expected `400` / `INVALID_CREDENTIALS`, passed
  - Missing password -> expected `400` / `LOGIN_VALIDATION_ERROR`, passed
  - Unknown email -> expected `400` / `INVALID_CREDENTIALS`, passed
- Me:
  - Missing token -> expected auth failure, passed
  - Wrong current password during profile update -> expected `400` / `USER_UPDATE_ERROR`, passed
  - `is_active=false` with extra fields -> expected `400` / `INVALID_PAYLOAD`, passed

### Demo

- Payload not allowed -> expected `400` / `UNSUPPORTED_DEMO_OPTIONS`, passed
- Non-JSON body -> expected `400` / `INVALID_JSON`, passed
- JSON array instead of object -> expected `400` / `INVALID_PAYLOAD`, passed

### Categories

- `POST` not allowed -> expected `405`, passed
- `PATCH` not allowed -> expected `405`, passed
- Response shape check -> expected `200`, passed

### Ingredients

- Invalid `category_id` -> expected `400` / `INGREDIENTS_FETCH_ERROR`, passed
- Missing name on create -> expected `400` / `INGREDIENT_CREATE_ERROR`, passed
- `is_available` not boolean -> expected `400` / `INGREDIENT_AVAILABILITY_ERROR`, passed

### Bowls

- Duplicate ingredient IDs in build request -> expected `400` / `BUILD_BOWL_ERROR`, passed
- Missing vegetable in build request -> expected `400` / `BUILD_BOWL_ERROR`, passed
- Same ingredient both locked and excluded in generate request -> expected `400` / `GENERATE_BOWLS_ERROR`, passed

### Saved Bowls

- Missing ingredients on create -> expected `400` / `SAVED_BOWL_CREATE_ERROR`, passed
- Duplicate ingredients on create -> expected `400` / `SAVED_BOWL_CREATE_ERROR`, passed
- `deleted_at=true` with extra fields on update -> expected `400` / `INVALID_PAYLOAD`, passed

## Smoke And Manual Testing

In addition to the documented Postman runs, the backend was also checked through lighter-weight smoke and manual verification during development, including:

- endpoint-by-endpoint request checks while implementing routes and services
- local validation of auth-protected flows after login token capture
- quick service and seed-data checks from the Flask shell
- ad hoc API verification while iterating on validation, persistence, and response shaping

These checks increased confidence during development, but this file is intentionally focused on the summarized Postman coverage rather than functioning as a full test ledger.

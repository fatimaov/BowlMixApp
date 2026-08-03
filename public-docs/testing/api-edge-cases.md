# API Edge Cases Test

## Purpose

Document the API edge-case scenarios executed and recorded through Postman.

## Scope

This document tracks the selected edge-case cases covered in Postman. It is not intended to be an exhaustive inventory of every manual validation performed outside the collection.

Additional smoke testing and ad hoc API checks were also performed during development while building the endpoints, including iterative validation with AI assistance, but those checks are not fully enumerated in this report.

Edge-case testing is grouped by feature area:

- Auth
- Demo
- Categories
- Ingredients
- Bowls
- Saved Bowls

Each request covers one scenario at a time, even when multiple tests reuse the same endpoint URL.

## Results

### Auth

#### Register

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Register - Invalid email` -> expected `400`, passed
  - `Register - Duplicate email` -> expected `400`, passed
  - `Register - Duplicate username` -> expected `400`, passed

#### Login

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Login - Wrong password` -> expected `400` / `INVALID_CREDENTIALS`, passed
  - `Login - Missing password` -> expected `400` / `LOGIN_VALIDATION_ERROR`, passed
  - `Login - Unknown email` -> expected `400` / `INVALID_CREDENTIALS`, passed

#### Me

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Auth Me - Missing token` -> expected auth failure, passed
  - `Update Me - Wrong current password` -> expected `400` / `USER_UPDATE_ERROR`, passed
  - `Update Me - is_active false with extra fields` -> expected `400` / `INVALID_PAYLOAD`, passed

### Demo

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Demo Generate - Payload not allowed` -> expected `400` / `UNSUPPORTED_DEMO_OPTIONS`, passed
  - `Demo Generate - Non-JSON body` -> expected `400` / `INVALID_JSON`, passed
  - `Demo Generate - JSON array instead of object` -> expected `400` / `INVALID_PAYLOAD`, passed

### Categories

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Categories - POST not allowed` -> expected `405`, passed
  - `Categories - PATCH not allowed` -> expected `405`, passed
  - `Categories - Response shape check` -> expected `200`, passed

### Ingredients

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Ingredients List - Invalid category_id` -> expected `400` / `INGREDIENTS_FETCH_ERROR`, passed
  - `Create Ingredient - Missing name` -> expected `400` / `INGREDIENT_CREATE_ERROR`, passed
  - `Ingredient Availability - is_available not boolean` -> expected `400` / `INGREDIENT_AVAILABILITY_ERROR`, passed

### Bowls

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Build Bowl - Duplicate ingredient IDs` -> expected `400` / `BUILD_BOWL_ERROR`, passed
  - `Build Bowl - Missing vegetable` -> expected `400` / `BUILD_BOWL_ERROR`, passed
  - `Generate Bowls - Same ingredient locked and excluded` -> expected `400` / `GENERATE_BOWLS_ERROR`, passed

### Saved Bowls

- Run date: August 3, 2026
- Status: `Passed`
- Cases:
  - `Create Saved Bowl - Missing ingredients` -> expected `400` / `SAVED_BOWL_CREATE_ERROR`, passed
  - `Create Saved Bowl - Duplicate ingredients` -> expected `400` / `SAVED_BOWL_CREATE_ERROR`, passed
  - `Update Saved Bowl - deleted_at true with extra fields` -> expected `400` / `INVALID_PAYLOAD`, passed

## Evidence

- Environment: Local development
- Backend base URL: http://127.0.0.1:5000
- Collection name: BowlMix API
- Tester: Fatima
- Result: `Pass for documented Postman edge cases`
- Notes: This document records the selected Postman edge-case coverage for `Auth > Register`, `Auth > Login`, `Auth > Me`, `Demo`, `Categories`, `Ingredients`, `Bowls`, and `Saved Bowls`. Additional smoke tests and manual checks were also performed during API development, including iterative validation with AI assistance, but are not fully itemized here.

### Screenshots

Add any supporting screenshots here and store the files in [assets](./assets).

- Auth register edge-case runner summary: Suggested file name `assets/auth-register-edge-cases-summary.png`
- Auth login edge-case runner summary: Suggested file name `assets/auth-login-edge-cases-summary.png`
- Auth me edge-case runner summary: Suggested file name `assets/auth-me-edge-cases-summary.png`
- Demo edge-case runner summary: Suggested file name `assets/demo-edge-cases-summary.png`
- Categories edge-case runner summary: Suggested file name `assets/categories-edge-cases-summary.png`
- Ingredients edge-case runner summary: Suggested file name `assets/ingredients-edge-cases-summary.png`
- Bowls edge-case runner summary: Suggested file name `assets/bowls-edge-cases-summary.png`
- Saved bowls edge-case runner summary: Suggested file name `assets/saved-bowls-edge-cases-summary.png`

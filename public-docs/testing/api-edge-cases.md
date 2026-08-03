# API Edge Cases Test

## Purpose

Document targeted API validation and error-handling checks executed through Postman.

## Scope

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

## Evidence

- Environment: Local development
- Backend base URL: http://127.0.0.1:5000
- Collection name: BowlMix API
- Tester: Fatima
- Result: `In Progress`
- Notes: Completed so far: `Auth > Register`, `Auth > Login`, and `Auth > Me`. All executed scenarios returned the expected failure responses.

### Screenshots

Add any supporting screenshots here and store the files in [assets](./assets).

- Auth register edge-case runner summary: Suggested file name `assets/auth-register-edge-cases-summary.png`
- Auth login edge-case runner summary: Suggested file name `assets/auth-login-edge-cases-summary.png`
- Auth me edge-case runner summary: Suggested file name `assets/auth-me-edge-cases-summary.png`

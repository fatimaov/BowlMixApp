# API Edge Cases Test

## Purpose

Document targeted API validation and error-handling checks executed through Postman.

Unlike the happy-flow test, this document tracks negative and boundary-oriented scenarios intended to confirm that the backend rejects invalid input, protects constrained operations, and returns the expected failure behavior for key endpoints.

## Scope

Edge-case testing will be grouped by feature area so it is easier to expand and maintain over time.

Current and planned groups include:

- Auth
- Demo
- Categories
- Ingredients
- Bowls
- Saved Bowls

Each edge-case test should focus on one scenario at a time, even when multiple tests reuse the same endpoint URL.

## Execution Approach

- Reuse the existing Postman collection and runtime variables established by the happy-flow run when needed
- Group tests by endpoint family, such as `Auth/Register` or `Saved Bowls/Update`
- Keep one request per edge case so failures are easy to identify
- Record only the scenarios that were actually executed and their outcomes

## Results

### Auth

#### Register

Run date:
- August 3, 2026

Status:
- Passed

Executed tests:

1. `Register - Invalid email`
   Expected result: `400 Bad Request`
   Actual result: Passed
2. `Register - Duplicate email`
   Expected result: `400 Bad Request`
   Actual result: Passed
3. `Register - Duplicate username`
   Expected result: `400 Bad Request`
   Actual result: Passed

Summary:

- The register endpoint correctly rejected all three tested invalid scenarios
- Duplicate email and duplicate username protections behaved as expected
- Invalid email validation behaved as expected

#### Login

Run date:
- August 3, 2026

Status:
- Passed

Executed tests:

1. `Login - Wrong password`
   Expected result: `400 Bad Request`
   Expected error code: `INVALID_CREDENTIALS`
   Actual result: Passed
2. `Login - Missing password`
   Expected result: `400 Bad Request`
   Expected error code: `LOGIN_VALIDATION_ERROR`
   Actual result: Passed
3. `Login - Unknown email`
   Expected result: `400 Bad Request`
   Expected error code: `INVALID_CREDENTIALS`
   Actual result: Passed

Summary:

- The login endpoint correctly rejected all three tested invalid scenarios
- Invalid credential handling behaved as expected for wrong password and unknown email
- Missing password validation behaved as expected

## Evidence

- Environment: Local development
- Backend base URL: http://127.0.0.1:5000
- Collection name: BowlMix API
- Tester: Fatima
- Result: `In Progress`
- Notes: Edge-case testing is being executed incrementally by feature area. The completed batches so far are `Auth > Register` and `Auth > Login`, and all executed scenarios returned the expected `400 Bad Request` responses.

### Screenshots

Add any supporting screenshots here and store the files in [assets](./assets).

- Auth register edge-case runner summary: Suggested file name `assets/auth-register-edge-cases-summary.png`
- Auth login edge-case runner summary: Suggested file name `assets/auth-login-edge-cases-summary.png`

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

## Evidence

- Environment: Local development
- Backend base URL: http://127.0.0.1:5000
- Collection name: BowlMix API
- Tester: Fatima
- Result: `Pass`
- Notes: The first executed edge-case batch covered `Auth > Register` and all three scenarios returned the expected `400 Bad Request` response.

### Screenshots

Add any supporting screenshots here and store the files in [assets](./assets).

- Auth register edge-case runner summary: Suggested file name `assets/auth-register-edge-cases-summary.png`

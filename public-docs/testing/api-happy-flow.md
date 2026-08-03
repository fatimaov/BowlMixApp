# API Happy Flow Test

## Purpose

Validate the main end-to-end BowlMix API user journey through Postman using a fresh user, authenticated requests, bowl generation/build, and saved bowl lifecycle operations.

## Scope

This test covers the success path only.

It does not validate:

- error handling
- invalid payloads
- unauthorized access behavior
- boundary and edge cases
- performance or concurrency

## Preconditions

- Backend is running at `{{baseUrl}}`
- Database migrations have been applied
- Seed data has been loaded
- The Postman collection contains the collection variables and scripts required for this flow

## Runtime Data Strategy

- A single `testRunId` is generated once at runtime
- `testEmail`, `testUsername`, `updatedEmail`, `updatedUsername`, and `customIngredientName` are derived from that same `testRunId`
- `accessToken` is captured from login and reused for authenticated requests
- `categoryId`, ingredient IDs, generated bowl name, and saved bowl ID are captured from earlier responses and reused later in the flow

## Flow Summary

1. Generate public demo bowls with `POST /api/demo/bowls/generate`
2. Register a new user with `POST /api/auth/register`
3. Log in with `POST /api/auth/login`
4. Fetch the current user with `GET /api/auth/me`
5. Update the profile with `PATCH /api/auth/me`
6. Fetch category metadata with `GET /api/categories`
7. Fetch the authenticated ingredient list with `GET /api/ingredients`
8. Fetch category-filtered ingredients with `GET /api/ingredients?category_id=...`
9. Create a custom ingredient with `POST /api/ingredients`
10. Rename the custom ingredient with `PATCH /api/ingredients/:id`
11. Update custom ingredient availability with `PATCH /api/ingredients/:id/availability`
12. Generate bowls with `POST /api/bowls/generate`
13. Build a bowl with `POST /api/bowls/build`
14. Save a bowl with `POST /api/saved-bowls`
15. List saved bowls with `GET /api/saved-bowls`
16. Rename a saved bowl with `PATCH /api/saved-bowls/:id`
17. Soft-delete a saved bowl with `PATCH /api/saved-bowls/:id`
18. Change the user password with `PATCH /api/auth/me`
19. Optionally deactivate the test user with `PATCH /api/auth/me`

## Expected Result

- All requests return their expected success status codes, typically `200` or `201`
- Registration and login succeed for the generated test user
- The login response returns a valid bearer token
- Authenticated endpoints succeed using the captured token
- Categories and ingredients are returned from seeded data
- At least one available base, protein, and vegetable are discovered for later bowl requests
- Bowl generation returns three bowl results
- Bowl build returns a valid bowl object
- Saved bowl create, list, rename, and soft-delete operations all succeed
- Password change succeeds for the generated test user

## What This Test Proves

- Core auth flow works end to end
- Public and authenticated API routes are wired correctly
- Seeded ingredient data supports the core bowl flows
- Bowl generation, build, and persistence work together
- Runtime variable chaining in Postman is functioning correctly

## What This Test Does Not Prove

- Validation rules for invalid input
- Exact error codes and error messages
- Missing-token and invalid-token behavior
- Empty or partially seeded database behavior
- Rate limits, retries, performance, or concurrency behavior

## Execution Notes

- The custom ingredient availability step intentionally sets the custom ingredient to unavailable only to validate that endpoint
- Later bowl build and save steps use default available ingredients, so the test remains stable after the availability update
- The final deactivate-user step should be run only if you want the generated test user to be soft-deleted at the end of the run

## Evidence

- Run date: Aug 03, 2026 08:21:20 PM
- Environment: Local development
- Backend base URL: http://127.0.0.1:5000
- Collection name: BowlMix API - Happy Flow
- Tester: Fatima
- Result: `Pass`
- Notes: All happy-flow requests passed in sequence and Postman collection variables were populated correctly across the run.

### Screenshots

Add any supporting screenshots here and store the files in [assets](./assets).

- Collection runner summary: Confirms the full happy-flow Postman run passed successfully.

## Suggested Asset Names

- `assets/runner-summary.png`

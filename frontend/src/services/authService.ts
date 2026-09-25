import type {
  DeactivateUserPayload,
  LoginPayload,
  LoginResponse,
  LoginResponseData,
  RegisterPayload,
  RegisterResponse,
  UpdateCurrentUserPayload,
  User,
  UserResponse,
} from "../types/auth";
import type { ApiErrorResponse } from "../types/api";
import { API_BASE_URL } from "../utils/env";

/**
 * Backend-facing authentication functions.
 *
 * AuthContext and registration UI use these functions to keep HTTP details
 * outside of components and state-management code.
 */
export async function register(payload: RegisterPayload): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | RegisterResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to register user.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Registration response was invalid.");
  }

  return responseBody.data.user;
}

export async function login(payload: LoginPayload): Promise<LoginResponseData> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | LoginResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to log in.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Login response was invalid.");
  }

  return responseBody.data;
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseBody = (await response.json().catch(() => null)) as
    | UserResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to retrieve the current user.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Current-user response was invalid.");
  }

  return responseBody.data.user;
}

export async function updateCurrentUser(
  _token: string,
  _payload: UpdateCurrentUserPayload,
): Promise<User> {
  throw new Error("Auth service updateCurrentUser is not implemented yet.");
}

export async function deactivateCurrentUser(
  _token: string,
  _payload: DeactivateUserPayload,
): Promise<void> {
  throw new Error("Auth service deactivateCurrentUser is not implemented yet.");
}

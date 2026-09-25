import type {
  DeactivateUserPayload,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  UpdateCurrentUserPayload,
  User,
} from "../types/auth";
import type { MessageResponse } from "../types/api";
import { apiRequest } from "./apiClient";

export async function register(payload: RegisterPayload): Promise<User> {
  return apiRequest<User>("/auth/register", {
    method: "POST",
    body: payload,
    errorMessage: "Unable to register user.",
    invalidResponseMessage: "Registration response was invalid.",
  });
}

export async function login(payload: LoginPayload): Promise<LoginResponseData> {
  return apiRequest<LoginResponseData>("/auth/login", {
    method: "POST",
    body: payload,
    errorMessage: "Unable to log in.",
    invalidResponseMessage: "Login response was invalid.",
  });
}

export async function getCurrentUser(token: string): Promise<User> {
  return apiRequest<User>("/auth/me", {
    method: "GET",
    token,
    errorMessage: "Unable to retrieve the current user.",
    invalidResponseMessage: "Current-user response was invalid.",
  });
}

export async function updateCurrentUser(
  token: string,
  payload: UpdateCurrentUserPayload,
): Promise<User> {
  return apiRequest<User>("/auth/me", {
    method: "PATCH",
    token,
    body: payload,
    errorMessage: "Unable to update the current user.",
    invalidResponseMessage: "Current-user update response was invalid.",
  });
}

export async function deactivateCurrentUser(
  token: string,
): Promise<string> {
  const payload: DeactivateUserPayload = { is_active: false };

  const responseData = await apiRequest<MessageResponse["data"]>("/auth/me", {
    method: "PATCH",
    token,
    body: payload,
    errorMessage: "Unable to deactivate the current user.",
    invalidResponseMessage: "Account deactivation response was invalid.",
  });

  return responseData.message;
}

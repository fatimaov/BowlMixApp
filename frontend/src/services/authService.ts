import type {
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  DeactivateUserPayload,
  UpdateCurrentUserPayload,
  User,
} from "../context/auth/authTypes";

/**
 * Backend-facing authentication functions.
 *
 * These are intentionally placeholders for now. The HTTP implementation will
 * be added here later so AuthContext only coordinates state transitions.
 */
export async function register(_payload: RegisterPayload): Promise<User> {
  throw new Error("Auth service register is not implemented yet.");
}

export async function login(_payload: LoginPayload): Promise<LoginResponseData> {
  throw new Error("Auth service login is not implemented yet.");
}

export async function getCurrentUser(_token: string): Promise<User> {
  throw new Error("Auth service getCurrentUser is not implemented yet.");
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

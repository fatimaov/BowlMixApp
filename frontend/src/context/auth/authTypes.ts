export type ApiError = {
  code: string;
  message: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: User;
  access_token: string;
  token_type: "Bearer";
};

export type UserResponse = {
  success: true;
  data: {
    user: User;
  };
};

export type RegisterResponse = UserResponse;

export type LoginResponse = {
  success: true;
  data: LoginResponseData;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};

export type AuthState = {
    token: string | null;
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export type UpdateCurrentUserPayload = {
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
};

export type DeactivateUserPayload = {
  is_active: false;
};

export type AuthAction =
    | { type: "AUTH_START" }
    | { type: "LOGIN_SUCCESS"; payload: { token: string; user: User } }
    | { type: "LOGOUT" }
    | { type: "AUTH_ERROR"; payload: string }
    | { type: "UPDATE_CURRENT_USER"; payload: User }
    | { type: "DELETE_CURRENT_USER" }

export type AuthContextValue = AuthState & {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    restoreSession: () => Promise<void>;
    updateCurrentUser: (payload: UpdateCurrentUserPayload) => Promise<void>;
    deleteCurrentUser: () => Promise<void>;
}

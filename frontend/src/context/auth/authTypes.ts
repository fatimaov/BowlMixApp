import type {
  UpdateCurrentUserPayload,
  User,
} from "../../types/auth";

export type AuthState = {
    token: string | null;
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

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
    deleteCurrentUser: () => Promise<string | null>;
}

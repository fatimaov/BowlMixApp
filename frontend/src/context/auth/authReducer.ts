import type { AuthState, AuthAction } from "./authTypes";

export const initialAuthState: AuthState = {
  token: null,
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "UPDATE_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "DELETE_CURRENT_USER":
      return {
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
}

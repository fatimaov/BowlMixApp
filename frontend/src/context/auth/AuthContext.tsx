import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { authReducer, initialAuthState } from "./authReducer";
import type { AuthContextValue, UpdateCurrentUserPayload } from "./authTypes";
import {
  deactivateCurrentUser,
  getCurrentUser,
  login as loginRequest,
  updateCurrentUser as updateCurrentUserRequest,
} from "../../services/authService";

const TOKEN_STORAGE_KEY = "bowlmix_auth_token";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    try {
      const result = await loginRequest({ email, password });
      localStorage.setItem(TOKEN_STORAGE_KEY, result.access_token);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: result.access_token, user: result.user },
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Unable to log in.",
      });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    dispatch({ type: "LOGOUT" });
  }, []);

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!token) {
      dispatch({ type: "LOGOUT" });
      return;
    }

    dispatch({ type: "AUTH_START" });

    try {
      const user = await getCurrentUser(token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { token, user } });
    } catch (error) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Unable to restore session.",
      });
    }
  }, []);

  const updateCurrentUser = useCallback(
    async (payload: UpdateCurrentUserPayload) => {
      if (!state.token) {
        dispatch({ type: "AUTH_ERROR", payload: "Authentication is required." });
        return;
      }

      dispatch({ type: "AUTH_START" });

      try {
        const user = await updateCurrentUserRequest(state.token, payload);
        dispatch({ type: "UPDATE_CURRENT_USER", payload: user });
      } catch (error) {
        dispatch({
          type: "AUTH_ERROR",
          payload: error instanceof Error ? error.message : "Unable to update user.",
        });
      }
    },
    [state.token],
  );

  const deleteCurrentUser = useCallback(async () => {
    if (!state.token) {
      dispatch({ type: "AUTH_ERROR", payload: "Authentication is required." });
      return;
    }

    dispatch({ type: "AUTH_START" });

    try {
      await deactivateCurrentUser(state.token);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      dispatch({ type: "DELETE_CURRENT_USER" });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Unable to delete account.",
      });
    }
  }, [state.token]);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      restoreSession,
      updateCurrentUser,
      deleteCurrentUser,
    }),
    [state, login, logout, restoreSession, updateCurrentUser, deleteCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

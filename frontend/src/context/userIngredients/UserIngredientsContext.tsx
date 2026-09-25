import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { useAuth } from "../auth/useAuth";
import {
  initialUserIngredientsState,
  userIngredientsReducer,
} from "./userIngredientsReducer";
import type {
  CreateIngredientPayload,
  RenameIngredientPayload,
  UpdateAvailabilityPayload,
} from "../../types/ingredient";
import type { UserIngredientsContextValue } from "./userIngredientsTypes";
import {
  createIngredient as createIngredientRequest,
  deleteIngredient as deleteIngredientRequest,
  getIngredients,
  getSelectorOptions,
  renameIngredient as renameIngredientRequest,
  searchIngredients as searchIngredientsRequest,
  updateAvailability as updateAvailabilityRequest,
} from "../../services/userIngredientsService";

export const UserIngredientsContext = createContext<
  UserIngredientsContextValue | undefined
>(undefined);

type UserIngredientsProviderProps = {
  children: ReactNode;
};

export function UserIngredientsProvider({
  children,
}: UserIngredientsProviderProps) {
  const [state, dispatch] = useReducer(
    userIngredientsReducer,
    initialUserIngredientsState,
  );
  const {
    token,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth();

  const loadIngredients = useCallback(async () => {
    if (!token) {
      dispatch({
        type: "INGREDIENTS_ERROR",
        payload: "Authentication is required.",
      });
      return;
    }

    dispatch({ type: "INGREDIENTS_LOADING" });

    try {
      const ingredients = await getIngredients(token);
      dispatch({ type: "INGREDIENTS_SUCCESS", payload: ingredients });
    } catch (error) {
      dispatch({
        type: "INGREDIENTS_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Unable to load ingredients.",
      });
    }
  }, [token]);

  const searchIngredients = useCallback(
    async (query: string) => {
      const normalizedQuery = query.trim();

      if (normalizedQuery.length < 3) {
        dispatch({ type: "CLEAR_SEARCH" });
        return;
      }

      if (!token) {
        dispatch({
          type: "INGREDIENTS_ERROR",
          payload: "Authentication is required.",
        });
        return;
      }

      dispatch({ type: "SEARCH_START", payload: normalizedQuery });

      try {
        const ingredients = await searchIngredientsRequest(token, normalizedQuery);
        dispatch({ type: "SEARCH_SUCCESS", payload: ingredients });
      } catch (error) {
        dispatch({
          type: "INGREDIENTS_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to search ingredients.",
        });
      }
    },
    [token],
  );

  const clearSearch = useCallback(() => {
    dispatch({ type: "CLEAR_SEARCH" });
  }, []);

  const loadSelectorOptions = useCallback(
    async (categoryId: number, searchQuery = "") => {
      if (!token) {
        dispatch({
          type: "INGREDIENTS_ERROR",
          payload: "Authentication is required.",
        });
        return;
      }

      dispatch({
        type: "SELECTOR_OPTIONS_LOADING",
        payload: { categoryId, searchQuery },
      });

      try {
        const ingredients = await getSelectorOptions(
          token,
          categoryId,
          searchQuery.trim(),
        );
        dispatch({
          type: "SELECTOR_OPTIONS_SUCCESS",
          payload: { categoryId, searchQuery: searchQuery.trim(), ingredients },
        });
      } catch (error) {
        dispatch({
          type: "INGREDIENTS_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to load selector options.",
        });
      }
    },
    [token],
  );

  const clearSelectorOptions = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTOR_OPTIONS" });
  }, []);

  const createIngredient = useCallback(
    async (payload: CreateIngredientPayload) => {
      if (!token) {
        dispatch({ type: "MUTATION_ERROR", payload: "Authentication is required." });
        return;
      }

      dispatch({ type: "MUTATION_START" });

      try {
        const ingredient = await createIngredientRequest(token, payload);
        dispatch({ type: "CREATE_INGREDIENT_SUCCESS", payload: ingredient });
      } catch (error) {
        dispatch({
          type: "MUTATION_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to create ingredient.",
        });
      }
    },
    [token],
  );

  const renameIngredient = useCallback(
    async (ingredientId: number, payload: RenameIngredientPayload) => {
      if (!token) {
        dispatch({ type: "MUTATION_ERROR", payload: "Authentication is required." });
        return;
      }

      dispatch({ type: "MUTATION_START" });

      try {
        const ingredient = await renameIngredientRequest(
          token,
          ingredientId,
          payload,
        );
        dispatch({ type: "RENAME_INGREDIENT_SUCCESS", payload: ingredient });
      } catch (error) {
        dispatch({
          type: "MUTATION_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to rename ingredient.",
        });
      }
    },
    [token],
  );

  const updateAvailability = useCallback(
    async (ingredientId: number, payload: UpdateAvailabilityPayload) => {
      if (!token) {
        dispatch({ type: "MUTATION_ERROR", payload: "Authentication is required." });
        return;
      }

      dispatch({ type: "MUTATION_START" });

      try {
        const availability = await updateAvailabilityRequest(
          token,
          ingredientId,
          payload,
        );
        dispatch({ type: "UPDATE_AVAILABILITY_SUCCESS", payload: availability });
      } catch (error) {
        dispatch({
          type: "MUTATION_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to update ingredient availability.",
        });
      }
    },
    [token],
  );

  const deleteIngredient = useCallback(
    async (ingredientId: number) => {
      if (!token) {
        dispatch({ type: "MUTATION_ERROR", payload: "Authentication is required." });
        return;
      }

      dispatch({ type: "MUTATION_START" });

      try {
        await deleteIngredientRequest(token, ingredientId);
        dispatch({ type: "DELETE_INGREDIENT_SUCCESS", payload: ingredientId });
      } catch (error) {
        dispatch({
          type: "MUTATION_ERROR",
          payload:
            error instanceof Error
              ? error.message
              : "Unable to delete ingredient.",
        });
      }
    },
    [token],
  );

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && token) {
      void loadIngredients();
    }
  }, [isAuthLoading, isAuthenticated, token, loadIngredients]);

  const value = useMemo<UserIngredientsContextValue>(
    () => ({
      ...state,
      loadIngredients,
      searchIngredients,
      clearSearch,
      loadSelectorOptions,
      clearSelectorOptions,
      createIngredient,
      renameIngredient,
      updateAvailability,
      deleteIngredient,
    }),
    [
      state,
      loadIngredients,
      searchIngredients,
      clearSearch,
      loadSelectorOptions,
      clearSelectorOptions,
      createIngredient,
      renameIngredient,
      updateAvailability,
      deleteIngredient,
    ],
  );

  return (
    <UserIngredientsContext.Provider value={value}>
      {children}
    </UserIngredientsContext.Provider>
  );
}

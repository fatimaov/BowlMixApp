import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  categoriesReducer,
  initialCategoriesState,
} from "./categoriesReducer";
import type {
  CategoriesContextValue,
} from "./categoriesTypes";
import type { Category } from "../../types/category";
import { getCategories as getCategoriesRequest } from "../../services/categoriesService";

export const CategoriesContext = createContext<
  CategoriesContextValue | undefined
>(undefined);

type CategoriesProviderProps = {
  children: ReactNode;
};

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [state, dispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState,
  );

  const loadCategories = useCallback(async () => {
    dispatch({ type: "CATEGORIES_LOADING" });

    try {
      const result = await getCategoriesRequest();
      dispatch({
        type: "CATEGORIES_SUCCESS",
        payload: {
          categories: result.categories,
          visualPatterns: result.visual_patterns,
        },
      });
    } catch (error) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Unable to load categories.",
      });
    }
  }, []);

  const getCategoryBySlug = useCallback(
    (slug: string): Category | undefined => {
      return state.categories.find((category) => category.slug === slug);
    },
    [state.categories],
  );

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const value = useMemo<CategoriesContextValue>(
    () => ({
      ...state,
      loadCategories,
      getCategoryBySlug,
    }),
    [state, loadCategories, getCategoryBySlug],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

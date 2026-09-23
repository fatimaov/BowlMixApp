import type { CategoriesAction, CategoriesState } from "./categoriesTypes";

export const initialCategoriesState: CategoriesState = {
  categories: [],
  visualPatterns: [],
  isLoading: true,
  error: null,
};

export function categoriesReducer(
  state: CategoriesState,
  action: CategoriesAction,
): CategoriesState {
  switch (action.type) {
    case "CATEGORIES_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "CATEGORIES_SUCCESS":
      return {
        categories: action.payload.categories,
        visualPatterns: action.payload.visualPatterns,
        isLoading: false,
        error: null,
      };

    case "CATEGORIES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

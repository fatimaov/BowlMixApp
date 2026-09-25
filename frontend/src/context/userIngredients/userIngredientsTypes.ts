import type {
  CreateIngredientPayload,
  IngredientAvailability,
  IngredientManagement,
  IngredientSelectorOption,
  RenameIngredientPayload,
  UpdateAvailabilityPayload,
} from "../../types/ingredient";

export type UserIngredientsState = {
  ingredients: IngredientManagement[];
  searchResults: IngredientManagement[];
  selectorOptions: IngredientSelectorOption[];
  searchQuery: string;
  selectorSearchQuery: string;
  selectorCategoryId: number | null;
  isLoading: boolean;
  isSearching: boolean;
  isSelectorLoading: boolean;
  isMutating: boolean;
  error: string | null;
};

export type UserIngredientsAction =
  | { type: "INGREDIENTS_LOADING" }
  | { type: "INGREDIENTS_SUCCESS"; payload: IngredientManagement[] }
  | { type: "SEARCH_START"; payload: string }
  | { type: "SEARCH_SUCCESS"; payload: IngredientManagement[] }
  | { type: "CLEAR_SEARCH" }
  | {
      type: "SELECTOR_OPTIONS_LOADING";
      payload: { categoryId: number; searchQuery: string };
    }
  | {
      type: "SELECTOR_OPTIONS_SUCCESS";
      payload: {
        categoryId: number;
        searchQuery: string;
        ingredients: IngredientSelectorOption[];
      };
    }
  | { type: "CLEAR_SELECTOR_OPTIONS" }
  | { type: "MUTATION_START" }
  | { type: "CREATE_INGREDIENT_SUCCESS"; payload: IngredientManagement }
  | { type: "RENAME_INGREDIENT_SUCCESS"; payload: IngredientManagement }
  | {
      type: "UPDATE_AVAILABILITY_SUCCESS";
      payload: IngredientAvailability;
    }
  | { type: "DELETE_INGREDIENT_SUCCESS"; payload: number }
  | { type: "INGREDIENTS_ERROR"; payload: string }
  | { type: "MUTATION_ERROR"; payload: string };

export type UserIngredientsContextValue = UserIngredientsState & {
  loadIngredients: () => Promise<void>;
  searchIngredients: (query: string) => Promise<void>;
  clearSearch: () => void;
  loadSelectorOptions: (categoryId: number, searchQuery?: string) => Promise<void>;
  clearSelectorOptions: () => void;
  createIngredient: (payload: CreateIngredientPayload) => Promise<void>;
  renameIngredient: (
    ingredientId: number,
    payload: RenameIngredientPayload,
  ) => Promise<void>;
  updateAvailability: (
    ingredientId: number,
    payload: UpdateAvailabilityPayload,
  ) => Promise<void>;
  deleteIngredient: (ingredientId: number) => Promise<string | null>;
};

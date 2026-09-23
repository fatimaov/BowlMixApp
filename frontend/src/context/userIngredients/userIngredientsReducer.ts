import type {
  IngredientAvailability,
  IngredientManagement,
  IngredientSelectorOption,
  UserIngredientsAction,
  UserIngredientsState,
} from "./userIngredientsTypes";

export const initialUserIngredientsState: UserIngredientsState = {
  ingredients: [],
  searchResults: [],
  selectorOptions: [],
  searchQuery: "",
  selectorSearchQuery: "",
  selectorCategoryId: null,
  isLoading: true,
  isSearching: false,
  isSelectorLoading: false,
  isMutating: false,
  error: null,
};

function matchesQuery(name: string, query: string): boolean {
  return name.toLowerCase().includes(query.trim().toLowerCase());
}

function toSelectorOption(
  ingredient: IngredientManagement,
): IngredientSelectorOption {
  return {
    ...ingredient,
    selectable: ingredient.is_available,
  };
}

function updateManagementAvailability(
  ingredients: IngredientManagement[],
  availability: IngredientAvailability,
): IngredientManagement[] {
  return ingredients.map((ingredient) =>
    ingredient.id === availability.ingredient_id
      ? { ...ingredient, is_available: availability.is_available }
      : ingredient,
  );
}

function updateSelectorAvailability(
  ingredients: IngredientSelectorOption[],
  availability: IngredientAvailability,
): IngredientSelectorOption[] {
  return ingredients.map((ingredient) =>
    ingredient.id === availability.ingredient_id
      ? {
          ...ingredient,
          is_available: availability.is_available,
          selectable: availability.selectable,
        }
      : ingredient,
  );
}

function updateManagementIngredient(
  ingredients: IngredientManagement[],
  updatedIngredient: IngredientManagement,
): IngredientManagement[] {
  return ingredients.map((ingredient) =>
    ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient,
  );
}

export function userIngredientsReducer(
  state: UserIngredientsState,
  action: UserIngredientsAction,
): UserIngredientsState {
  switch (action.type) {
    case "INGREDIENTS_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "INGREDIENTS_SUCCESS":
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        error: null,
      };

    case "SEARCH_START":
      return {
        ...state,
        searchQuery: action.payload,
        isSearching: true,
        error: null,
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        searchResults: action.payload,
        isSearching: false,
        error: null,
      };

    case "CLEAR_SEARCH":
      return {
        ...state,
        searchQuery: "",
        searchResults: [],
        isSearching: false,
      };

    case "SELECTOR_OPTIONS_LOADING":
      return {
        ...state,
        selectorCategoryId: action.payload.categoryId,
        selectorSearchQuery: action.payload.searchQuery,
        isSelectorLoading: true,
        error: null,
      };

    case "SELECTOR_OPTIONS_SUCCESS":
      return {
        ...state,
        selectorCategoryId: action.payload.categoryId,
        selectorSearchQuery: action.payload.searchQuery,
        selectorOptions: action.payload.ingredients,
        isSelectorLoading: false,
        error: null,
      };

    case "CLEAR_SELECTOR_OPTIONS":
      return {
        ...state,
        selectorOptions: [],
        selectorSearchQuery: "",
        selectorCategoryId: null,
        isSelectorLoading: false,
      };

    case "MUTATION_START":
      return {
        ...state,
        isMutating: true,
        error: null,
      };

    case "CREATE_INGREDIENT_SUCCESS": {
      const ingredient = action.payload;
      const shouldIncludeInSearch =
        state.searchQuery.length < 3 ||
        matchesQuery(ingredient.name, state.searchQuery);
      const shouldIncludeInSelector =
        state.selectorCategoryId === ingredient.category.id &&
        (state.selectorSearchQuery.length < 3 ||
          matchesQuery(ingredient.name, state.selectorSearchQuery));

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
        searchResults: shouldIncludeInSearch
          ? [...state.searchResults, ingredient]
          : state.searchResults,
        selectorOptions: shouldIncludeInSelector
          ? [...state.selectorOptions, toSelectorOption(ingredient)]
          : state.selectorOptions,
        isMutating: false,
        error: null,
      };
    }

    case "RENAME_INGREDIENT_SUCCESS":
      return {
        ...state,
        ingredients: updateManagementIngredient(
          state.ingredients,
          action.payload,
        ),
        searchResults: updateManagementIngredient(
          state.searchResults,
          action.payload,
        ),
        selectorOptions: state.selectorOptions.map((ingredient) =>
          ingredient.id === action.payload.id
            ? { ...ingredient, name: action.payload.name }
            : ingredient,
        ),
        isMutating: false,
        error: null,
      };

    case "UPDATE_AVAILABILITY_SUCCESS":
      return {
        ...state,
        ingredients: updateManagementAvailability(
          state.ingredients,
          action.payload,
        ),
        searchResults: updateManagementAvailability(
          state.searchResults,
          action.payload,
        ),
        selectorOptions: updateSelectorAvailability(
          state.selectorOptions,
          action.payload,
        ),
        isMutating: false,
        error: null,
      };

    case "DELETE_INGREDIENT_SUCCESS":
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload,
        ),
        searchResults: state.searchResults.filter(
          (ingredient) => ingredient.id !== action.payload,
        ),
        selectorOptions: state.selectorOptions.filter(
          (ingredient) => ingredient.id !== action.payload,
        ),
        isMutating: false,
        error: null,
      };

    case "INGREDIENTS_ERROR":
      return {
        ...state,
        isLoading: false,
        isSearching: false,
        isSelectorLoading: false,
        error: action.payload,
      };

    case "MUTATION_ERROR":
      return {
        ...state,
        isMutating: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

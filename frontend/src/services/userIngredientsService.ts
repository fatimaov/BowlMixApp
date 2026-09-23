import type {
  CreateIngredientPayload,
  IngredientAvailability,
  IngredientManagement,
  IngredientSelectorOption,
  RenameIngredientPayload,
  UpdateAvailabilityPayload,
} from "../context/userIngredients/userIngredientsTypes";

/**
 * Backend-facing user-ingredient functions.
 *
 * The HTTP implementation will be added here later. The context only
 * coordinates authentication, reducer state, and successful responses.
 */
export async function getIngredients(
  _token: string,
): Promise<IngredientManagement[]> {
  throw new Error("User ingredients service getIngredients is not implemented yet.");
}

export async function searchIngredients(
  _token: string,
  _query: string,
): Promise<IngredientManagement[]> {
  throw new Error(
    "User ingredients service searchIngredients is not implemented yet.",
  );
}

export async function getSelectorOptions(
  _token: string,
  _categoryId: number,
  _searchQuery?: string,
): Promise<IngredientSelectorOption[]> {
  throw new Error(
    "User ingredients service getSelectorOptions is not implemented yet.",
  );
}

export async function createIngredient(
  _token: string,
  _payload: CreateIngredientPayload,
): Promise<IngredientManagement> {
  throw new Error(
    "User ingredients service createIngredient is not implemented yet.",
  );
}

export async function renameIngredient(
  _token: string,
  _ingredientId: number,
  _payload: RenameIngredientPayload,
): Promise<IngredientManagement> {
  throw new Error(
    "User ingredients service renameIngredient is not implemented yet.",
  );
}

export async function updateAvailability(
  _token: string,
  _ingredientId: number,
  _payload: UpdateAvailabilityPayload,
): Promise<IngredientAvailability> {
  throw new Error(
    "User ingredients service updateAvailability is not implemented yet.",
  );
}

export async function deleteIngredient(
  _token: string,
  _ingredientId: number,
): Promise<void> {
  throw new Error(
    "User ingredients service deleteIngredient is not implemented yet.",
  );
}

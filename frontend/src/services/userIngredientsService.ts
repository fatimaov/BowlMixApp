import type {
  CreateIngredientPayload,
  DeleteIngredientPayload,
  IngredientAvailability,
  IngredientAvailabilityResponseData,
  IngredientManagement,
  IngredientMutationResultData,
  IngredientResponseData,
  IngredientSelectorOption,
  IngredientsResponseData,
  RenameIngredientPayload,
  UpdateAvailabilityPayload,
} from "../types/ingredient";
import { apiRequest } from "./apiClient";

export async function getIngredients(
  token: string,
): Promise<IngredientManagement[]> {
  const responseData = await apiRequest<
    IngredientsResponseData<IngredientManagement>
  >("/ingredients", {
    method: "GET",
    token,
    errorMessage: "Unable to load ingredients.",
    invalidResponseMessage: "Ingredients response was invalid.",
  });

  return responseData.ingredients;
}

export async function searchIngredients(
  token: string,
  query: string,
): Promise<IngredientManagement[]> {
  const searchParams = new URLSearchParams({ search: query });
  const responseData = await apiRequest<
    IngredientsResponseData<IngredientManagement>
  >(`/ingredients?${searchParams.toString()}`, {
    method: "GET",
    token,
    errorMessage: "Unable to search ingredients.",
    invalidResponseMessage: "Ingredient search response was invalid.",
  });

  return responseData.ingredients;
}

export async function getSelectorOptions(
  token: string,
  categoryId: number,
  searchQuery?: string,
): Promise<IngredientSelectorOption[]> {
  const searchParams = new URLSearchParams({ category_id: String(categoryId) });

  if (searchQuery !== undefined) {
    searchParams.set("search", searchQuery);
  }

  const responseData = await apiRequest<
    IngredientsResponseData<IngredientSelectorOption>
  >(`/ingredients?${searchParams.toString()}`, {
    method: "GET",
    token,
    errorMessage: "Unable to load selector options.",
    invalidResponseMessage: "Selector options response was invalid.",
  });

  return responseData.ingredients;
}

export async function createIngredient(
  token: string,
  payload: CreateIngredientPayload,
): Promise<IngredientManagement> {
  const responseData = await apiRequest<IngredientResponseData>("/ingredients", {
    method: "POST",
    token,
    body: payload,
    errorMessage: "Unable to create ingredient.",
    invalidResponseMessage: "Create ingredient response was invalid.",
  });

  return responseData.ingredient;
}

export async function renameIngredient(
  token: string,
  ingredientId: number,
  payload: RenameIngredientPayload,
): Promise<IngredientManagement> {
  const responseData = await apiRequest<IngredientMutationResultData>(
    `/ingredients/${ingredientId}`,
    {
      method: "PATCH",
      token,
      body: payload,
      errorMessage: "Unable to rename ingredient.",
      invalidResponseMessage: "Rename ingredient response was invalid.",
    },
  );

  if (!("ingredient" in responseData)) {
    throw new Error("Rename ingredient response did not include the ingredient.");
  }

  return responseData.ingredient;
}

export async function updateAvailability(
  token: string,
  ingredientId: number,
  payload: UpdateAvailabilityPayload,
): Promise<IngredientAvailability> {
  const responseData = await apiRequest<IngredientAvailabilityResponseData>(
    `/ingredients/${ingredientId}/availability`,
    {
      method: "PATCH",
      token,
      body: payload,
      errorMessage: "Unable to update ingredient availability.",
      invalidResponseMessage: "Ingredient availability response was invalid.",
    },
  );

  return responseData.availability;
}

export async function deleteIngredient(
  token: string,
  ingredientId: number,
): Promise<string> {
  const payload: DeleteIngredientPayload = { is_active: false };

  const responseData = await apiRequest<IngredientMutationResultData>(
    `/ingredients/${ingredientId}`,
    {
      method: "PATCH",
      token,
      body: payload,
      errorMessage: "Unable to delete ingredient.",
      invalidResponseMessage: "Delete ingredient response was invalid.",
    },
  );

  if (!("message" in responseData)) {
    throw new Error("Delete ingredient response did not include a message.");
  }

  return responseData.message;
}

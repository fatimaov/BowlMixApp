// Ingredient domain types, request payloads, and ingredient API responses.

import type { IngredientCategorySummary, VisualPattern } from "./category";

export type IngredientBase = {
  id: number;
  name: string;
  category: IngredientCategorySummary;
  is_default: boolean;
  is_active: boolean;
  is_available: boolean;
  visual_pattern: VisualPattern;
};

export type IngredientManagement = IngredientBase & {
  can_edit: boolean;
  can_delete: boolean;
  can_toggle_availability: boolean;
};

export type IngredientSelectorOption = IngredientBase & {
  can_toggle_availability: boolean;
  selectable: boolean;
};

export type Ingredient = IngredientManagement;

export type CreateIngredientPayload = {
  name: string;
  category_id: number;
  is_available?: boolean;
};

export type RenameIngredientPayload = {
  name: string;
};

export type UpdateAvailabilityPayload = {
  is_available: boolean;
};

export type DeleteIngredientPayload = {
  is_active: false;
};

export type IngredientAvailability = {
  ingredient_id: number;
  user_id: number;
  is_available: boolean;
  selectable: boolean;
};

export type IngredientsResponseData<
  TIngredient extends IngredientBase,
> = {
  ingredients: TIngredient[];
};

export type IngredientsResponse<TIngredient extends IngredientBase> = {
  success: true;
  data: IngredientsResponseData<TIngredient>;
};

export type IngredientResponseData = {
  ingredient: IngredientManagement;
};

export type IngredientResponse = {
  success: true;
  data: IngredientResponseData;
};

export type IngredientMutationResultData =
  | { success: true; message: string }
  | { success: true; ingredient: IngredientManagement };

export type IngredientMutationResponse = {
  success: true;
  data: IngredientMutationResultData;
};

export type IngredientAvailabilityResponseData = {
  availability: IngredientAvailability;
};

export type IngredientAvailabilityResponse = {
  success: true;
  data: IngredientAvailabilityResponseData;
};

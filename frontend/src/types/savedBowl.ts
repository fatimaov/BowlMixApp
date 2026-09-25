// Saved-bowl snapshot types, persistence payloads, and saved-bowl API responses.

import type { Category } from "./category";
import type { BowlIngredientsByCategory } from "./bowl";

export type SavedBowlSnapshotValues = {
  ingredient_name: string;
  category_name: string;
  category_slug: string;
  color_key: string;
  shape_family: string;
  visual_pattern: string;
  sort_order: number;
};

export type SavedBowlIngredientSnapshot = {
  id: number;
  saved_bowl_id: number;
  ingredient_id: number;
  category_id: number;
  name: string;
  ingredient_name_snapshot: string;
  category: Category;
  visual_pattern: string;
  snapshots: SavedBowlSnapshotValues;
};

export type SavedBowl = {
  id: number;
  user_id: number;
  name: string;
  custom_name?: string | null;
  ai_generated_name: string;
  created_at: string;
  deleted_at: string | null;
  ingredients: SavedBowlIngredientSnapshot[];
};

export type SavedBowlListItem = SavedBowl & {
  ingredient_count: number;
};

export type SavedBowlsResponseData = {
  saved_bowls: SavedBowlListItem[];
};

export type SavedBowlsResponse = {
  success: true;
  data: SavedBowlsResponseData;
};

export type SavedBowlResponseData = {
  saved_bowl: SavedBowl;
};

export type SavedBowlResponse = {
  success: true;
  data: SavedBowlResponseData;
};

export type SavedBowlIngredientReference =
  | number
  | { id: number; ingredient_id?: never }
  | { ingredient_id: number; id?: never };

export type SavedBowlIngredientRefsByCategory = Partial<
  Record<
    keyof BowlIngredientsByCategory,
    SavedBowlIngredientReference[]
  >
>;

type SavedBowlNameFields =
  | {
      ai_generated_name: string;
      name?: string;
      custom_name?: string | null;
    }
  | {
      name: string;
      ai_generated_name?: string;
      custom_name?: string | null;
    };

export type CreateSavedBowlPayload = SavedBowlNameFields & {
  ingredients: SavedBowlIngredientRefsByCategory;
};

export type WrappedSavedBowlPayload = SavedBowlNameFields & {
  bowl: {
    ingredients: SavedBowlIngredientRefsByCategory;
    [key: string]: unknown;
  };
};

export type SaveBowlPayload =
  | CreateSavedBowlPayload
  | WrappedSavedBowlPayload;

export type RenameSavedBowlPayload =
  | { name: string }
  | { custom_name: string };

export type DeleteSavedBowlPayload = {
  deleted_at: true;
};

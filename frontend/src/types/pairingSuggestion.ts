// AI pairing-suggestion request, result, and response types for Build Mode.

import type { IngredientCategorySummary, VisualPattern } from "./category";

export type PairingSuggestionsPayload = {
  target_category_id: number;
  selected_ingredient_ids: number[];
};

export type PairingSuggestion = {
  id: number;
  name: string;
  category: IngredientCategorySummary;
  is_available: boolean;
  visual_pattern: VisualPattern;
};

export type PairingSuggestionSource = "ai" | "mixed" | "fallback";

export type PairingSuggestionsResult = {
  target_category: IngredientCategorySummary;
  target_category_is_full: boolean;
  has_useful_pairing_context: boolean;
  suggestion_source: PairingSuggestionSource;
  suggestions: PairingSuggestion[];
};

export type PairingSuggestionsResponseData = {
  pairing_suggestions: PairingSuggestionsResult;
};

export type PairingSuggestionsResponse = {
  success: true;
  data: PairingSuggestionsResponseData;
};

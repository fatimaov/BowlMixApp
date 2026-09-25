// Bowl domain types, generation payloads, and bowl API response shapes.

import type { VisualPattern } from "./category";

export type BowlIngredientCategory = {
  id: number;
  name: string;
  slug: string;
  color_key: string;
  shape_family: string;
};

export type BowlIngredient = {
  id: number;
  name: string;
  category: BowlIngredientCategory;
  visual_pattern: VisualPattern;
};

export type BowlIngredientsByCategory = {
  bases: BowlIngredient[];
  proteins: BowlIngredient[];
  vegetables: BowlIngredient[];
  toppings: BowlIngredient[];
  crunch_elements: BowlIngredient[];
  sauces: BowlIngredient[];
  extras: BowlIngredient[];
};

export type Bowl = {
  name: string;
  ingredients: BowlIngredientsByCategory;
};

export type BuildBowlPayload = {
  selected_ingredient_ids: number[];
};

export type GenerateBowlsPayload = {
  locked_ingredient_ids?: number[];
  excluded_ingredient_ids?: number[];
};

export type DemoGenerateBowlsPayload = Record<string, never>;

export type BowlResponse = {
  success: true;
  data: BowlResponseData;
};

export type BowlResponseData = {
  bowl: Bowl;
};

export type BowlsResponseData = {
  bowls: Bowl[];
};

export type BowlsResponse = {
  success: true;
  data: BowlsResponseData;
};

export type DemoGenerateBowlsResponseData = BowlsResponseData;

export type DemoGenerateBowlsResponse = {
  success: true;
  data: DemoGenerateBowlsResponseData;
};

// Category domain types and API response shapes returned by the categories endpoint.

export type CategoryColorKey = string;

export type ShapeFamily = string;

export type VisualPattern = string;

export type Category = {
  id: number;
  name: string;
  slug: string;
  color_key: CategoryColorKey;
  shape_family: ShapeFamily;
  sort_order: number;
};

export type IngredientCategorySummary = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
};

export type CategoriesResponseData = {
  categories: Category[];
  visual_patterns: VisualPattern[];
};

export type CategoriesResponse = {
  success: true;
  data: CategoriesResponseData;
};

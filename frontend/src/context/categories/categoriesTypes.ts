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

export type CategoriesState = {
  categories: Category[];
  visualPatterns: VisualPattern[];
  isLoading: boolean;
  error: string | null;
};

export type CategoriesSuccessPayload = {
  categories: Category[];
  visualPatterns: VisualPattern[];
};

export type CategoriesAction =
  | { type: "CATEGORIES_LOADING" }
  | { type: "CATEGORIES_SUCCESS"; payload: CategoriesSuccessPayload }
  | { type: "CATEGORIES_ERROR"; payload: string };

export type CategoriesContextValue = CategoriesState & {
  loadCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => Category | undefined;
};

import type { Category, VisualPattern } from "../../types/category";

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

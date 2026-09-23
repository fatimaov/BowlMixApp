import type { CategoriesSuccessPayload } from "../context/categories/categoriesTypes";

/**
 * Backend-facing category reference-data functions.
 *
 * The HTTP implementation will be added here later. CategoriesContext only
 * coordinates loading state and exposes the resulting reference data.
 */
export async function getCategories(): Promise<CategoriesSuccessPayload> {
  throw new Error("Categories service getCategories is not implemented yet.");
}

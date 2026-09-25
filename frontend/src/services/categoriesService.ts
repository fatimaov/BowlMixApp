import type { CategoriesResponseData } from "../types/category";

/**
 * Backend-facing category reference-data functions.
 *
 * The HTTP implementation will be added here later. CategoriesContext only
 * coordinates loading state and exposes the resulting reference data.
 */
export async function getCategories(): Promise<CategoriesResponseData> {
  throw new Error("Categories service getCategories is not implemented yet.");
}

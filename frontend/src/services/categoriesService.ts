import type { CategoriesResponseData } from "../types/category";
import { apiRequest } from "./apiClient";


export async function getCategories(): Promise<CategoriesResponseData> {
  return apiRequest<CategoriesResponseData>("/categories", {
    method: "GET",
    errorMessage: "Unable to load categories.",
    invalidResponseMessage: "Categories response was invalid.",
  });
}

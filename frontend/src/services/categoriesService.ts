import type { ApiErrorResponse } from "../types/api";
import { API_BASE_URL } from "../utils/env";
import type {
  CategoriesResponse,
  CategoriesResponseData,
} from "../types/category";


export async function getCategories(): Promise<CategoriesResponseData> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "GET",
  });

  const responseBody = (await response.json().catch(() => null)) as
    | CategoriesResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to load categories.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Categories response was invalid.");
  }

  return responseBody.data;
}

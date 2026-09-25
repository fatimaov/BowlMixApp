import type {
  ApiErrorResponse,
  ApiSuccessResponse,
} from "../types/api";
import { API_BASE_URL } from "../utils/env";

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  token?: string;
  body?: unknown;
  headers?: Record<string, string>;
  errorMessage?: string;
  invalidResponseMessage?: string;
};

export async function apiRequest<TData>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TData> {
  const {
    token,
    body,
    headers,
    errorMessage = "The request failed.",
    invalidResponseMessage = "The API response was invalid.",
    ...requestOptions
  } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<TData>
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : errorMessage,
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error(invalidResponseMessage);
  }

  return responseBody.data;
}

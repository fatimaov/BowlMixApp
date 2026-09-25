import type { ApiErrorResponse } from "../types/api";
import { API_BASE_URL } from "../utils/env";
import type {
  PairingSuggestionsPayload,
  PairingSuggestionsResponse,
  PairingSuggestionsResponseData,
} from "../types/pairingSuggestion";

export async function getPairingSuggestions(
  token: string,
  payload: PairingSuggestionsPayload,
): Promise<PairingSuggestionsResponseData> {
  const response = await fetch(`${API_BASE_URL}/ai/pairing-suggestions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | PairingSuggestionsResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to load pairing suggestions.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Pairing-suggestions response was invalid.");
  }

  return responseBody.data;
}

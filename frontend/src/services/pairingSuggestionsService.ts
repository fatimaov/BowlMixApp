import type {
  PairingSuggestionsPayload,
  PairingSuggestionsResponseData,
} from "../types/pairingSuggestion";
import { apiRequest } from "./apiClient";

export async function getPairingSuggestions(
  token: string,
  payload: PairingSuggestionsPayload,
): Promise<PairingSuggestionsResponseData> {
  return apiRequest<PairingSuggestionsResponseData>(
    "/ai/pairing-suggestions",
    {
      method: "POST",
      token,
      body: payload,
      errorMessage: "Unable to load pairing suggestions.",
      invalidResponseMessage: "Pairing-suggestions response was invalid.",
    },
  );
}

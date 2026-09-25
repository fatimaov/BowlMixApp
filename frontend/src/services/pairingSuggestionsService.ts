/**
 * Backend-facing AI pairing-suggestion functions for Build Mode.
 *
 * Suggestions are requested for one target category using the ingredients
 * currently selected in the bowl as context.
 */

import type {
  PairingSuggestionsPayload,
  PairingSuggestionsResponseData,
} from "../types/pairingSuggestion";

export async function getPairingSuggestions(
  _token: string,
  _payload: PairingSuggestionsPayload,
): Promise<PairingSuggestionsResponseData> {
  throw new Error(
    "Pairing suggestions service getPairingSuggestions is not implemented yet.",
  );
}

/**
 * Backend-facing AI pairing-suggestion functions for Build Mode.
 *
 * Suggestions are requested for one target category using the ingredients
 * currently selected in the bowl as context.
 */

type PairingSuggestionsPayload = {
  target_category_id: number;
  selected_ingredient_ids: number[];
};

type PairingSuggestionsResult = Record<string, unknown>;

export async function getPairingSuggestions(
  _token: string,
  _payload: PairingSuggestionsPayload,
): Promise<PairingSuggestionsResult> {
  throw new Error(
    "Pairing suggestions service getPairingSuggestions is not implemented yet.",
  );
}

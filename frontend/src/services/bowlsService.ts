/**
 * Backend-facing bowl generation functions.
 *
 * Build Mode returns one bowl from explicit ingredient selections. Generate
 * Mode returns three bowls from optional locked and excluded ingredients.
 * Regeneration reuses the Generate Mode request with the latest constraints.
 */

type BuildBowlPayload = {
  selected_ingredient_ids: number[];
};

type GenerateBowlsPayload = {
  locked_ingredient_ids?: number[];
  excluded_ingredient_ids?: number[];
};

type Bowl = Record<string, unknown>;

export async function buildBowl(
  _token: string,
  _payload: BuildBowlPayload,
): Promise<Bowl> {
  throw new Error("Bowls service buildBowl is not implemented yet.");
}

export async function generateBowls(
  _token: string,
  _payload: GenerateBowlsPayload = {},
): Promise<Bowl[]> {
  throw new Error("Bowls service generateBowls is not implemented yet.");
}

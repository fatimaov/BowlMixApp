/**
 * Backend-facing bowl generation functions.
 *
 * Build Mode returns one bowl from explicit ingredient selections. Generate
 * Mode returns three bowls from optional locked and excluded ingredients.
 * Regeneration reuses the Generate Mode request with the latest constraints.
 */

import type {
  BowlResponseData,
  BuildBowlPayload,
  BowlsResponseData,
  GenerateBowlsPayload,
} from "../types/bowl";

export async function buildBowl(
  _token: string,
  _payload: BuildBowlPayload,
): Promise<BowlResponseData> {
  throw new Error("Bowls service buildBowl is not implemented yet.");
}

export async function generateBowls(
  _token: string,
  _payload: GenerateBowlsPayload = {},
): Promise<BowlsResponseData> {
  throw new Error("Bowls service generateBowls is not implemented yet.");
}

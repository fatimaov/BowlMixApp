/**
 * Backend-facing saved-bowl functions.
 *
 * Saved bowls are immutable ingredient snapshots. The frontend can list,
 * create, rename, and soft-delete saved bowls.
 */

import type {
  RenameSavedBowlPayload,
  SaveBowlPayload,
  SavedBowlResponseData,
  SavedBowlsResponseData,
} from "../types/savedBowl";

export async function getSavedBowls(
  _token: string,
): Promise<SavedBowlsResponseData> {
  throw new Error("Saved bowls service getSavedBowls is not implemented yet.");
}

export async function saveBowl(
  _token: string,
  _payload: SaveBowlPayload,
): Promise<SavedBowlResponseData> {
  throw new Error("Saved bowls service saveBowl is not implemented yet.");
}

export async function renameSavedBowl(
  _token: string,
  _savedBowlId: number,
  _payload: RenameSavedBowlPayload,
): Promise<SavedBowlResponseData> {
  throw new Error(
    "Saved bowls service renameSavedBowl is not implemented yet.",
  );
}

export async function deleteSavedBowl(
  _token: string,
  _savedBowlId: number,
): Promise<string> {
  throw new Error(
    "Saved bowls service deleteSavedBowl is not implemented yet.",
  );
}

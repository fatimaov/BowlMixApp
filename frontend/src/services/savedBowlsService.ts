/**
 * Backend-facing saved-bowl functions.
 *
 * Saved bowls are immutable ingredient snapshots. The frontend can list,
 * create, rename, and soft-delete saved bowls.
 */

type SavedBowl = Record<string, unknown>;
type SaveBowlPayload = Record<string, unknown>;

export async function getSavedBowls(_token: string): Promise<SavedBowl[]> {
  throw new Error("Saved bowls service getSavedBowls is not implemented yet.");
}

export async function saveBowl(
  _token: string,
  _payload: SaveBowlPayload,
): Promise<SavedBowl> {
  throw new Error("Saved bowls service saveBowl is not implemented yet.");
}

export async function renameSavedBowl(
  _token: string,
  _savedBowlId: number,
  _name: string,
): Promise<SavedBowl> {
  throw new Error(
    "Saved bowls service renameSavedBowl is not implemented yet.",
  );
}

export async function deleteSavedBowl(
  _token: string,
  _savedBowlId: number,
): Promise<void> {
  throw new Error(
    "Saved bowls service deleteSavedBowl is not implemented yet.",
  );
}

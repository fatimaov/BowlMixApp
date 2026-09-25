import type { MessageResponse } from "../types/api";
import type {
  DeleteSavedBowlPayload,
  RenameSavedBowlPayload,
  SaveBowlPayload,
  SavedBowlResponseData,
  SavedBowlsResponseData,
} from "../types/savedBowl";
import { apiRequest } from "./apiClient";

export async function getSavedBowls(
  token: string,
): Promise<SavedBowlsResponseData> {
  return apiRequest<SavedBowlsResponseData>("/saved-bowls", {
    method: "GET",
    token,
    errorMessage: "Unable to load saved bowls.",
    invalidResponseMessage: "Saved-bowls response was invalid.",
  });
}

export async function saveBowl(
  token: string,
  payload: SaveBowlPayload,
): Promise<SavedBowlResponseData> {
  return apiRequest<SavedBowlResponseData>("/saved-bowls", {
    method: "POST",
    token,
    body: payload,
    errorMessage: "Unable to save bowl.",
    invalidResponseMessage: "Saved-bowl response was invalid.",
  });
}

export async function renameSavedBowl(
  token: string,
  savedBowlId: number,
  payload: RenameSavedBowlPayload,
): Promise<SavedBowlResponseData> {
  return apiRequest<SavedBowlResponseData>(
    `/saved-bowls/${savedBowlId}`,
    {
      method: "PATCH",
      token,
      body: payload,
      errorMessage: "Unable to rename saved bowl.",
      invalidResponseMessage: "Saved-bowl rename response was invalid.",
    },
  );
}

export async function deleteSavedBowl(
  token: string,
  savedBowlId: number,
): Promise<string> {
  const payload: DeleteSavedBowlPayload = { deleted_at: true };
  const responseData = await apiRequest<MessageResponse["data"]>(
    `/saved-bowls/${savedBowlId}`,
    {
      method: "PATCH",
      token,
      body: payload,
      errorMessage: "Unable to delete saved bowl.",
      invalidResponseMessage: "Saved-bowl deletion response was invalid.",
    },
  );

  return responseData.message;
}

import type {
  ApiErrorResponse,
  MessageResponse,
} from "../types/api";
import { API_BASE_URL } from "../utils/env";
import type {
  DeleteSavedBowlPayload,
  RenameSavedBowlPayload,
  SaveBowlPayload,
  SavedBowlResponse,
  SavedBowlResponseData,
  SavedBowlsResponse,
  SavedBowlsResponseData,
} from "../types/savedBowl";

export async function getSavedBowls(
  token: string,
): Promise<SavedBowlsResponseData> {
  const response = await fetch(`${API_BASE_URL}/saved-bowls`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseBody = (await response.json().catch(() => null)) as
    | SavedBowlsResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to load saved bowls.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Saved-bowls response was invalid.");
  }

  return responseBody.data;
}

export async function saveBowl(
  token: string,
  payload: SaveBowlPayload,
): Promise<SavedBowlResponseData> {
  const response = await fetch(`${API_BASE_URL}/saved-bowls`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | SavedBowlResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to save bowl.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Saved-bowl response was invalid.");
  }

  return responseBody.data;
}

export async function renameSavedBowl(
  token: string,
  savedBowlId: number,
  payload: RenameSavedBowlPayload,
): Promise<SavedBowlResponseData> {
  const response = await fetch(
    `${API_BASE_URL}/saved-bowls/${savedBowlId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const responseBody = (await response.json().catch(() => null)) as
    | SavedBowlResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to rename saved bowl.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Saved-bowl rename response was invalid.");
  }

  return responseBody.data;
}

export async function deleteSavedBowl(
  token: string,
  savedBowlId: number,
): Promise<string> {
  const payload: DeleteSavedBowlPayload = { deleted_at: true };
  const response = await fetch(
    `${API_BASE_URL}/saved-bowls/${savedBowlId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const responseBody = (await response.json().catch(() => null)) as
    | MessageResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to delete saved bowl.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Saved-bowl deletion response was invalid.");
  }

  return responseBody.data.message;
}

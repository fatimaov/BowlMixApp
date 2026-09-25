/**
 * Backend-facing bowl generation functions.
 *
 * Build Mode returns one bowl from explicit ingredient selections. Generate
 * Mode returns three bowls from optional locked and excluded ingredients.
 * Regeneration reuses the Generate Mode request with the latest constraints.
 */

import type { ApiErrorResponse } from "../types/api";
import { API_BASE_URL } from "../utils/env";
import type {
  BowlResponse,
  BowlResponseData,
  BuildBowlPayload,
  BowlsResponse,
  BowlsResponseData,
  GenerateBowlsPayload,
} from "../types/bowl";

export async function buildBowl(
  token: string,
  payload: BuildBowlPayload,
): Promise<BowlResponseData> {
  const response = await fetch(`${API_BASE_URL}/bowls/build`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | BowlResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to build bowl.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Build-bowl response was invalid.");
  }

  return responseBody.data;
}

export async function generateBowls(
  token: string,
  payload: GenerateBowlsPayload = {},
): Promise<BowlsResponseData> {
  const response = await fetch(`${API_BASE_URL}/bowls/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | BowlsResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to generate bowls.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Generate-bowls response was invalid.");
  }

  return responseBody.data;
}

import type {
  BowlResponseData,
  BuildBowlPayload,
  BowlsResponseData,
  GenerateBowlsPayload,
} from "../types/bowl";
import { apiRequest } from "./apiClient";

export async function buildBowl(
  token: string,
  payload: BuildBowlPayload,
): Promise<BowlResponseData> {
  return apiRequest<BowlResponseData>("/bowls/build", {
    method: "POST",
    token,
    body: payload,
    errorMessage: "Unable to build bowl.",
    invalidResponseMessage: "Build-bowl response was invalid.",
  });
}

export async function generateBowls(
  token: string,
  payload: GenerateBowlsPayload = {},
): Promise<BowlsResponseData> {
  return apiRequest<BowlsResponseData>("/bowls/generate", {
    method: "POST",
    token,
    body: payload,
    errorMessage: "Unable to generate bowls.",
    invalidResponseMessage: "Generate-bowls response was invalid.",
  });
}

import type { ApiErrorResponse } from "../types/api";
import type {
  DemoGenerateBowlsResponse,
  DemoGenerateBowlsResponseData,
} from "../types/bowl";
import { API_BASE_URL } from "../utils/env";

export async function generateDemoBowls(): Promise<DemoGenerateBowlsResponseData> {
  const response = await fetch(`${API_BASE_URL}/demo/bowls/generate`, {
    method: "POST",
  });

  const responseBody = (await response.json().catch(() => null)) as
    | DemoGenerateBowlsResponse
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody && !responseBody.success
        ? responseBody.error.message
        : "Unable to generate demo bowls.",
    );
  }

  if (!responseBody || !responseBody.success) {
    throw new Error("Demo-bowl response was invalid.");
  }

  return responseBody.data;
}

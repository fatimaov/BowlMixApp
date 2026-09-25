import type { DemoGenerateBowlsResponseData } from "../types/bowl";
import { apiRequest } from "./apiClient";

export async function generateDemoBowls(): Promise<DemoGenerateBowlsResponseData> {
  return apiRequest<DemoGenerateBowlsResponseData>("/demo/bowls/generate", {
    method: "POST",
    errorMessage: "Unable to generate demo bowls.",
    invalidResponseMessage: "Demo-bowl response was invalid.",
  });
}

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!configuredApiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not configured. Add it to the frontend environment.",
  );
}

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/+$/, "");

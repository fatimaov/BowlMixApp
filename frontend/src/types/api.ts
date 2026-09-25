// Shared API response and error types used across frontend services.

export type ApiError = {
  code: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};

export type MessageResponse = {
  success: true;
  data: {
    message: string;
  };
};

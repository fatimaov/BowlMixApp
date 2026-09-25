// Authentication domain types: users, credentials, auth payloads, and auth responses.

export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: User;
  access_token: string;
  token_type: "Bearer";
};

export type UserResponse = {
  success: true;
  data: {
    user: User;
  };
};

export type RegisterResponse = UserResponse;

export type LoginResponse = {
  success: true;
  data: LoginResponseData;
};

export type UpdateCurrentUserPayload = {
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
};

export type DeactivateUserPayload = {
  is_active: false;
};

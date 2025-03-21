export interface SignupInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserPayload {
  uuid: string;
  fullName: string;
  email: string;
}

export interface Response {
  status: number;
  data: Record<string, unknown>;
}

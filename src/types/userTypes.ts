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
  userid: string;
  fullname: string;
  email: string;
}

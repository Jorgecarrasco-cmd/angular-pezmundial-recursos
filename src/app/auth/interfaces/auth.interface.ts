export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  id: string;
  name: string;
  lastname: string;
  token: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  lastname: string;
  isActive: boolean;
  roles: string[];
}

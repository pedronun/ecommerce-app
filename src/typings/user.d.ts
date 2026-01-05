export interface User {
  id: number;
  name: string;
  role: 'customer' | 'admin';
  email: string;
  password: string;
  avatar: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

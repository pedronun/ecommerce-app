import api from '@services/api';
import { AuthResponse, CreateUserRequest, User } from '@typings/user';

export const postAuth = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>(`/auth/login`, { email, password });
  return response.data;
};

export const getUser = async (token: string) => {
  const response = await api.get<User>(`/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createUser = async (user: CreateUserRequest) => {
  const response = await api.post<User>(`/users`, user);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await api.put<User>(`/users/${user.id}`, user);
  return response.data;
};

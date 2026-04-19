import apiClient from '@/services/api.client';
import { CreateUserDTO, UpdateUserDTO, User, UserFilter } from '@/services/types/user.type';

export const userApi = {
  getUsers: async (filter?: UserFilter): Promise<User[]> => {
    const { data } = await apiClient.get('/users', { params: filter });
    return data;
  },

  getUserById: async (id: string): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  createUser: async (user: CreateUserDTO): Promise<User> => {
    const { data } = await apiClient.post('/users', user);
    return data;
  },

  updateUser: async (id: string, user: UpdateUserDTO): Promise<User> => {
    const { data } = await apiClient.patch(`/users/${id}`, user);
    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};

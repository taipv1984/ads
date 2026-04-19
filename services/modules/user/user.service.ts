import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { USE_MOCK } from '@/services/config';
import { CreateUserDTO, UpdateUserDTO, UserFilter } from '@/services/types/user.type';
import { userApi } from './user.api';
import { userMock } from './user.mock';

// Bridge to switch between API and Mock
const service = USE_MOCK ? userMock : userApi;

// Hooks
export const useUsers = (filter: UserFilter = {}) => {
  return useQuery({
    queryKey: ['users', filter],
    queryFn: () => service.getUsers(filter),
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => service.getUserById(userId),
    enabled: !!userId,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateUserDTO) => service.createUser(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDTO }) =>
      service.updateUser(id, dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.setQueryData(['users', data.id], data);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

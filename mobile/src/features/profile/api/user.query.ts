import { useQuery } from '@tanstack/react-query';
import { userApi } from './userApi';

export const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  list: () => [...userKeys.all, 'list'] as const,
};

export const useGetMeQuery = () =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: () => userApi.getMe(),
  });

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: userKeys.list(),
    queryFn: () => userApi.getUsers(),
  });

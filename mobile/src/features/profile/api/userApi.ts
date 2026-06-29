import apiClient from '@/api/apiClient';
import type { GetUserProfileResponse, GetUsersResponse } from './types';

export const userApi = {
  getMe: () =>
    apiClient<GetUserProfileResponse>({ method: 'GET', url: '/api/user/me' }),

  getUsers: () =>
    apiClient<GetUsersResponse>({ method: 'GET', url: '/api/user' }),
};

import apiClient from '@/api/apiClient';
import type { AuthCallbackResponse } from './types';

export const authApi = {
  authCallback: () =>
    apiClient<AuthCallbackResponse>({ method: 'POST', url: '/api/auth' }),
};

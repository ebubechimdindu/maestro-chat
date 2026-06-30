import { useMutation } from '@tanstack/react-query';
import { authApi } from './authApi';
import { showErrorFeedback } from '@/core/utils/errorHandler';
import { useAuth as useClerkAuth } from '@clerk/expo';
import { useAuth } from '@/core/Providers/AuthProvider';
import { appLogger } from '@/core/utils/loggers';

export const useAuthCallbackMutation = () => {
  const { getToken } = useClerkAuth()
  const { login } = useAuth()

  return useMutation({
    mutationFn: () => authApi.authCallback(),
    onSuccess: async (data) => {
      appLogger('Auth sync succeeded', {
        level: 'info',
        fileName: 'auth.mutation.ts',
        data,
      });

      const token = await getToken();
      login({
        accessToken: token,
        refreshToken: token
      })
    },
    onError: (error) => {
      appLogger('Auth sync failed', {
        level: 'error',
        fileName: 'auth.mutation.ts',
        data: error,
      });

      showErrorFeedback(error, 'Auth sync failed');
    },
  });
}

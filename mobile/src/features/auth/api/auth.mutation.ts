import { useMutation } from '@tanstack/react-query';
import { authApi } from './authApi';
import { showErrorFeedback } from '@/core/utils/errorHandler';

export const useAuthCallbackMutation = () =>
  useMutation({
    mutationFn: () => authApi.authCallback(),
    onError: (error) => showErrorFeedback(error, 'Auth sync failed'),
  });

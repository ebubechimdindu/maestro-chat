import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from './chatApi';
import { chatKeys } from './chat.query';
import { showErrorFeedback } from '@/core/utils/errorHandler';

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (participantId: string) => chatApi.createChat(participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.list() });
    },
    onError: (error) => showErrorFeedback(error, 'Failed to create chat'),
  });
};

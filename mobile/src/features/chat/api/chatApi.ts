import apiClient from '@/api/apiClient';
import type { CreateChatResponse, GetChatsResponse, GetMessagesResponse } from './types';

export const chatApi = {
  getChats: () =>
    apiClient<GetChatsResponse>({ method: 'GET', url: '/api/chat' }),

  createChat: (participantId: string) =>
    apiClient<CreateChatResponse>({ method: 'POST', url: `/api/chat/${participantId}` }),

  getMessages: (chatId: string) =>
    apiClient<GetMessagesResponse>({ method: 'GET', url: `/api/message/chat/${chatId}/messages` }),
};

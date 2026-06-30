import { useQuery } from '@tanstack/react-query';
import { chatApi } from './chatApi';

export const chatKeys = {
  all: ['chats'] as const,
  list: () => [...chatKeys.all, 'list'] as const,
  messages: (chatId: string) => [...chatKeys.all, 'messages', chatId] as const,
};

export const useGetChatsQuery = () =>
  useQuery({
    queryKey: chatKeys.list(),
    queryFn: () => chatApi.getChats(),
  });

export const useGetMessagesQuery = (chatId: string) =>
  useQuery({
    queryKey: chatKeys.messages(chatId),
    queryFn: () => chatApi.getMessages(chatId),
    enabled: !!chatId,
  });

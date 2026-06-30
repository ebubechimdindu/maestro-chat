import type { ApiResponse } from '@/features/auth/api/types';

export interface ChatParticipant {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ChatMessage {
  _id: string;
  chat: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  _id: string;
  participant: ChatParticipant | null;
  lastMessage: ChatMessage | null;
  lastMessageAt: string;
  createdAt: string;
}

export type GetChatsResponse = ApiResponse<Chat[]>;
export type CreateChatResponse = ApiResponse<Chat>;
export type GetMessagesResponse = ApiResponse<ChatMessage[]>;

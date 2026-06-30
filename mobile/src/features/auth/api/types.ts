export interface User {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type AuthCallbackResponse = ApiResponse<User>;

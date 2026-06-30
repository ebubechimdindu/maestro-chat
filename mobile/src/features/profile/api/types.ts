import type { ApiResponse, User } from '@/features/auth/api/types';

export type { User };

export type GetUserProfileResponse = ApiResponse<User>;
export type GetUsersResponse = ApiResponse<User[]>;

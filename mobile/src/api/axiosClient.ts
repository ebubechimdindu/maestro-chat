import { showErrorFeedback } from '@/core/utils/errorHandler';
import { appLogger } from '@/core/utils/loggers';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { router } from 'expo-router';
import { APIError } from './apiClient';
import { authTokenService } from '@/services/auth/authTokenService';

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

// Retry only safe methods (GET, HEAD)
axiosRetry(axiosInstance, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay, // Use exponential backoff
  // attach callback to each retry to handle logging or tracking
  onRetry: (err:any) => appLogger(`Retrying request: ${err?.message}`),
  // Specify conditions to retry on, this is the default
  // which will retry on network errors or idempotent requests (5xx)
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error)
});


axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.url?.includes('/auth/login')) {
      console.log("Clearing tokens before login");
      await authTokenService.deleteToken();
    }
    const token = await authTokenService.getToken();
    if (token?.accessToken) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    const normalizedError: APIError = {
      message: error.message,
      code: error.code,
      response: error.response,
      detail: (error.response?.data as any)?.detail,
    };
    return Promise.reject(normalizedError);
  },
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig | undefined;
    const status = error.response?.status;


    if (status === 401 && originalRequest) {

      try {
        const token = await authTokenService.getToken();

        // If no refresh token, clear and reject
        if (!token?.refreshToken) {
          appLogger("No refresh token available.", { level: 'error' });
          authTokenService.deleteToken();
          const normalizedError: APIError = {
            message: error.message,
            code: error.code,
            response: error.response,
            detail: (error.response?.data as any)?.detail,
          };
          return Promise.reject(normalizedError);
        }

       
      
        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {

        // Catch errors from refresh token request
        const axiosError = refreshError as AxiosError;
        const normalizedError: APIError = {
          message: axiosError.message,
          code: axiosError.code,
          response: axiosError.response,
          detail: (axiosError.response?.data as any)?.detail,
        };

        appLogger('Token refresh failed: ' + normalizedError.detail, { level: 'error' });

        // Clear tokens and reject
        await authTokenService.deleteToken();

        const detail = (axiosError.response?.data as any)?.detail as string;

        if (detail.includes('User not found')) {
          showErrorFeedback('Your account was not found. Please create a new account.');
        } else {
          showErrorFeedback('Your session has expired. Please log in again.');
        }

        return Promise.reject(normalizedError);
      }
    }

    // Handle 403 Forbidden
    if (status === 403) {
      const normalizedError: APIError = {
        message: error.message,
        code: error.code,
        response: error.response,
        detail: (error.response?.data as any)?.detail,
      };
      return Promise.reject(normalizedError);
    }

    // Normalize all other errors
    const normalizedError: APIError = {
      message: error.message,
      code: error.code,
      response: error.response,
      detail: (error.response?.data as any)?.detail,
    };
    return Promise.reject(normalizedError);
  }
);

export default axiosInstance;
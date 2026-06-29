import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosClient";

// Type for normalized error object
export interface APIError {
  message: string;
  code?: string;
  detail?: string;
  status?: number;
  response?: AxiosResponse;
}

// Generic type for success response
export type APIResponse<T> = T;

// The goal of this request helper is used to normalize both
// success and error responses so your app can handle them consistently.

const apiClient = async <T = any>(options: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(options);
    return response.data; // normalized success
  } catch (error) {
    const axiosError = error as AxiosError;
    const normalizedError: APIError = {
      message: axiosError.message,
      code: axiosError.code,
      response: axiosError.response,
      status: axiosError.response?.status,
    };
    return Promise.reject(normalizedError); // normalized error
  }
};

export default apiClient;

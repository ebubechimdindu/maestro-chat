import { APIError } from "@/api/apiClient";
import { AxiosError } from "axios";
import { Feedback } from "./feedback";
import { appLogger } from "./loggers";

type ErrorType = APIError | AxiosError | unknown;

/**
 * Parse error object to extract meaningful error message
 * @param error - Error object from API or other sources
 * @returns Parsed error message string
 */
export const parseError = (error: ErrorType): string => {
     if (!error) {
        return "Something went wrong. Please try again.";
    }

    appLogger("error",{level:'error',data:error})

    // Handle APIError type
    if (error && typeof error === "object" && "code" in error) {
        const { code } = error as APIError;
       switch(code) {
            case 'ERR_NETWORK':
                return "Network connection failed. Please check your internet and try again.";
            case 'ERR_TIMEOUT':
                return "Request took too long to complete. Please try again.";
            case 'ERR_CANCELED':
                return "Request was cancelled.";
            case 'ECONNABORTED':
                return "Request took too long to complete. Please try again.";
            case 'ERR_UNAUTHORIZED':
                return "Authentication failed. Please log in again.";
            case 'ERR_FORBIDDEN':
                return "You don't have permission to perform this action.";
            case 'ERR_NOT_FOUND':
                return "The requested resource was not found.";
            case 'ERR_SERVER':
                return "Server error. Please try again later.";
        }
    }

    // Handle validation errors (422 status)
    if (error && typeof error === "object" && "status" in error) {
        if ((error as any).status === 422) {
            // Check if detail is an array (validation errors)
            if ((error as any).detail && Array.isArray((error as any).detail)) {
                const messages = (error as any).detail
                    .map((err: any) => err.msg || err.message || "Validation error")
                    .join(", ");
                return messages || "Validation error. Please check your input and try again.";
            }
            // If detail is a string
            if ((error as any).detail && typeof (error as any).detail === "string") {
                return (error as any).detail;
            }
            return "Validation error. Please check your input and try again.";
        }
    }

    // Handle APIError type
    if (error && typeof error === "object" && "detail" in error) {
        return (error as APIError).detail || "Something went wrong. Please try again.";
    }

    // Handle standard Error type
    if (error instanceof Error) {
        return error.message;
    }

    // Handle string errors
    if (typeof error === "string") {
        return error;
    }

    // Fallback for unknown error types
    return "Something went wrong. Please try again.";
};

/**
 * Handle error and display error feedback
 * @param error - Error object
 * @param title - Optional title (defaults to "Error")
 * @param customMessage - Optional custom error message
 */
export const showErrorFeedback = (
    error: ErrorType,
    title?: string,
    customMessage?: string,
) => {
    const errorMessage = customMessage || parseError(error);
    Feedback.show({
        type: 'error',
        text1: title || 'Error',
        text2: errorMessage,
    });
};

/**
 * Handle success state and display success feedback
 * @param message - Success message to display
 * @param title - Optional title (defaults to "Success")
 */
export const showSuccessFeedback = (
    message: string,
    title: string = "Success"
) => {
     Feedback.show({
        type: 'success',
        text1: title,
        text2: message,
    });
};

/**
 * Handle Info state and display info feedback
 * @param message - Info message to display
 * @param title - Optional title (defaults to "Info")
 */
export const showInfoFeedback = (
    message: string,
    title: string = "Info"
) => {
     Feedback.show({
        type: 'info',
        text1: title,
        text2: message,
        visibilityTime: 10000,
    });
};

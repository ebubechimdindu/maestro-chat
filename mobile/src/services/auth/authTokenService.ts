import { isTokenExpired } from "@/core/utils/tokenUtils";
import { secureStore } from "../storage/secureStore";
import { appLogger } from "@/core/utils/loggers";

type AuthServiceType = {
    accessToken: string | null;
    refreshToken: string | null;
}

const AUTH_TOKEN_KEY = 'secure_token';


export const authTokenService = {
    async getToken(): Promise<AuthServiceType | null> {
        try {
            return await secureStore.getItem<AuthServiceType>(AUTH_TOKEN_KEY);
        } catch (error) {
            appLogger('Error getting auth token from secure store', { level: 'error', data: error });
            return null;
        }
    },
    async setToken(value: AuthServiceType) {
        try {
            await secureStore.setItem(AUTH_TOKEN_KEY, value);
        } catch (error) {
            appLogger(`Error setting ${AUTH_TOKEN_KEY} in secure store`, { level: 'error', data: error });
            throw error;
        }
    },
    async deleteToken() {
        try {
            await secureStore.deleteItem(AUTH_TOKEN_KEY);
        } catch (error) {
            appLogger(`Error deleting secure_token from secure store`, { level: 'error', data: error });
            throw error;
        }
    },
    async updateTokens(partial: AuthServiceType) {
        const existing = await this.getToken();
        const updated = { ...existing, ...partial };
        await this.setToken(updated);
    },
    async isAccessTokenExpired(): Promise<boolean> {
        const token = await this.getToken();
        if (!token?.accessToken) return true;
        return isTokenExpired(token.accessToken);
    },
    async isRefreshTokenExpired(): Promise<boolean> {
        const token = await this.getToken();
        if (!token?.refreshToken) return true;
        return isTokenExpired(token.refreshToken);
    },
}
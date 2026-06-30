import { appLogger } from '@/core/utils/loggers';
import * as SecureStore from 'expo-secure-store';

export const secureStore = {
    async getItem<T>(key: string) : Promise<T | null> {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            appLogger(`Error getting ${key} from secure store:`, { level: 'error', data: error });
            return null;
        }
    },
    async setItem<T>(key: string, value: T) {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(value));
        } catch (error) {
            appLogger(`Error setting ${key} in secure store:`, { level: 'error', data: error });
        }
    },
    async deleteItem(key: string) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            appLogger(`Error deleting ${key} from secure store:`, { level: 'error', data: error });
        }
    }
}
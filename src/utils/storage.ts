/**
 * Service voor persistente data opslag
 * Handelt AsyncStorage operaties af met error handling
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys voor verschillende data types
export const STORAGE_KEYS = {
    MANGA_LIST: '@manga_list',
    USER_SETTINGS: '@user_settings',
    READING_LOCATIONS: '@reading_locations'
} as const;

type StorageKey = keyof typeof STORAGE_KEYS;

class StorageService {
    /**
     * Haalt data op uit storage
     * @returns Parsed data of null bij fouten
     */
    async get<T>(key: StorageKey): Promise<T | null> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS[key]);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error reading from storage (${key}):`, error);
            return null;
        }
    }

    /**
     * Slaat data op in storage
     */
    async set(key: StorageKey, value: any): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing to storage (${key}):`, error);
            throw error;
        }
    }

    /**
     * Verwijdert specifieke data uit storage
     */
    async remove(key: StorageKey): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS[key]);
        } catch (error) {
            console.error(`Error removing from storage (${key}):`, error);
            throw error;
        }
    }

    /**
     * Wist alle app-gerelateerde data uit storage
     */
    async clear(): Promise<void> {
        try {
            const keys = Object.values(STORAGE_KEYS);
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw error;
        }
    }
}

export const storage = new StorageService();
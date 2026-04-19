import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export class StorageUtil {
  // Định nghĩa các Key tĩnh bên trong class
  static Keys = {
    TOTAL_COIN: 'total_coin',
    IS_PURCHASED: 'is_purchased',
    SOUND_ENABLED: 'sound_enabled',
    VIBRATION_ENABLED: 'vibration_enabled',
  };

  // Các phương thức tĩnh (static) để truy cập trực tiếp từ class
  static saveNumber(key: string, value: number) {
    storage.set(key, value);
  }

  static getNumber(key: string, defaultValue: number = 0): number {
    const value = storage.getNumber(key);
    return value !== undefined ? value : defaultValue;
  }

  static saveBoolean(key: string, value: boolean) {
    storage.set(key, value);
  }

  static getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = storage.getBoolean(key);
    return value !== undefined ? value : defaultValue;
  }

  static saveString(key: string, value: string) {
    storage.set(key, value);
  }

  static getString(key: string, defaultValue: string = ''): string {
    const value = storage.getString(key);
    return value !== undefined ? value : defaultValue;
  }

  static saveObject<T>(key: string, value: T) {
    storage.set(key, JSON.stringify(value));
  }

  static getObject<T>(key: string, defaultValue: T | null = null): T | null {
    const jsonStr = storage.getString(key);
    if (jsonStr !== undefined) {
      try {
        return JSON.parse(jsonStr) as T;
      } catch (e) {
        console.error(`Error parsing JSON for key ${key}:`, e);
      }
    }
    return defaultValue;
  }
}

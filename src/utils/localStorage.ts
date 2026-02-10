import { STORAGE_KEYS, type StorageKey } from "@/constants/localStorage";

export const storage = {
  get: <T = string>(key: StorageKey): T | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  },

  set: <T>(key: StorageKey, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: StorageKey) => {
    localStorage.removeItem(key);
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  },
};

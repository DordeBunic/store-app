export const STORAGE_KEYS = {
  CART_KEY: "cart",
  PREFERENCES_KEY: "preferences",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

import type { Preferences } from "@/models/Prefrences";
import { storage } from "../localStorage";
import { STORAGE_KEYS } from "@/constants/localStorage";
import type { CartItem } from "@/models/CartItem";
import { Language } from "@/models/Language";
import { Theme } from "@/models/Theme";

const defaultPreferences: Preferences = {
  theme: Theme.blue,
  language: Language.en,
};

export const loadPreferencesFromStorage = (): Preferences => {
  return storage.get<Preferences>(STORAGE_KEYS.PREFERENCES_KEY) ?? defaultPreferences;
};

export const savePreferencesToStorage = (preferences: Preferences) => {
  storage.set(STORAGE_KEYS.PREFERENCES_KEY, preferences);
};


export const loadCartFromStorage = (): CartItem[] => {
  return storage.get<CartItem[]>(STORAGE_KEYS.CART_KEY) ?? [];
};

export const saveCartToStorage = (items: CartItem[]) => {
  storage.set(STORAGE_KEYS.CART_KEY, items);
};
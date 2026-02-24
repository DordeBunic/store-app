import { useSelector } from "react-redux";
import type { RootState } from "@app/store";
import {
  useCallback,
  createContext,
  useContext,
} from "react";
import { translations } from "./translations";
import type { DotKeys } from "./types";
import { Language } from "@features/i18n/models/Language";

type TranslationSchema = typeof translations.en;
export type TranslationKey = DotKeys<TranslationSchema>;

type I18nContextValue = {
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};
const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const preferencesLang = useSelector(
    (state: RootState) => state.preferences.preferences?.language ?? Language.en
  );

  const t = useCallback(
    (key: TranslationKey, vars: Record<string, string | number> = {}) => {
      const keys = key.split(".");
      let value: any = translations[preferencesLang];

      for (const k of keys) {
        value = value?.[k];
      }

      if (typeof value !== "string") return key;

      return Object.entries(vars).reduce(
        (str, [varKey, varValue]) =>
          str.replace(`{${varKey}}`, String(varValue)),
        value
      );
    },
    [preferencesLang]
  );

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
};

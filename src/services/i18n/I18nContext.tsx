import { useSelector } from "react-redux";
import type { RootState } from "@/services/state/store";
import {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import { translations } from "./translations";
import type { DotKeys } from "./types";
import type { Language } from "@/models/Language";

type TranslationSchema = typeof translations.en;
export type TranslationKey = DotKeys<TranslationSchema>;

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};
const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{
  children: React.ReactNode;
  defaultLang?: Language;
}> = ({ children, defaultLang = "en" }) => {
  const preferencesLang = useSelector(
    (state: RootState) => state.preferences.preferences?.language,
  );

  const [lang, setLang] = useState<Language>(() => {
    return preferencesLang ?? defaultLang;
  });

  useEffect(() => {
    if (preferencesLang && preferencesLang !== lang) {
      setLang(preferencesLang);
    }
  }, [preferencesLang]);

  const t = useCallback(
    (key: TranslationKey, vars: Record<string, string | number> = {}) => {
      const keys = key.split(".");
      let value: any = translations[lang];

      for (const k of keys) {
        value = value?.[k];
      }

      if (typeof value !== "string") return key;

      return Object.entries(vars).reduce(
        (str, [varKey, varValue]) =>
          str.replace(`{${varKey}}`, String(varValue)),
        value,
      );
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
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

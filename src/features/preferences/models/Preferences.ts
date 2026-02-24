import type { Language } from "@/features/i18n/models/Language";
import type { Theme } from "./Theme";

export type Preferences = {
  theme: Theme;
  language: Language;
};
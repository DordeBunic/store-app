import type { DropdownModel } from "./DropdownModel";

export const Language = {
  en: "en",
  sr: "sr",
} as const;
export type Language = keyof typeof Language;

export const Languages: DropdownModel<Language>[] = [
  { value: Language.en, label: "languages.english" },
  { value: Language.sr, label: "languages.serbian" },
];

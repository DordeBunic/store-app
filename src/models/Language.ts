import type { translations } from "@/services/i18n/translations";
import type { DropdownModel } from "./DropdownModel";

export type Language = keyof typeof translations;

export const Languages: DropdownModel<Language>[] = [
  { value: "en", label: "languages.english" },
  { value: "sr", label: "languages.serbian" },
];

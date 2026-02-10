import type { TranslationKey } from "@/services/i18n/I18nContext";

export interface DropdownModel<T> {
  value: T;
  label: TranslationKey;
}

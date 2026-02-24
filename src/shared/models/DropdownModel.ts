import type { TranslationKey } from "@/features/i18n/I18nContext";

export interface DropdownModel<T> {
  value: T;
  label: TranslationKey;
}

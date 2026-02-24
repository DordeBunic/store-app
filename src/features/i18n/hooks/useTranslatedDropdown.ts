import type { DropdownModel } from "@shared/models/DropdownModel";
import type { Option } from "@features/products/models/Option";
import { useI18n } from "@features/i18n/I18nContext";

export const useTranslatedDropdown = <T>(
  items: DropdownModel<T>[],
): Option<T>[] => {
  const { t } = useI18n();

  return items.map((item) => ({
    value: item.value,
    label: t(item.label),
  }));
};

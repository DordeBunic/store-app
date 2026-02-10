import type { DropdownModel } from "@/models/DropdownModel";
import { useI18n } from "@/services/i18n/I18nContext";
import type { Option } from "@/models/Option";

export const useTranslatedDropdown = <T>(
  items: DropdownModel<T>[],
): Option<T>[] => {
  const { t } = useI18n();

  return items.map((item) => ({
    value: item.value,
    label: t(item.label),
  }));
};

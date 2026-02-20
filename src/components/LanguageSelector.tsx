import { Dropdown } from "@/components/ui/Dropdown";
import { useI18n } from "@/services/i18n/I18nContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/services/state/store";
import { updatePreferences } from "@/services/state/preferencesSlice";
import { Languages, type Language } from "@/models/Language";
import { useTranslatedDropdown } from "@/hooks/useTranslatedDropdown";
import Text from "./ui/Text";

const LanguageSelector = () => {
  const preferencesLang = useSelector(
    (state: RootState) => state.preferences.preferences
  );

  const { t } = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const languages = useTranslatedDropdown(Languages);

  const selectedLanguage =
    preferencesLang?.language;

  const handleLanguageChange = (newLanguage: Language) => {
    dispatch(updatePreferences({
      ...preferencesLang,
      language: newLanguage
    }));
  };

  return (
    <div className="flex gap-6 align-items-center justify-content-space-between">
      <Text size="xl">
        {t("common.language")}
      </Text>
      <Dropdown
        value={selectedLanguage}
        onChange={handleLanguageChange}
        options={languages}
      />
    </div>
  );
};

export default LanguageSelector;

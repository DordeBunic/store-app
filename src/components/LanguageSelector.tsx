import { useEffect, useState } from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useI18n } from "@/services/i18n/I18nContext";
import { Typography } from "./ui/Text";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/services/state/store";
import { updatePreferences } from "@/services/state/preferencesSlice";
import { Languages, type Language } from "@/models/Language";
import { useTranslatedDropdown } from "@/hooks/useTranslatedDropdown";

const LanguageSelector = () => {
  const preferencesLang = useSelector(
    (state: RootState) => state.preferences.preferences,
  );
  const { t, lang } = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const [language, setLanguage] = useState<Language>(lang);
  const languages = useTranslatedDropdown(Languages);

  const handleLanguageChange = (newLanguage: Language) => {
    dispatch(updatePreferences({ ...preferencesLang, language: newLanguage }));
  };

  useEffect(() => {
    if (preferencesLang?.language) setLanguage(preferencesLang?.language);
  }, [preferencesLang]);

  return (
    <div className="flex gap-6 align-items-center justify-content-space-between">
      <Typography size="xl">{t("common.language")}</Typography>
      <Dropdown
        value={language}
        onChange={handleLanguageChange}
        options={languages}
      />
    </div>
  );
};

export default LanguageSelector;

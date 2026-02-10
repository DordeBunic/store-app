import { useEffect, useState } from "react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useTheme } from "@/services/provider/ThemeProvider";
import { useI18n } from "@/services/i18n/I18nContext";
import { Typography } from "./ui/Text";
import type { AppDispatch, RootState } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferences } from "@/services/state/preferencesSlice";
import { Themes, type Theme } from "@/models/Theme";
import { useTranslatedDropdown } from "@/hooks/useTranslatedDropdown";

const ThemeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const preferencesLang = useSelector((state: RootState) => state.preferences);
  const { t } = useI18n();
  const themeContext = useTheme();
  const [theme, setTheme] = useState<Theme>(themeContext.theme);
  const categories = useTranslatedDropdown(Themes);

  const handleThemeChange = (newTheme: Theme) => {
    dispatch(updatePreferences({ ...preferencesLang, theme: newTheme }));
  };
  useEffect(() => {
    if (preferencesLang.preferences?.theme)
      setTheme(preferencesLang.preferences?.theme);
  }, [preferencesLang]);

  return (
    <div className="flex gap-6 align-items-center justify-content-space-between">
      <Typography className="color-primary p-0" size="xl">
        {t("common.theme")}
      </Typography>
      <Dropdown
        value={theme}
        onChange={handleThemeChange}
        options={categories}
      />
    </div>
  );
};

export default ThemeSelector;

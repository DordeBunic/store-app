import { Dropdown } from "@shared/ui/Dropdown";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useI18n } from "@features/i18n/I18nContext";
import type { AppDispatch, RootState } from "@app/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferences } from "@/features/preferences/state/preferencesSlice";
import { Themes, type Theme } from "@/features/preferences/models/Theme";
import { useTranslatedDropdown } from "@/features/i18n/hooks/useTranslatedDropdown";
import Text from "@shared/ui/Text";

const ThemeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const preferencesTheme = useSelector(
    (state: RootState) => state.preferences.preferences
  );
  const { t } = useI18n();
  const themeContext = useTheme();
  const categories = useTranslatedDropdown(Themes);

  const selectedTheme =
    preferencesTheme.theme ?? themeContext.theme;

  const handleThemeChange = (newTheme: Theme) => {
    dispatch(updatePreferences({ ...preferencesTheme, theme: newTheme }));
  };

  return (
    <div className="flex gap-6 align-items-center justify-content-space-between">
      <Text className="color-primary p-0" size="xl">
        {t("common.theme")}
      </Text>
      <Dropdown
        value={selectedTheme}
        onChange={handleThemeChange}
        options={categories}
      />
    </div>
  );
};

export default ThemeSelector;

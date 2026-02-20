import { Dropdown } from "@/components/ui/Dropdown";
import { useTheme } from "@/services/provider/ThemeProvider";
import { useI18n } from "@/services/i18n/I18nContext";
import type { AppDispatch, RootState } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferences } from "@/services/state/preferencesSlice";
import { Themes, type Theme } from "@/models/Theme";
import { useTranslatedDropdown } from "@/hooks/useTranslatedDropdown";
import Text from "./ui/Text";

const ThemeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const preferencesLang = useSelector(
    (state: RootState) => state.preferences
  );
  const { t } = useI18n();
  const themeContext = useTheme();
  const categories = useTranslatedDropdown(Themes);

  const selectedTheme =
    preferencesLang.preferences?.theme ?? themeContext.theme;

  const handleThemeChange = (newTheme: Theme) => {
    dispatch(updatePreferences({ ...preferencesLang, theme: newTheme }));
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

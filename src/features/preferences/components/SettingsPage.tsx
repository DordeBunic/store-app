import Button from "@shared/ui/Button";
import { useI18n } from "@features/i18n/I18nContext";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store";
import { logOutUserAsync } from "@features/auth/state/authSlice";
import ThemeSelector from "@shared/components/ThemeSelector";
import LanguageSelector from "@shared/components/LanguageSelector";
import Text from "@shared/ui/Text";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();

  return (
    <div className="flex flex-row justify-content-center page-width gap-5">
      <Text as="h1" className="bold-text p-4">
        {t("page_titles.settings")}
      </Text>
      <div className="radius-6 border-thin p-4 card-shadow border-color flex flex-row gap-8">
        <ThemeSelector />
        <LanguageSelector />


        <hr className="m-0 mt-2" />

        <Button
          className="align-self-end px-5 py-2"
          onClick={() => {
            dispatch(logOutUserAsync());
          }}
        >
          {t("common.logout")}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;

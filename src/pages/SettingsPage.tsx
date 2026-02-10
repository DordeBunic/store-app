import Button from "@/components/ui/Button";
import { useI18n } from "@/services/i18n/I18nContext";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/services/state/store";
import { logOutUserAsync } from "@/services/state/authSlice";
import ThemeSelector from "@/components/ThemeSelector";
import LanguageSelector from "@/components/LanguageSelector";
import { Typography } from "@/components/ui/Text";

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();

  return (
    <div className="flex flex-row justify-content-center page-width gap-5">
      <Typography as="h1" className="bold-text p-4">
        {t("page_titles.settings")}
      </Typography>
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

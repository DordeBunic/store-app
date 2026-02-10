import { TbError404 } from "react-icons/tb";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router";
import { POST_LOGIN_PAGES } from "@/constants/pageRoutes";
import { useI18n } from "@/services/i18n/I18nContext";
import ImageText from "@/components/ImageText";
const NotFoundPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row width-full full-height justify-content-center gap-5">
      <ImageText type="error" text={t("errors.page_not_found")}>
        <TbError404 fontSize={150} className="mx-auto" />
      </ImageText>
      <Button
        onClick={() => {
          navigate(POST_LOGIN_PAGES.PRODUCTS_PAGE);
        }}
        className="align-self-center px-5 py-1 radius-10 text-lg"
      >
        {t("common.home")}
      </Button>
    </div>
  );
};

export default NotFoundPage;

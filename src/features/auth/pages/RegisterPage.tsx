import RegisterForm from "@features/auth/components/RegisterForm";
import Button from "@shared/ui/Button";
import { PRE_LOGIN_PAGES } from "@shared/constants/pageRoutes";
import { useI18n } from "@features/i18n/I18nContext";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate(PRE_LOGIN_PAGES.HOME_PAGE);
  };

  return (
    <div className="border-thin radius-10 p-10 mx-auto border-color flex flex-row justify-content-center gap-10">
      <RegisterForm />
      <hr className="m-0 mt-2" />
      <Button onClick={handleLoginClick} variant="outline">
        {t("page_titles.login")}
      </Button>
    </div>
  );
};

export default RegisterPage;

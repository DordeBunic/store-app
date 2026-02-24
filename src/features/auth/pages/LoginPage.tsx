import LoginForm from "@features/auth/components/LoginForm";
import Button from "@shared/ui/Button";
import { PRE_LOGIN_PAGES } from "@shared/constants/pageRoutes";
import { useI18n } from "@features/i18n/I18nContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const handleRegisterClick = () => {
    navigate(PRE_LOGIN_PAGES.REGISTER_PAGE);
  };

  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <div className="border-thin radius-10 p-10 mx-auto border-color flex flex-row justify-content-center gap-10">
      <LoginForm />
      <hr className="m-0 mt-2" />
      <Button variant="outline" onClick={handleRegisterClick}>
        {t("page_titles.register")}
      </Button>
    </div>
  );
};

export default LoginPage;

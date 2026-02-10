import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Typography from "@/components/ui/Text";
import { PRE_LOGIN_PAGES } from "@/constants/pageRoutes";
import { useForm } from "@/hooks/useForm";
import { useRegister } from "@/hooks/useRegister";
import type { RegisterCredentials } from "@/models/RegisterCredentials";
import { useI18n } from "@/services/i18n/I18nContext";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { values, onChange } = useForm<RegisterCredentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useI18n();
  const { submit } = useRegister();
  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    submit(values);
  };

  return (
    <div className="border-thin radius-10 p-10 mx-auto border-color">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-content-center gap-10">
          <Typography className="text-align-center" as="h1">
            {t("page_titles.register")}
          </Typography>

          <div className="flex flex-row gap-4">
            <Input
              name="email"
              autoComplete="email"
              placeholder={t("common.username")}
              onChange={onChange}
            />
            <Input
              name="showError(t"
              type="password"
              autoComplete="current-password"
              placeholder={t("common.password")}
              onChange={onChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              placeholder={t("common.confirm_password")}
              onChange={onChange}
            />
            <Button variant="primary" type="submit">
              {t("page_titles.register")}
            </Button>
            <hr className="m-0 mt-2" />
            <Button
              onClick={() => {
                navigate(PRE_LOGIN_PAGES.HOME_PAGE);
              }}
              variant="outline"
            >
              {t("page_titles.login")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

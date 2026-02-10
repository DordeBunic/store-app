import type { ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "@/hooks/useForm";
import { useI18n } from "@/services/i18n/I18nContext";
import { useLogin } from "@/hooks/useLogin";
import { Typography } from "./ui/Text";
import type { LoginCredentials } from "@/models/LoginCredentials";
import { useNavigate } from "react-router";
import { PRE_LOGIN_PAGES } from "@/constants/pageRoutes";
const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { submit } = useLogin();
  const { values, onChange } = useForm<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: ChangeEvent) => {
    e.preventDefault();
    submit(values);
  };

  return (
    <div className="border-thin radius-10 p-10 mx-auto border-color">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-content-center gap-10">
          <Typography className="text-align-center" as="h1">
            {t("page_titles.login")}
          </Typography>

          <div className="flex flex-row gap-4">
            <Input
              name="email"
              autoComplete="email"
              placeholder={t("common.username")}
              onChange={onChange}
            />
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder={t("common.password")}
              onChange={onChange}
            />
            <Button variant="primary" type="submit">
              {t("page_titles.login")}
            </Button>
            <hr className="m-0 mt-2" />
            <Button
              variant="outline"
              onClick={() => {
                navigate(PRE_LOGIN_PAGES.REGISTER_PAGE);
              }}
            >
              {t("page_titles.register")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

import type { ChangeEvent } from "react";
import Button from "@shared/ui/Button";
import { useForm } from "@shared/hooks/useForm";
import { useI18n } from "@features/i18n/I18nContext";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { LoginCredentials } from "@/features/auth/models/LoginCredentials";
import FormInput from "@shared/ui/FormInput";
import Text from "@shared/ui/Text";
const LoginForm = () => {
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row justify-content-center gap-10">
        <Text className="text-align-center" as="h1">
          {t("page_titles.login")}
        </Text>

        <div className="flex flex-row gap-4">
          <FormInput<LoginCredentials>
            name="email"
            autoComplete="email"
            placeholder={t("common.username")}
            onChange={onChange}
          />
          <FormInput<LoginCredentials>
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("common.password")}
            onChange={onChange}
          />
          <Button variant="primary" type="submit">
            {t("page_titles.login")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

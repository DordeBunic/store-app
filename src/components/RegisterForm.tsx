import { useI18n } from "@/services/i18n/I18nContext";
import Text from "./ui/Text";
import { useRegister } from "@/hooks/useRegister";
import type { ChangeEvent } from "react";
import type { RegisterCredentials } from "@/models/RegisterCredentials";
import { useForm } from "@/hooks/useForm";
import Button from "./ui/Button";
import FormInput from "./ui/FormInput";
const RegisterForm = () => {
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row justify-content-center gap-10">
        <Text className="text-align-center" as="h1">
          {t("page_titles.register")}
        </Text>

        <div className="flex flex-row gap-4">
          <FormInput<RegisterCredentials>
            name="email"
            autoComplete="email"
            placeholder={t("common.username")}
            onChange={onChange}
          />
          <FormInput<RegisterCredentials>
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("common.password")}
            onChange={onChange}
          />
          <FormInput<RegisterCredentials>
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
            placeholder={t("common.confirm_password")}
            onChange={onChange}
          />
          <Button variant="primary" type="submit">
            {t("page_titles.register")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;

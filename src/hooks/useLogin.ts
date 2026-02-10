import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/services/state/store";
import { logInUserAsync } from "@/services/state/authSlice";
import { addToast } from "@/services/state/toastSlice";
import { useI18n } from "@/services/i18n/I18nContext";
import type { LoginCredentials } from "@/models/LoginCredentials";
import { isValidEmail } from "@/utils/validators";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const error = useSelector((state: RootState) => state.auth.error);

  const showError = (message: string) =>
    dispatch(addToast({ message, type: "error" }));

  const submit = async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (!email) {
      return showError(t("auth.email_empty"));
    }
    if (!password) {
      return showError(t("auth.password_empty"));
    }
    if (!isValidEmail(email)) {
      return showError(t("auth.email_not_valid"));
    }

    dispatch(logInUserAsync(credentials));
  };

  useEffect(() => {
    if (!error) return;
    switch (error) {
      case "auth.wrong_credentials":
        showError(t("auth.wrong_credentials"));
        return;
      default:
        showError(t("auth.something_went_wrong"));
    }
    console.log(error);
  }, [error, dispatch, t]);

  return { submit };
};

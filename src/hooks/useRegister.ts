import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/services/state/store";
import { registerUserAsync } from "@/services/state/authSlice";
import { useI18n } from "@/services/i18n/I18nContext";
import { isValidEmail } from "@/utils/validators";
import type { RegisterCredentials } from "@/models/RegisterCredentials";
import { showErrorToast } from "@/utils/toast";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const error = useSelector((state: RootState) => state.auth.error);

  const submit = async (credentials: RegisterCredentials) => {
    const { email, password, confirmPassword } = credentials;

    if (!email) {
      return showErrorToast(t("auth.email_empty"));
    }
    if (!password) {
      return showErrorToast(t("auth.password_empty"));
    }
    if (!confirmPassword) {
      return showErrorToast(t("auth.confirm_password_empty"));
    }
    if (!isValidEmail(email)) {
      return showErrorToast(t("auth.email_not_valid"));
    }
    if (password !== confirmPassword) {
      return showErrorToast(t("auth.password_does_not_match"));
    }
    if (password.length < 6) {
      return showErrorToast(t("auth.weak_password"));
    }
    dispatch(registerUserAsync(credentials));
  };

  useEffect(() => {
    if (!error) return;
    switch (error) {
      case "auth/email-already-in-use":
        showErrorToast(t("auth.email_already_in_use"));
        return;
      case "auth/invalid-email":
        showErrorToast(t("auth.invalid_email"));
        return;

      case "auth/weak-password":
        showErrorToast(t("auth.weak_password"));
        return;
      default:
        showErrorToast(t("auth.something_went_wrong"));
    }
  }, [error, dispatch, t]);

  return { submit };
};

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@app/store";
import { registerUserAsync } from "@/features/auth/state/authSlice";
import { useI18n } from "@features/i18n/I18nContext";
import { isValidEmail } from "@shared/utils/validators";
import type { RegisterCredentials } from "@/features/auth/models/RegisterCredentials";
import { showErrorToast } from "@shared/utils/toast";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const error = useSelector((state: RootState) => state.auth.error);

  const submit = async (credentials: RegisterCredentials) => {
    const { email, password, confirmPassword } = credentials;

    if (!email) {
      return showErrorToast(t("auth.email_empty"), dispatch);
    }
    if (!password) {
      return showErrorToast(t("auth.password_empty"), dispatch);
    }
    if (!confirmPassword) {
      return showErrorToast(t("auth.confirm_password_empty"), dispatch);
    }
    if (!isValidEmail(email)) {
      return showErrorToast(t("auth.email_not_valid"), dispatch);
    }
    if (password !== confirmPassword) {
      return showErrorToast(t("auth.password_does_not_match"), dispatch);
    }
    if (password.length < 6) {
      return showErrorToast(t("auth.weak_password"), dispatch);
    }
    dispatch(registerUserAsync(credentials));
  };

  useEffect(() => {
    if (!error) return;
    switch (error) {
      case "auth/email-already-in-use":
        showErrorToast(t("auth.email_already_in_use"), dispatch);
        return;
      case "auth/invalid-email":
        showErrorToast(t("auth.invalid_email"), dispatch);
        return;

      case "auth/weak-password":
        showErrorToast(t("auth.weak_password"), dispatch);
        return;
      default:
        showErrorToast(t("auth.something_went_wrong"), dispatch);
    }
  }, [error, dispatch, t]);

  return { submit };
};

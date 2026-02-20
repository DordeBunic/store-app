import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/services/state/store";
import { logInUserAsync } from "@/services/state/authSlice";
import { useI18n } from "@/services/i18n/I18nContext";
import type { LoginCredentials } from "@/models/LoginCredentials";
import { isValidEmail } from "@/utils/validators";
import { showErrorToast } from "@/utils/toast";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useI18n();
  const error = useSelector((state: RootState) => state.auth.error);

  const submit = async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (!email) {
      return showErrorToast(t("auth.email_empty"), dispatch);
    }
    if (!password) {
      return showErrorToast(t("auth.password_empty"), dispatch);
    }
    if (!isValidEmail(email)) {
      return showErrorToast(t("auth.email_not_valid"), dispatch);
    }

    dispatch(logInUserAsync(credentials));
  };

  useEffect(() => {
    if (!error) return;
     if (
      error === "auth/invalid-credential" ||
      error === "auth/wrong-password" ||
      error === "auth/user-not-found"
    ) {
      showErrorToast(t("auth.wrong_credentials"), dispatch);
    }
    showErrorToast(t("auth.something_went_wrong"), dispatch);

  }, [error, dispatch, t]);

  return { submit };
};

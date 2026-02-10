import { useEffect } from "react";
import { useNavigate } from "react-router";
import { POST_LOGIN_PAGES } from "@/constants/pageRoutes";
import { isPostLoginPage, isPreLoginPage } from "@/utils/validators";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { waitForAuthReady } from "@/services/api/authReady";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/services/state/store";
import { loadPreferences } from "@/services/state/preferencesSlice";
import { loadCart } from "@/services/state/cartSlice";
import { storage } from "@/utils/localStorage";

export function AuthWatcher() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const auth = getAuth();
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      await waitForAuthReady();

      unsubscribe = onAuthStateChanged(auth, (user) => {
        const currentUrl = window.location.pathname;

        dispatch(loadPreferences());
        if (user) {
          dispatch(loadCart());
          if (isPreLoginPage(currentUrl)) {
            navigate(POST_LOGIN_PAGES.PRODUCTS_PAGE, { replace: true });
          }
        } else {
          if (isPostLoginPage(currentUrl)) {
            navigate("/", { replace: true });
          }
          storage.clearAll();
        }
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigate]);

  return null;
}

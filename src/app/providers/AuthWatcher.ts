import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@app/store";
import { loadPreferences } from "@/features/preferences/state/preferencesSlice";
import { loadCart } from "@features/cart/state/cartSlice";
import { waitForAuthReady } from "@/features/auth/services/authReady";
import { isPostLoginPage, isPreLoginPage } from "@shared/utils/validators";
import { POST_LOGIN_PAGES, PRE_LOGIN_PAGES } from "@shared/constants/pageRoutes";
import { storage } from "@shared/utils/localStorage";

export function AuthWatcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const auth = getAuth();
    let unsubscribe: (() => void) | undefined;

    const init = async () => {
      await waitForAuthReady();

      unsubscribe = onAuthStateChanged(auth, (user) => {
        const currentUrl = location.pathname;

        dispatch(loadPreferences());

        if (user) {
          dispatch(loadCart());

          if (isPreLoginPage(currentUrl)) {
            navigate(POST_LOGIN_PAGES.PRODUCTS_PAGE, { replace: true });
          }
        } else {
          if (isPostLoginPage(currentUrl)) {
            navigate(PRE_LOGIN_PAGES.HOME_PAGE, { replace: true });
          }

          storage.clearAll();
        }
      });
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigate, location.pathname, dispatch]); // ✅ depend on location

  return null;
}
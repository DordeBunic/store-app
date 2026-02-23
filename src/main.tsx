import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import { RouterProvider } from "react-router/dom";
import { store } from "./services/state/store";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./services/provider/ThemeProvider";
import { ToastProvider } from "./services/provider/ToastProvider";
import { I18nProvider } from "./services/i18n/I18nContext";
import { router } from "./routes";
import Spinner from "./components/ui/Spinner";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ToastProvider>
        <ThemeProvider>
          <I18nProvider>
            <Suspense
              fallback={
                <div className="full-width full-height flex align-items-center justify-content-center">
                  <Spinner />
                </div>
              }
            >
            <RouterProvider router={router} />
            </Suspense>
          </I18nProvider>
        </ThemeProvider>
      </ToastProvider>
    </ReduxProvider>
  </StrictMode>,
);

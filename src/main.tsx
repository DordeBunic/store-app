import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { store } from "./services/state/store";
import { Provider as ReduxProvider } from "react-redux";
import { POST_LOGIN_PAGES, PRE_LOGIN_PAGES } from "./constants/pageRoutes";
import { ThemeProvider } from "./services/provider/ThemeProvider";
import { ToastProvider } from "./services/provider/ToastProvider";
import { I18nProvider } from "./services/i18n/I18nContext";
import Spinner from "./components/ui/Spinner";

const PreLoginLayout = lazy(() => import("./components/layout/PreLoginLayout"));
const PostLoginLayout = lazy(
  () => import("./components/layout/PostLoginLayout"),
);
const CartPage = lazy(() => import("./pages/CartPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    element: <PreLoginLayout />,
    children: [
      {
        path: PRE_LOGIN_PAGES.HOME_PAGE,
        element: <LoginPage />,
      },
      {
        path: PRE_LOGIN_PAGES.REGISTER_PAGE,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <PostLoginLayout />,
    children: [
      {
        path: POST_LOGIN_PAGES.PRODUCTS_PAGE,
        element: <ProductsPage />,
      },
      {
        path: POST_LOGIN_PAGES.PRODUCT_DETAILS_PAGE,
        element: <ProductDetailsPage />,
      },
      {
        path: POST_LOGIN_PAGES.CART_PAGE,
        element: <CartPage />,
      },
      {
        path: POST_LOGIN_PAGES.SETTINGS_PAGE,
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
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

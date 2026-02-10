import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./themes.css";
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { store } from "./services/state/store";
import { Provider as ReduxProvider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import PreLoginLayout from "./components/layout/PreLoginLayout";
import { POST_LOGIN_PAGES, PRE_LOGIN_PAGES } from "./constants/pageRoutes";
import PostLoginLayout from "./components/layout/PostLoginLayout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import { ThemeProvider } from "./services/provider/ThemeProvider";
import SettingsPage from "./pages/SettingsPage";
import { ToastProvider } from "./services/provider/ToastProvider";
import NotFoundPage from "./pages/NotFoundPage";
import { I18nProvider } from "./services/i18n/I18nContext";
import RegisterPage from "./pages/RegisterPage";

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
          <I18nProvider defaultLang="en">
            <RouterProvider router={router} />
          </I18nProvider>
        </ThemeProvider>
      </ToastProvider>
    </ReduxProvider>
  </StrictMode>,
);

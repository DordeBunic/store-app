import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { POST_LOGIN_PAGES, PRE_LOGIN_PAGES, UNIVERSAL_ROUTES } from "@shared/constants/pageRoutes";
import { SitemapGroup, type AppRoute } from "@shared/models/AppRoute";

const PreLoginLayout = lazy(() => import("@shared/layout/PreLoginLayout"));
const PostLoginLayout = lazy(() => import("@shared/layout/PostLoginLayout"));

const CartPage = lazy(() => import("@features/cart/pages/CartPage"));
const LoginPage = lazy(() => import("@features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@features/auth/pages/RegisterPage"));
const ProductsPage = lazy(() => import("@features/products/pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("@features/products/pages/ProductDetailsPage"));
const SettingsPage = lazy(() => import("@/features/preferences/components/SettingsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const SiteMapPage = lazy(() => import("@/pages/SiteMapPage"));


export const appRoutes: AppRoute[] = [
  {
    element: <PreLoginLayout />,
    children: [ 
      { path: PRE_LOGIN_PAGES.HOME_PAGE, element: <LoginPage />, label: "page_titles.login", group: SitemapGroup.Authentication, sitemapOrder: 1, },
      { path: PRE_LOGIN_PAGES.REGISTER_PAGE, element: <RegisterPage />, label: "page_titles.register", group: SitemapGroup.Authentication, sitemapOrder: 2, },
      { path: UNIVERSAL_ROUTES.ROUTES_PAGE,element: <SiteMapPage />, label: "page_titles.routes", group: SitemapGroup.System, },
    ],
  },
  {
    element: <PostLoginLayout />,
    children: [
      { path: POST_LOGIN_PAGES.PRODUCTS_PAGE, element: <ProductsPage />, label: "page_titles.products", group: SitemapGroup.Shop,  sitemapOrder: 1, },
      { path: POST_LOGIN_PAGES.PRODUCT_DETAILS_PAGE, element: <ProductDetailsPage />, label: "page_titles.products_details", group: SitemapGroup.Shop, },
      { path: POST_LOGIN_PAGES.CART_PAGE, element: <CartPage />, label: "page_titles.cart", group: SitemapGroup.Shop, sitemapOrder: 2, },
      { path: POST_LOGIN_PAGES.SETTINGS_PAGE, element: <SettingsPage />, label: "page_titles.settings", group: SitemapGroup.Account, sitemapOrder: 1, },
    ],
  },
  { path: UNIVERSAL_ROUTES.ERROR_PAGE, element: <NotFoundPage />, label: "page_titles.not_found", group: SitemapGroup.System, },
];

export const router = createBrowserRouter(appRoutes);
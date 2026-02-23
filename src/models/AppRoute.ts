import type { TranslationKey } from "@/services/i18n/I18nContext";
import type { RouteObject } from "react-router-dom";

export const SitemapGroup = {
  Shop: "route_groups.shop",
  Account: "route_groups.account",
  Authentication: "route_groups.authentication",
  System: "route_groups.system",
} as const;

export type SitemapGroup =
  (typeof SitemapGroup)[keyof typeof SitemapGroup];

export type AppRoute = RouteObject & {
  label?: TranslationKey;
  group?: SitemapGroup;
  sitemapOrder?: number;
  children?: AppRoute[];
};
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/services/i18n/I18nContext";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import type { AppRoute, SitemapGroup } from "@/models/AppRoute";
import { appRoutes } from "@/routes";

const flattenRoutes = (routes: AppRoute[]): AppRoute[] =>
  routes.flatMap((route) =>
    route.children ? flattenRoutes(route.children) : route
  );

const getNavigationRoutes = (): AppRoute[] =>
  flattenRoutes(appRoutes)
    .filter(
      (route) =>
        route.sitemapOrder &&
        route.path &&
        route.label &&
        route.group
    )
    .sort(
      (a, b) => (a.sitemapOrder ?? 0) - (b.sitemapOrder ?? 0)
    );

const groupRoutes = (routes: AppRoute[]) =>
  routes.reduce<Partial<Record<SitemapGroup, AppRoute[]>>>(
    (acc, route) => {
      if (!route.group) return acc;

      if (!acc[route.group]) acc[route.group] = [];
      acc[route.group]!.push(route);

      return acc;
    },
    {}
  );

const SiteMapPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const groupedRoutes = groupRoutes(getNavigationRoutes());

  return (
    <nav aria-label="Sitemap navigation" className="flex-grow-1 p-5">
      {Object.entries(groupedRoutes).map(([groupKey, routes]) => {
        const typedGroupKey = groupKey as SitemapGroup;

        return (
          <section key={typedGroupKey}>
            <Text size="2xl">{t(typedGroupKey)}</Text>

            <ul>
              {routes!.map((route) => (
                <li key={route.path}>
                  <Button variant="text" 
                    type="button"
                    onClick={() => navigate(route.path!)}>
                    {t(route.label!)}
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
};

export default SiteMapPage;
import { type AppRouteKey, buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import type { BreadcrumbItem } from '@/lib/seo/json-ld';

type RouteBreadcrumbCrumb = {
  label: string;
  route: AppRouteKey;
};

type PathBreadcrumbCrumb = {
  label: string;
  path: string;
};

export type BreadcrumbCrumb = RouteBreadcrumbCrumb | PathBreadcrumbCrumb;

const isRouteCrumb = (crumb: BreadcrumbCrumb): crumb is RouteBreadcrumbCrumb => 'route' in crumb;

export const createBreadcrumbs = (
  locale: Locale,
  crumbs: readonly BreadcrumbCrumb[],
): BreadcrumbItem[] =>
  crumbs.map((crumb) => ({
    name: crumb.label,
    path: isRouteCrumb(crumb) ? buildLocalizedPath(locale, crumb.route) : crumb.path,
  }));

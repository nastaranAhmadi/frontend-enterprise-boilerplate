import type { Locale } from './site';

export const localizedRoutes = {
  home: '',
  about: 'about',
  blog: 'blog',
  contact: 'contact',
  faq: 'faq',
  terms: 'terms',
  products: 'products',
  gallery: 'gallery',
  menu: 'menu',
} as const;

export type AppRouteKey = keyof typeof localizedRoutes;

export const buildLocalizedPath = (locale: Locale, route: AppRouteKey): string => {
  const segment = localizedRoutes[route];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
};

export const buildLocalizedMenuItemPath = (locale: Locale, slug: string): string =>
  `/${locale}/${localizedRoutes.menu}/${slug}`;

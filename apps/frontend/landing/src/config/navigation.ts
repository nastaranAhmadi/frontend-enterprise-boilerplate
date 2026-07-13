import { buildLocalizedPath } from './routes';
import type { Locale } from './site';

export type NavigationItem = {
  key: 'home' | 'about' | 'blog' | 'contact' | 'faq' | 'products';
  href: string;
};

export const getNavigationItems = (locale: Locale): NavigationItem[] => [
  { key: 'home', href: buildLocalizedPath(locale, 'home') },
  { key: 'about', href: buildLocalizedPath(locale, 'about') },
  { key: 'blog', href: buildLocalizedPath(locale, 'blog') },
  { key: 'products', href: buildLocalizedPath(locale, 'products') },
  { key: 'faq', href: buildLocalizedPath(locale, 'faq') },
  { key: 'contact', href: buildLocalizedPath(locale, 'contact') },
];

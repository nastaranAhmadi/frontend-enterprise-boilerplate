import { getBlogPost } from '@/application/blog/get-blog-post';
import { getBlogPostSlugs } from '@/application/blog/get-blog-posts';
import { getMenuItemDetail } from '@/application/menu/get-menu-item-detail';
import { type AppRouteKey, buildLocalizedPath } from '@/config/routes';
import { locales } from '@/config/site';
import { mockMenuDetailSlug } from '@/repositories/menu/menu-detail.types';

import {
  buildAbsoluteUrl,
  buildLocalizedBlogPostPath,
  buildLocalizedMenuItemPath,
} from './alternates';

export type SitemapRouteKey = AppRouteKey;

export const sitemapStaticRoutes: readonly SitemapRouteKey[] = [
  'home',
  'about',
  'blog',
  'contact',
  'faq',
  'terms',
  'products',
  'gallery',
  'menu',
];

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
};

const routePriority: Record<SitemapRouteKey, number> = {
  home: 1,
  about: 0.8,
  blog: 0.8,
  products: 0.8,
  contact: 0.7,
  faq: 0.7,
  terms: 0.5,
  gallery: 0.6,
  menu: 0.85,
};

const routeChangeFrequency = (route: SitemapRouteKey): 'weekly' | 'monthly' =>
  route === 'home' || route === 'blog' ? 'weekly' : 'monthly';

export const getSitemapEntries = async (): Promise<SitemapEntry[]> => {
  const entries: SitemapEntry[] = [];

  for (const locale of locales) {
    for (const route of sitemapStaticRoutes) {
      entries.push({
        url: buildAbsoluteUrl(buildLocalizedPath(locale, route)),
        lastModified: new Date(),
        changeFrequency: routeChangeFrequency(route),
        priority: routePriority[route],
      });
    }

    const slugs = await getBlogPostSlugs(locale);

    for (const slug of slugs) {
      const page = await getBlogPost(locale, slug);

      entries.push({
        url: buildAbsoluteUrl(buildLocalizedBlogPostPath(locale, slug)),
        lastModified: page ? new Date(page.lastModified) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    const menuItem = await getMenuItemDetail(locale, mockMenuDetailSlug);
    if (menuItem) {
      entries.push({
        url: buildAbsoluteUrl(buildLocalizedMenuItemPath(locale, mockMenuDetailSlug)),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
};

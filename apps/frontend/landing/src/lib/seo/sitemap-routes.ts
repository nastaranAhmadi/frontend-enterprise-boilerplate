import { getBlogPosts } from '@/application/blog/get-blog-posts';
import { type AppRouteKey, buildLocalizedPath, localizedRoutes } from '@/config/routes';
import { locales } from '@/config/site';

import { buildAbsoluteUrl, buildLocalizedBlogPostPath } from './alternates';

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

    const posts = await getBlogPosts(locale);

    for (const post of posts) {
      entries.push({
        url: buildAbsoluteUrl(buildLocalizedBlogPostPath(locale, post.slug)),
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
};

export const localizedRouteSegments = Object.values(localizedRoutes).filter(Boolean);

import { type AppRouteKey, buildLocalizedPath } from '@/config/routes';
import { seoDefaults } from '@/config/seo';
import type { Locale } from '@/config/site';
import { defaultLocale, locales } from '@/config/site';

export const buildAbsoluteUrl = (pathname: string): string =>
  new URL(pathname, seoDefaults.siteUrl).toString();

export const buildCanonicalUrl = (locale: Locale, route: AppRouteKey): string =>
  buildAbsoluteUrl(buildLocalizedPath(locale, route));

export const buildLocalizedBlogPostPath = (locale: Locale, slug: string): string =>
  `/${locale}/blog/${slug}`;

export const buildLanguageAlternates = (
  locale: Locale,
  pathname: string,
): Record<string, string> => {
  const localizedSegment = pathname.replace(`/${locale}`, '') || '';

  const languages = Object.fromEntries(
    locales.map((entry) => [entry, buildAbsoluteUrl(`/${entry}${localizedSegment}`)]),
  ) as Record<string, string>;

  languages['x-default'] = buildAbsoluteUrl(`/${defaultLocale}${localizedSegment}`);

  return languages;
};

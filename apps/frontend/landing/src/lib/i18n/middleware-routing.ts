import { defaultLocale, isLocale, type Locale, locales } from '@/config/site';

export const hasLocalePrefix = (pathname: string): boolean =>
  locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

export const shouldBypassLocaleMiddleware = (pathname: string): boolean =>
  pathname.startsWith('/api');

const getFirstSegment = (pathname: string): string | undefined => pathname.split('/')[1];

/**
 * Two-letter first segments that look like locale codes but are not configured locales.
 * Example: `/xx/contact` should not become `/en/xx/contact`.
 */
export const hasInvalidLocalePrefix = (pathname: string): boolean => {
  const segment = getFirstSegment(pathname);

  if (!segment || segment.length !== 2) {
    return false;
  }

  return !isLocale(segment);
};

export const resolveLocaleRedirectPath = (
  pathname: string,
  localeDefault: Locale = defaultLocale,
): string | null => {
  if (shouldBypassLocaleMiddleware(pathname)) {
    return null;
  }

  if (hasLocalePrefix(pathname)) {
    const locale = getFirstSegment(pathname);

    if (!locale || !isLocale(locale)) {
      return `/${localeDefault}`;
    }

    return null;
  }

  if (hasInvalidLocalePrefix(pathname)) {
    const rest = pathname.split('/').slice(2).join('/');
    return rest ? `/${localeDefault}/${rest}` : `/${localeDefault}`;
  }

  if (pathname === '/') {
    return `/${localeDefault}`;
  }

  return `/${localeDefault}${pathname}`;
};

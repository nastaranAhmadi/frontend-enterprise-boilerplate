import type { Locale } from '@/config/site';
import { locales } from '@/config/site';

export const swapLocaleInPath = (pathname: string, nextLocale: Locale): string => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${nextLocale}`;
  }

  const [firstSegment] = segments;

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  }

  return `/${nextLocale}${pathname}`;
};

export const getAlternateLocales = (currentLocale: Locale): Locale[] =>
  locales.filter((locale) => locale !== currentLocale);

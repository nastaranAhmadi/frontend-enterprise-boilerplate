import { defaultLocale, isLocale, type Locale } from '@/config/site';

export const resolveLocaleFromPathname = (pathname: string): Locale => {
  const segment = pathname.split('/').filter(Boolean)[0];

  if (segment && isLocale(segment)) {
    return segment;
  }

  return defaultLocale;
};

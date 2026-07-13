import type { Locale } from '@/config/site';
import { isLocale } from '@/config/site';

export const parseProductSearchParams = (
  searchParams: URLSearchParams,
): { locale: Locale; query: string } | null => {
  const localeParam = searchParams.get('locale');
  const query = searchParams.get('q') ?? '';

  if (!localeParam || !isLocale(localeParam)) {
    return null;
  }

  return { locale: localeParam, query };
};

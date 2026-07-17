import type { Locale } from '@/config/site';

const localeToBcp47: Record<Locale, string> = {
  en: 'en-US',
  fa: 'fa-IR',
  de: 'de-DE',
  ar: 'ar',
};

export const formatPublishedDate = (locale: Locale, publishedAt: string): string =>
  new Intl.DateTimeFormat(localeToBcp47[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

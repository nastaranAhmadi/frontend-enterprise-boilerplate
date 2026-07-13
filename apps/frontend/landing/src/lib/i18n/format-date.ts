import type { Locale } from '@/config/site';

export const formatPublishedDate = (locale: Locale, publishedAt: string): string =>
  new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

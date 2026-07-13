export const locales = ['en', 'fa'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const siteName = 'Enterprise';

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

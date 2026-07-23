export const locales = ['en', 'fa'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const appName = 'D.CC';

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const readStoredLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const stored = localStorage.getItem('enterprise-admin-locale');

  return stored && isLocale(stored) ? stored : defaultLocale;
};

export const persistLocale = (locale: Locale): void => {
  localStorage.setItem('enterprise-admin-locale', locale);
  document.documentElement.lang = locale;
};

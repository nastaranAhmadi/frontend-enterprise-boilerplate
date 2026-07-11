export type TextDirection = 'ltr' | 'rtl';

export type DesignSystemLocale = string;

const RTL_LOCALE_PREFIXES = ['ar', 'fa', 'he', 'ur'] as const;

const normalizeLocale = (locale: string): string => locale.toLowerCase().replaceAll('_', '-');

export const isRtlLocale = (locale: string): boolean => {
  const normalized = normalizeLocale(locale);
  const language = normalized.split('-')[0] ?? normalized;

  return RTL_LOCALE_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}-`) || language === prefix,
  );
};

export const resolveDirFromLocale = (locale: string): TextDirection =>
  isRtlLocale(locale) ? 'rtl' : 'ltr';

export const resolveLangFromLocale = (locale: string): string => {
  const normalized = normalizeLocale(locale);
  return normalized.split('-')[0] ?? normalized;
};

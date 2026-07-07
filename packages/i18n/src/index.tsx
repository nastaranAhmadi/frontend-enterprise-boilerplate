import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type Locale = string;

export type TranslationNamespace = string;

export type TranslationDictionary = Record<string, string>;

export type Translations = Record<Locale, Record<TranslationNamespace, TranslationDictionary>>;

export type I18nConfig = {
  defaultLocale: Locale;
  locales: readonly Locale[];
  namespaces: readonly TranslationNamespace[];
  translations?: Translations;
};

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (namespace: TranslationNamespace, key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export type I18nProviderProps = {
  children: ReactNode;
  config: I18nConfig;
};

/** Locale provider with namespace-based translation loading. No translations bundled. */
export function I18nProvider({ children, config }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(config.defaultLocale);

  const t = useCallback(
    (namespace: TranslationNamespace, key: string) => {
      return config.translations?.[locale]?.[namespace]?.[key] ?? key;
    },
    [config.translations, locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export function useTranslation(namespace: TranslationNamespace) {
  const { t, locale } = useI18n();
  return useMemo(
    () => ({
      locale,
      t: (key: string) => t(namespace, key),
    }),
    [locale, namespace, t],
  );
}

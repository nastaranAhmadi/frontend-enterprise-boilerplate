'use client';

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

export type I18nProviderProps = {
  children: ReactNode;
  config: I18nConfig;
  /** Controlled locale override. */
  locale?: Locale;
};

export type UseI18nHook = () => I18nContextValue;

export type UseTranslationHook = (namespace: TranslationNamespace) => {
  locale: Locale;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const resolveTranslation = (
  translations: Translations | undefined,
  locale: Locale,
  namespace: TranslationNamespace,
  key: string,
): string => translations?.[locale]?.[namespace]?.[key] ?? key;

export const I18nProvider = function I18nProvider(props: I18nProviderProps) {
  const { children, config, locale: controlledLocale } = props;
  const [uncontrolledLocale, setUncontrolledLocale] = useState(config.defaultLocale);
  const locale = controlledLocale ?? uncontrolledLocale;

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (!config.locales.includes(nextLocale)) {
        return;
      }

      if (controlledLocale === undefined) {
        setUncontrolledLocale(nextLocale);
      }
    },
    [config.locales, controlledLocale],
  );

  const t = useCallback(
    (namespace: TranslationNamespace, key: string) =>
      resolveTranslation(config.translations, locale, namespace, key),
    [config.translations, locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

I18nProvider.displayName = 'I18nProvider';

export const useI18n: UseI18nHook = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider.');
  }

  return context;
};

export const useTranslation: UseTranslationHook = (namespace) => {
  const { locale, t } = useI18n();

  return useMemo(
    () => ({
      locale,
      t: (key: string) => t(namespace, key),
    }),
    [locale, namespace, t],
  );
};

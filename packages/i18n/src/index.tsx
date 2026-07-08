import type { ReactNode } from 'react';

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
};

export interface I18nProviderComponent {
  (props: I18nProviderProps): ReactNode;
}

export type UseI18nHook = () => I18nContextValue;

export type UseTranslationHook = (namespace: TranslationNamespace) => {
  locale: Locale;
  t: (key: string) => string;
};

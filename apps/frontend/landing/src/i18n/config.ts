import type { I18nConfig } from '@enterprise/i18n';

import type { Locale } from '@/config/site';
import { defaultLocale, locales } from '@/config/site';

import en from './dictionaries/en.json';
import fa from './dictionaries/fa.json';

const toTranslations = (dictionary: typeof en) => ({
  common: dictionary.common,
  home: {
    title: dictionary.home.title,
    description: dictionary.home.description,
    cta: dictionary.home.cta,
  },
  navigation: dictionary.navigation,
  locale: dictionary.locale,
  theme: dictionary.theme,
  footer: dictionary.footer,
  metadata: dictionary.metadata,
});

export const createI18nConfig = (): I18nConfig => ({
  defaultLocale,
  locales,
  namespaces: ['common', 'home', 'navigation', 'locale', 'theme', 'footer', 'metadata'],
  translations: {
    en: toTranslations(en),
    fa: toTranslations(fa),
  },
});

export type LandingNamespace =
  | 'common'
  | 'home'
  | 'navigation'
  | 'locale'
  | 'theme'
  | 'footer'
  | 'metadata';

export const isLandingLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

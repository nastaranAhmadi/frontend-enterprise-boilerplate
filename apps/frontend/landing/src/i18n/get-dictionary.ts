import type { Locale } from '@/config/site';

import en from './dictionaries/en.json';
import fa from './dictionaries/fa.json';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fa,
};

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

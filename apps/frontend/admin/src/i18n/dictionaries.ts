import type { Locale } from '@/config/site';

import en from './dictionaries/en.json';
import fa from './dictionaries/fa.json';

export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  fa,
};

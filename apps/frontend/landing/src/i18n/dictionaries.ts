import type { Locale } from '@/config/site';

import ar from './dictionaries/ar.json';
import de from './dictionaries/de.json';
import en from './dictionaries/en.json';
import fa from './dictionaries/fa.json';

export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  fa,
  de,
  ar,
};

import type { Locale } from '@/config/site';

import en from './errors/en.json';
import fa from './errors/fa.json';

export type ErrorLabels = typeof en;

const errorLabels: Record<Locale, ErrorLabels> = {
  en,
  fa,
};

export const getErrorLabels = (locale: Locale): ErrorLabels => errorLabels[locale];

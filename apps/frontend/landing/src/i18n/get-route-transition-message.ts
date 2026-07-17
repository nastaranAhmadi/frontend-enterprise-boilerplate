import type { Locale } from '@/config/site';

import en from './route-transition/en.json';
import fa from './route-transition/fa.json';

export type RouteTransitionCopy = typeof en;

const routeTransitionCopy: Record<Locale, RouteTransitionCopy> = {
  en,
  fa,
};

export const getRouteTransitionMessage = (locale: Locale): string =>
  routeTransitionCopy[locale].message;

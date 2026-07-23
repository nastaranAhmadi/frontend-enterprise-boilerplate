import type { UIMatch } from 'react-router-dom';

import type { Translator } from '@/i18n/t';

export type TranslationKey = Parameters<Translator>[0];

export type AdminRouteHandle = {
  titleKey: TranslationKey;
  subtitleKey?: TranslationKey;
};

export const isAdminRouteHandle = (value: unknown): value is AdminRouteHandle => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return 'titleKey' in value && typeof (value as AdminRouteHandle).titleKey === 'string';
};

export const getAdminRouteHandle = (matches: UIMatch[]): AdminRouteHandle | undefined => {
  for (const match of [...matches].reverse()) {
    if (isAdminRouteHandle(match.handle)) {
      return match.handle;
    }
  }

  return undefined;
};

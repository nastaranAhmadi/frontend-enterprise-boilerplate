import { useMemo } from 'react';

import { createT, type Translator } from '@/i18n/t';
import { useLocalePreference } from '@/lib/i18n/locale-preference-context';

export const useT = (): Translator => {
  const { locale } = useLocalePreference();

  return useMemo(() => createT(locale), [locale]);
};

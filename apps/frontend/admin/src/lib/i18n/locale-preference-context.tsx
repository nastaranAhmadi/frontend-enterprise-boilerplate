import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { type Locale, persistLocale, readStoredLocale } from '@/config/site';

export type LocalePreferenceContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocalePreferenceContext = createContext<LocalePreferenceContextValue | null>(null);

type LocalePreferenceProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export const LocalePreferenceProvider = ({
  children,
  initialLocale = readStoredLocale(),
}: LocalePreferenceProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const value = useMemo<LocalePreferenceContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
    }),
    [locale],
  );

  return (
    <LocalePreferenceContext.Provider value={value}>{children}</LocalePreferenceContext.Provider>
  );
};

export const useLocalePreference = (): LocalePreferenceContextValue => {
  const context = useContext(LocalePreferenceContext);

  if (!context) {
    throw new Error('useLocalePreference must be used within LocalePreferenceProvider.');
  }

  return context;
};

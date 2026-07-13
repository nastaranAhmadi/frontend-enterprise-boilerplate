'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import type { ThemePreference } from '@/config/theme';
import {
  getNextThemePreference,
  persistThemePreference,
} from '@/lib/theme/persist-theme-preference';

type ThemePreferenceContextValue = {
  theme: ThemePreference;
  toggleTheme: () => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

type ThemePreferenceProviderProps = {
  children: ReactNode;
  initialTheme: ThemePreference;
};

export const ThemePreferenceProvider = ({
  children,
  initialTheme,
}: ThemePreferenceProviderProps) => {
  const [theme, setTheme] = useState<ThemePreference>(initialTheme);

  useEffect(() => {
    persistThemePreference(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((current) => getNextThemePreference(current));
      },
    }),
    [theme],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>
  );
};

export const useThemePreference = (): ThemePreferenceContextValue => {
  const context = useContext(ThemePreferenceContext);

  if (!context) {
    throw new Error('useThemePreference must be used within ThemePreferenceProvider.');
  }

  return context;
};

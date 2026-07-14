import { createContext, useContext } from 'react';

import type { DesignSystemLocale, TextDirection } from '../locale/locale';

export type DesignSystemTheme = 'light' | 'dark';

export type DesignSystemContextValue = {
  theme: DesignSystemTheme;
  locale: DesignSystemLocale;
  dir: TextDirection;
  lang: string;
};

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

export const DesignSystemContextProvider = DesignSystemContext.Provider;

export const useDesignSystem = (): DesignSystemContextValue => {
  const context = useContext(DesignSystemContext);

  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider.');
  }

  return context;
};

export const useOptionalDesignSystem = (): DesignSystemContextValue | null =>
  useContext(DesignSystemContext);

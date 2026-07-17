'use client';

import { DesignSystemProvider } from '@enterprise/ui/providers';
import type { ReactNode } from 'react';

import type { Locale } from '@/config/site';
import type { ThemePreference } from '@/config/theme';
import { ThemePreferenceProvider, useThemePreference } from '@/lib/theme/theme-preference-context';
import { QueryProvider } from '@/providers/query-provider';
import { NextRouteTransitionProvider } from '@/providers/route-transition-provider';

type AppProvidersProps = {
  children: ReactNode;
  initialTheme: ThemePreference;
  locale: Locale;
  routeTransitionMessage: string;
};

const DesignSystemBridge = ({ children, locale }: { children: ReactNode; locale: Locale }) => {
  const { theme } = useThemePreference();

  return (
    <DesignSystemProvider locale={locale} theme={theme}>
      {children}
    </DesignSystemProvider>
  );
};

export const AppProviders = ({
  children,
  locale,
  initialTheme,
  routeTransitionMessage,
}: AppProvidersProps) => (
  <ThemePreferenceProvider initialTheme={initialTheme}>
    <QueryProvider>
      <DesignSystemBridge locale={locale}>
        <NextRouteTransitionProvider message={routeTransitionMessage}>
          {children}
        </NextRouteTransitionProvider>
      </DesignSystemBridge>
    </QueryProvider>
  </ThemePreferenceProvider>
);

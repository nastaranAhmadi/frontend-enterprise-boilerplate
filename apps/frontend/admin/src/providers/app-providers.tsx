import { DesignSystemProvider, RouteTransitionProvider } from '@enterprise/ui/providers';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { readStoredThemePreference } from '@/config/theme';
import { LocalePreferenceProvider } from '@/lib/i18n/locale-preference-context';
import { useLocalePreference } from '@/lib/i18n/locale-preference-context';
import { useT } from '@/lib/i18n/use-t';
import { SidebarPreferenceProvider } from '@/lib/sidebar/sidebar-preference-context';
import { ThemePreferenceProvider, useThemePreference } from '@/lib/theme/theme-preference-context';

type AppProvidersProps = {
  children: ReactNode;
};

const DesignSystemBridge = ({ children }: { children: ReactNode }) => {
  const { theme } = useThemePreference();
  const { locale } = useLocalePreference();

  return (
    <DesignSystemProvider locale={locale} theme={theme}>
      {children}
    </DesignSystemProvider>
  );
};

const RouteTransitionBridge = ({ children }: { children: ReactNode }) => {
  const pathname = useLocation().pathname;
  const t = useT();

  return (
    <RouteTransitionProvider
      pathname={pathname}
      message={t('routeTransition.message')}
      enabled
      blurBackdrop
      minDuration={600}
    >
      {children}
    </RouteTransitionProvider>
  );
};

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemePreferenceProvider initialTheme={readStoredThemePreference()}>
    <LocalePreferenceProvider>
      <SidebarPreferenceProvider>
        <DesignSystemBridge>
          <RouteTransitionBridge>{children}</RouteTransitionBridge>
        </DesignSystemBridge>
      </SidebarPreferenceProvider>
    </LocalePreferenceProvider>
  </ThemePreferenceProvider>
);

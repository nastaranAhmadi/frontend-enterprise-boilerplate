import { RouteTransitionProvider } from '@enterprise/ui/providers';
import type { ReactNode } from 'react';

export type DashboardAppProvidersProps = {
  blurBackdrop?: boolean;
  children: ReactNode;
  enabled?: boolean;
  message: string;
  minDuration?: number;
  pathname: string;
};

export const DashboardAppProviders = ({
  blurBackdrop = true,
  children,
  enabled = true,
  message,
  minDuration,
  pathname,
}: DashboardAppProvidersProps) => (
  <RouteTransitionProvider
    pathname={pathname}
    message={message}
    enabled={enabled}
    blurBackdrop={blurBackdrop}
    minDuration={minDuration}
  >
    {children}
  </RouteTransitionProvider>
);

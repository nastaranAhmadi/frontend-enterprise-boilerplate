import { RouteTransitionProvider } from '@enterprise/ui/providers';
import type { ReactNode } from 'react';

export type AdminAppProvidersProps = {
  blurBackdrop?: boolean;
  children: ReactNode;
  enabled?: boolean;
  message: string;
  minDuration?: number;
  pathname: string;
};

export const AdminAppProviders = ({
  blurBackdrop = true,
  children,
  enabled = true,
  message,
  minDuration,
  pathname,
}: AdminAppProvidersProps) => (
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

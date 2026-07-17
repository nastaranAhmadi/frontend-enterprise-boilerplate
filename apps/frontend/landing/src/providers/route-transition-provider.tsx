'use client';

import {
  RouteTransitionProvider,
  type RouteTransitionProviderProps,
} from '@enterprise/ui/route-transition';
import { usePathname } from 'next/navigation';

export type NextRouteTransitionProviderProps = Omit<RouteTransitionProviderProps, 'pathname'>;

export const NextRouteTransitionProvider = ({
  blurBackdrop = true,
  children,
  direction = 'bottom',
  enabled = true,
  message,
  minDuration,
}: NextRouteTransitionProviderProps) => {
  const pathname = usePathname();

  return (
    <RouteTransitionProvider
      pathname={pathname}
      message={message}
      direction={direction}
      enabled={enabled}
      blurBackdrop={blurBackdrop}
      minDuration={minDuration}
    >
      {children}
    </RouteTransitionProvider>
  );
};

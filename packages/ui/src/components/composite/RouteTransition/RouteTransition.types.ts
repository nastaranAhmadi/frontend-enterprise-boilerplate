import type { ReactNode } from 'react';

import type { Size } from '../../../types';
import type { LoadingVariant } from '../../base/Loading';

export type RouteTransitionDirection = 'bottom' | 'top' | 'left' | 'right';

export interface RouteTransitionOverlayProps {
  blurBackdrop?: boolean;
  className?: string;
  direction?: RouteTransitionDirection;
  loadingSize?: Size;
  loadingVariant?: LoadingVariant;
  message: string;
  visible: boolean;
}

export interface RouteTransitionProviderProps {
  blurBackdrop?: boolean;
  children: ReactNode;
  className?: string;
  direction?: RouteTransitionDirection;
  enabled?: boolean;
  loadingSize?: Size;
  loadingVariant?: LoadingVariant;
  message: string;
  minDuration?: number;
  pathname: string;
}

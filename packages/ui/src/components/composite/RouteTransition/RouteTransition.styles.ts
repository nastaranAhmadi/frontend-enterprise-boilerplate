import type {
  RouteTransitionDirection,
  RouteTransitionOverlayProps,
} from './RouteTransition.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const ROUTE_TRANSITION_ROOT_CLASS =
  'fixed inset-0 z-[var(--z-route-transition)] isolate flex min-h-dvh w-full items-center justify-center overflow-hidden px-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-normal';

export const ROUTE_TRANSITION_BACKDROP_CLASS = 'pointer-events-none absolute inset-0 bg-background';

export const ROUTE_TRANSITION_SCRIM_BASE_CLASS =
  'pointer-events-none absolute inset-0 bg-background/80';

export const ROUTE_TRANSITION_CONTENT_CLASS =
  'relative z-10 flex flex-col items-center gap-md text-center motion-reduce:transform-none';

export const ROUTE_TRANSITION_MESSAGE_CLASS =
  'max-w-md font-sans text-lg font-medium tracking-tight text-foreground motion-reduce:opacity-100';

const HIDDEN_DIRECTION_CLASS_MAP: Record<RouteTransitionDirection, string> = {
  bottom: 'pointer-events-none translate-y-full opacity-0',
  top: 'pointer-events-none -translate-y-full opacity-0',
  left: 'pointer-events-none -translate-x-full opacity-0',
  right: 'pointer-events-none translate-x-full opacity-0',
};

const VISIBLE_CLASS = 'pointer-events-auto translate-x-0 translate-y-0 opacity-100';

export const normalizeRouteTransitionDirection = (
  direction: RouteTransitionDirection | undefined,
): RouteTransitionDirection => {
  if (direction === 'top' || direction === 'left' || direction === 'right') {
    return direction;
  }

  return 'bottom';
};

export const getRouteTransitionScrimClassName = ({
  blurBackdrop,
}: Pick<RouteTransitionOverlayProps, 'blurBackdrop'>): string =>
  joinClassNames(
    ROUTE_TRANSITION_SCRIM_BASE_CLASS,
    blurBackdrop ? 'backdrop-blur-md' : 'opacity-0',
  );

export const getRouteTransitionRootClassName = ({
  visible,
  direction,
  className,
}: Pick<RouteTransitionOverlayProps, 'visible' | 'direction' | 'className'>): string =>
  joinClassNames(
    ROUTE_TRANSITION_ROOT_CLASS,
    visible
      ? VISIBLE_CLASS
      : HIDDEN_DIRECTION_CLASS_MAP[normalizeRouteTransitionDirection(direction)],
    className,
  );

export const getRouteTransitionContentClassName = ({
  visible,
  direction,
}: Pick<RouteTransitionOverlayProps, 'visible' | 'direction'>): string => {
  const resolvedDirection = normalizeRouteTransitionDirection(direction);

  const hiddenContentClassMap: Record<RouteTransitionDirection, string> = {
    bottom: 'translate-y-8 opacity-0',
    top: '-translate-y-8 opacity-0',
    left: '-translate-x-8 opacity-0',
    right: 'translate-x-8 opacity-0',
  };

  return joinClassNames(
    ROUTE_TRANSITION_CONTENT_CLASS,
    'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-normal',
    visible
      ? 'translate-x-0 translate-y-0 opacity-100 delay-75'
      : hiddenContentClassMap[resolvedDirection],
  );
};

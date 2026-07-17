import { useRouteTransition } from '../../../hooks/useRouteTransition';
import type { RouteTransitionProviderProps } from './RouteTransition.types';
import { RouteTransitionOverlay } from './RouteTransitionOverlay';

export const RouteTransitionProvider = function RouteTransitionProvider(
  props: RouteTransitionProviderProps,
) {
  const {
    blurBackdrop = false,
    children,
    className,
    direction,
    enabled = true,
    loadingSize,
    loadingVariant,
    message,
    minDuration,
    pathname,
  } = props;
  const visible = useRouteTransition(pathname, { enabled, minDuration });

  return (
    <>
      {children}
      {enabled ? (
        <RouteTransitionOverlay
          visible={visible}
          message={message}
          direction={direction}
          loadingVariant={loadingVariant}
          loadingSize={loadingSize}
          blurBackdrop={blurBackdrop}
          className={className}
        />
      ) : null}
    </>
  );
};

RouteTransitionProvider.displayName = 'RouteTransitionProvider';

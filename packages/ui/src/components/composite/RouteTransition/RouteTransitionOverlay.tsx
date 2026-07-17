import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Loading } from '../../base/Loading';
import {
  getRouteTransitionContentClassName,
  getRouteTransitionRootClassName,
  getRouteTransitionScrimClassName,
  ROUTE_TRANSITION_BACKDROP_CLASS,
  ROUTE_TRANSITION_MESSAGE_CLASS,
} from './RouteTransition.styles';
import type { RouteTransitionOverlayProps } from './RouteTransition.types';

const ROUTE_TRANSITION_BODY_ATTR = 'data-route-transition-active';

const syncRouteTransitionBodyLock = (visible: boolean): void => {
  if (typeof document === 'undefined') {
    return;
  }

  if (visible) {
    document.body.setAttribute(ROUTE_TRANSITION_BODY_ATTR, 'true');
    return;
  }

  document.body.removeAttribute(ROUTE_TRANSITION_BODY_ATTR);
};

export const RouteTransitionOverlay = function RouteTransitionOverlay(
  props: RouteTransitionOverlayProps,
) {
  const {
    blurBackdrop = false,
    className,
    direction,
    loadingSize = 'large',
    loadingVariant = 'dots-bounce',
    message,
    visible,
  } = props;

  useEffect(() => {
    syncRouteTransitionBodyLock(visible);
    return () => {
      syncRouteTransitionBodyLock(false);
    };
  }, [visible]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      aria-busy={visible}
      aria-hidden={!visible}
      className={getRouteTransitionRootClassName({ visible, direction, className })}
    >
      <div aria-hidden="true" className={ROUTE_TRANSITION_BACKDROP_CLASS} />
      <div aria-hidden="true" className={getRouteTransitionScrimClassName({ blurBackdrop })} />
      <div className={getRouteTransitionContentClassName({ visible, direction })}>
        <Loading label={message} size={loadingSize} variant={loadingVariant} />
        <p aria-hidden="true" className={ROUTE_TRANSITION_MESSAGE_CLASS}>
          {message}
        </p>
      </div>
    </div>,
    document.body,
  );
};

RouteTransitionOverlay.displayName = 'RouteTransitionOverlay';

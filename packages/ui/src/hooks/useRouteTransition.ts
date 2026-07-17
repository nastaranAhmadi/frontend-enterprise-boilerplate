import { useCallback, useEffect, useRef, useState } from 'react';

export type UseRouteTransitionOptions = {
  /** When false, skips listeners and always returns false. */
  enabled?: boolean;
  /** Minimum time the overlay stays visible once shown. */
  minDuration?: number;
};

const isModifiedClick = (event: MouseEvent): boolean =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const isInternalNavigationAnchor = (anchor: HTMLAnchorElement): boolean => {
  if (anchor.target === '_blank' || anchor.hasAttribute('download')) {
    return false;
  }

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  try {
    const nextUrl = new URL(anchor.href, window.location.href);
    return nextUrl.origin === window.location.origin;
  } catch {
    return false;
  }
};

export const useRouteTransition = (
  pathname: string,
  { enabled = true, minDuration = 600 }: UseRouteTransitionOptions = {},
): boolean => {
  const [visible, setVisible] = useState(false);
  const previousPathRef = useRef(pathname);
  const hideTimerRef = useRef<number | null>(null);
  const shownAtRef = useRef(0);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const showTransition = useCallback(() => {
    shownAtRef.current = Date.now();
    setVisible(true);
  }, []);

  const hideTransition = useCallback(() => {
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, minDuration - elapsed);

    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = null;
    }, remaining);
  }, [clearHideTimer, minDuration]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || !isInternalNavigationAnchor(anchor)) {
        return;
      }

      const nextPath = new URL(anchor.href, window.location.href).pathname;
      if (nextPath !== window.location.pathname) {
        showTransition();
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [enabled, showTransition]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    if (previousPathRef.current === pathname) {
      return undefined;
    }

    previousPathRef.current = pathname;
    showTransition();
    hideTransition();

    return clearHideTimer;
  }, [clearHideTimer, enabled, hideTransition, pathname, showTransition]);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      clearHideTimer();
    }
  }, [clearHideTimer, enabled]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  return enabled ? visible : false;
};

import { type RefObject, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

export interface UseOverlayBehaviorOptions {
  open: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  panelRef: RefObject<HTMLElement | null>;
  lockBodyScroll?: boolean;
}

export const useOverlayBehavior = ({
  open,
  onClose,
  closeOnEscape = true,
  panelRef,
  lockBodyScroll = true,
}: UseOverlayBehaviorOptions): void => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusable = panelRef.current ? getFocusableElements(panelRef.current) : [];
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const elements = getFocusableElements(panelRef.current);
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = lockBodyScroll ? document.body.style.overflow : undefined;
    if (lockBodyScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (lockBodyScroll && previousOverflow !== undefined) {
        document.body.style.overflow = previousOverflow;
      }
      previousFocusRef.current?.focus();
    };
  }, [closeOnEscape, lockBodyScroll, onClose, open, panelRef]);
};

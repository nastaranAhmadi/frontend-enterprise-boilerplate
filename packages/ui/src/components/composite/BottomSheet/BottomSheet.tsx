import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOverlayBehavior } from '../../../hooks/useOverlayBehavior';
import {
  BOTTOM_SHEET_BACKDROP_BUTTON_CLASS,
  BOTTOM_SHEET_BACKDROP_SCRIM_CLASS,
  BOTTOM_SHEET_DESCRIPTION_CLASS,
  BOTTOM_SHEET_FOOTER_CLASS,
  BOTTOM_SHEET_HANDLE_CLASS,
  BOTTOM_SHEET_HANDLE_WRAP_CLASS,
  BOTTOM_SHEET_HEADER_CLASS,
  BOTTOM_SHEET_TITLE_CLASS,
  getBottomSheetBackdropClassName,
  getBottomSheetBodyClassName,
  getBottomSheetPanelClassName,
} from './BottomSheet.styles';
import type { BottomSheetProps } from './BottomSheet.types';

export const BottomSheet = function BottomSheet(props: BottomSheetProps) {
  const {
    open,
    onClose,
    title,
    description,
    children,
    footer,
    className,
    contentClassName,
    size,
    showHandle = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    ...bottomSheetProps
  } = props;

  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayBehavior({ open, onClose, closeOnEscape, panelRef });

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={getBottomSheetBackdropClassName()}>
      <div className={BOTTOM_SHEET_BACKDROP_SCRIM_CLASS} aria-hidden="true" />
      {closeOnBackdropClick ? (
        <button
          type="button"
          aria-label="Close bottom sheet"
          className={BOTTOM_SHEET_BACKDROP_BUTTON_CLASS}
          onClick={onClose}
          tabIndex={-1}
        />
      ) : null}
      <div
        {...bottomSheetProps}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={getBottomSheetPanelClassName({ size, className })}
      >
        {showHandle ? (
          <div className={BOTTOM_SHEET_HANDLE_WRAP_CLASS} aria-hidden="true">
            <span className={BOTTOM_SHEET_HANDLE_CLASS} />
          </div>
        ) : null}

        {title || description ? (
          <div className={BOTTOM_SHEET_HEADER_CLASS}>
            {title ? (
              <h2 id={titleId} className={BOTTOM_SHEET_TITLE_CLASS}>
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id={descriptionId} className={BOTTOM_SHEET_DESCRIPTION_CLASS}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div className={getBottomSheetBodyClassName({ className: contentClassName })}>
            {children}
          </div>
        ) : null}

        {footer ? <div className={BOTTOM_SHEET_FOOTER_CLASS}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};

BottomSheet.displayName = 'BottomSheet';

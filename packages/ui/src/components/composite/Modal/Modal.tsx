import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOverlayBehavior } from '../../../hooks/useOverlayBehavior';
import {
  getModalBackdropClassName,
  getModalBodyClassName,
  getModalPanelClassName,
  MODAL_BACKDROP_BUTTON_CLASS,
  MODAL_BACKDROP_SCRIM_CLASS,
  MODAL_DESCRIPTION_CLASS,
  MODAL_FOOTER_CLASS,
  MODAL_HEADER_CLASS,
  MODAL_TITLE_CLASS,
} from './Modal.styles';
import type { ModalProps } from './Modal.types';

export const Modal = function Modal(props: ModalProps) {
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
    closeOnBackdropClick = true,
    closeOnEscape = true,
    ...modalProps
  } = props;

  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useOverlayBehavior({ open, onClose, closeOnEscape, panelRef });

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className={getModalBackdropClassName()}>
      <div className={MODAL_BACKDROP_SCRIM_CLASS} aria-hidden="true" />
      {closeOnBackdropClick ? (
        <button
          type="button"
          aria-label="Close dialog"
          className={MODAL_BACKDROP_BUTTON_CLASS}
          onClick={onClose}
          tabIndex={-1}
        />
      ) : null}
      <div
        {...modalProps}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={getModalPanelClassName({ size, className })}
      >
        {title || description ? (
          <div className={MODAL_HEADER_CLASS}>
            {title ? (
              <h2 id={titleId} className={MODAL_TITLE_CLASS}>
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id={descriptionId} className={MODAL_DESCRIPTION_CLASS}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div className={getModalBodyClassName({ className: contentClassName })}>{children}</div>
        ) : null}

        {footer ? <div className={MODAL_FOOTER_CLASS}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
};

Modal.displayName = 'Modal';

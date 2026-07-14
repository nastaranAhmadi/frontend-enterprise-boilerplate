import type { ModalProps, ModalSize } from './Modal.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: ModalProps['size']): ModalSize => {
  if (size === 'small' || size === 'large' || size === 'full') return size;
  return 'medium';
};

const SIZE_CLASS_MAP: Record<ModalSize, string> = {
  small: 'w-full max-w-[calc(100%-2rem)] sm:max-w-sm',
  medium: 'w-full max-w-[calc(100%-2rem)] sm:max-w-md',
  large: 'w-full max-w-[calc(100%-2rem)] sm:max-w-2xl',
  full: 'w-full max-w-[calc(100%-2rem)]',
};

export const MODAL_BACKDROP_CLASS =
  'fixed inset-0 z-modal flex items-center justify-center p-sm sm:p-md';

export const MODAL_BACKDROP_SCRIM_CLASS = 'absolute inset-0 bg-foreground/40';

export const MODAL_BACKDROP_BUTTON_CLASS =
  'absolute inset-0 cursor-default border-0 bg-transparent p-0';

export const MODAL_PANEL_BASE_CLASS =
  'relative z-10 flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden rounded-md border border-border bg-background shadow-lg';

export const MODAL_HEADER_CLASS = 'flex flex-col gap-1 border-b border-border px-lg py-md';
export const MODAL_TITLE_CLASS = 'font-sans text-lg font-medium text-foreground';
export const MODAL_DESCRIPTION_CLASS = 'font-sans text-sm text-muted';
export const MODAL_BODY_CLASS = 'overflow-y-auto px-lg py-md text-foreground';
export const MODAL_FOOTER_CLASS =
  'flex flex-wrap items-center justify-end gap-sm border-t border-border px-lg py-md';

export const getModalBackdropClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(MODAL_BACKDROP_CLASS, className);

export const getModalPanelClassName = ({
  size,
  className,
}: Pick<ModalProps, 'size'> & { className?: string }): string =>
  joinClassNames(MODAL_PANEL_BASE_CLASS, SIZE_CLASS_MAP[normalizeSize(size)], className);

export const getModalBodyClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(MODAL_BODY_CLASS, className);

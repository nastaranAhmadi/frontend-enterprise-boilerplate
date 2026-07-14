import type { BottomSheetProps, BottomSheetSize } from './BottomSheet.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: BottomSheetProps['size']): BottomSheetSize => {
  if (size === 'small' || size === 'medium' || size === 'large' || size === 'auto') return size;
  return 'medium';
};

const SIZE_CLASS_MAP: Record<BottomSheetSize, string> = {
  auto: 'max-h-[85vh]',
  small: 'max-h-[35vh]',
  medium: 'max-h-[55vh]',
  large: 'max-h-[75vh]',
};

export const BOTTOM_SHEET_BACKDROP_CLASS = 'fixed inset-0 z-modal flex items-end justify-center';

export const BOTTOM_SHEET_BACKDROP_SCRIM_CLASS = 'absolute inset-0 bg-overlay';

export const BOTTOM_SHEET_BACKDROP_BUTTON_CLASS =
  'absolute inset-0 cursor-default border-0 bg-transparent p-0';

export const BOTTOM_SHEET_PANEL_BASE_CLASS =
  'relative z-10 flex w-full flex-col overflow-hidden rounded-t-lg border border-border bg-surface-elevated shadow-lg';

export const BOTTOM_SHEET_HANDLE_WRAP_CLASS = 'flex justify-center px-lg pt-sm';
export const BOTTOM_SHEET_HANDLE_CLASS = 'h-1 w-12 rounded-full bg-border';
export const BOTTOM_SHEET_HEADER_CLASS = 'flex flex-col gap-1 border-b border-border px-lg py-md';
export const BOTTOM_SHEET_TITLE_CLASS = 'font-sans text-lg font-medium text-foreground';
export const BOTTOM_SHEET_DESCRIPTION_CLASS = 'font-sans text-sm text-muted-foreground';
export const BOTTOM_SHEET_BODY_CLASS = 'overflow-y-auto px-lg py-md text-foreground';
export const BOTTOM_SHEET_FOOTER_CLASS =
  'flex items-center justify-end gap-sm border-t border-border px-lg py-md';

export const getBottomSheetBackdropClassName = ({
  className,
}: { className?: string } = {}): string => joinClassNames(BOTTOM_SHEET_BACKDROP_CLASS, className);

export const getBottomSheetPanelClassName = ({
  size,
  className,
}: Pick<BottomSheetProps, 'size'> & { className?: string }): string =>
  joinClassNames(BOTTOM_SHEET_PANEL_BASE_CLASS, SIZE_CLASS_MAP[normalizeSize(size)], className);

export const getBottomSheetBodyClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(BOTTOM_SHEET_BODY_CLASS, className);

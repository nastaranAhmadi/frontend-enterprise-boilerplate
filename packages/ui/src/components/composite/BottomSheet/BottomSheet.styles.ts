import type { BottomSheetProps, BottomSheetSize } from './BottomSheet.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: BottomSheetProps['size']): BottomSheetSize => {
  if (size === 'small' || size === 'medium' || size === 'large' || size === 'auto') return size;
  return 'medium';
};

const SIZE_CLASS_MAP: Record<BottomSheetSize, string> = {
  auto: 'max-h-[min(92dvh,92%)]',
  small: 'max-h-[min(40dvh,40%)]',
  medium: 'max-h-[min(60dvh,60%)]',
  large: 'max-h-[min(92dvh,92%)]',
};

export const BOTTOM_SHEET_BACKDROP_CLASS = 'fixed inset-0 z-modal flex items-end justify-stretch';

export const BOTTOM_SHEET_BACKDROP_SCRIM_CLASS =
  'absolute inset-0 bg-overlay animate-backdrop-in motion-reduce:animate-none';

export const BOTTOM_SHEET_BACKDROP_BUTTON_CLASS =
  'absolute inset-0 cursor-default border-0 bg-transparent p-0';

export const BOTTOM_SHEET_PANEL_BASE_CLASS =
  'relative z-10 flex w-full max-w-none flex-col overflow-hidden rounded-t-2xl border border-border border-b-0 bg-surface-elevated shadow-lg animate-bottom-sheet-up motion-reduce:animate-none';

export const BOTTOM_SHEET_HANDLE_WRAP_CLASS = 'flex shrink-0 justify-center px-lg pt-sm';
export const BOTTOM_SHEET_HANDLE_CLASS = 'h-1 w-12 rounded-full bg-border';
export const BOTTOM_SHEET_HEADER_CLASS =
  'flex shrink-0 flex-col gap-1 border-b border-border px-md py-md sm:px-lg';
export const BOTTOM_SHEET_TITLE_CLASS = 'font-sans text-lg font-medium text-foreground';
export const BOTTOM_SHEET_DESCRIPTION_CLASS = 'font-sans text-sm text-muted-foreground';
export const BOTTOM_SHEET_BODY_CLASS =
  'min-h-0 flex-1 overflow-y-auto overscroll-contain px-md py-md text-foreground sm:px-lg';
export const BOTTOM_SHEET_FOOTER_CLASS =
  'flex w-full shrink-0 flex-col gap-sm border-t border-border px-md py-md pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-lg';

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

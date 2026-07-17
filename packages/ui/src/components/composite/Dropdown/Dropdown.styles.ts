import type { Size } from '../../../types';
import type { DropdownAlign, DropdownItemProps, DropdownProps } from './Dropdown.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: DropdownProps['size']): Size => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const normalizeAlign = (align: DropdownProps['align']): DropdownAlign => {
  if (align === 'end' || align === 'center') return align;
  return 'start';
};

const MENU_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'min-w-[10rem] py-xs text-sm',
  medium: 'min-w-[12rem] py-sm text-md',
  large: 'min-w-[14rem] py-md text-lg',
};

const ITEM_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'px-sm py-xs text-sm',
  medium: 'px-md py-sm text-md',
  large: 'px-lg py-md text-lg',
};

export const DROPDOWN_ROOT_RELATIVE_CLASS = 'relative inline-flex';
export const DROPDOWN_ROOT_STATIC_CLASS = 'static inline-flex';

/** Outer shell: positioning + hover bridge (invisible padding keeps pointer connected). */
export const DROPDOWN_MENU_SHELL_CLASS = 'absolute top-full z-dropdown pt-sm focus:outline-none';

export const DROPDOWN_MENU_PANEL_CLASS =
  'flex max-h-[min(80vh,40rem)] origin-top flex-col overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-lg focus:outline-none animate-dropdown-in motion-reduce:animate-none';

const ALIGN_CLASS_MAP: Record<DropdownAlign, string> = {
  start: 'start-0',
  end: 'end-0',
  center: 'start-1/2 -translate-x-1/2',
};

export const DROPDOWN_ITEM_BASE_CLASS =
  'flex w-full items-center text-start font-sans text-foreground transition-colors duration-normal hover:bg-muted focus-visible:outline-none focus-visible:bg-muted disabled:cursor-not-allowed disabled:opacity-50';

export const DROPDOWN_ITEM_DESTRUCTIVE_CLASS =
  'text-error hover:bg-error/10 focus-visible:bg-error/10';

export const getDropdownRootClassName = ({
  className,
  position = 'relative',
}: {
  className?: string;
  position?: DropdownProps['position'];
} = {}): string =>
  joinClassNames(
    position === 'static' ? DROPDOWN_ROOT_STATIC_CLASS : DROPDOWN_ROOT_RELATIVE_CLASS,
    className,
  );

export const getDropdownMenuShellClassName = ({ align }: Pick<DropdownProps, 'align'>): string =>
  joinClassNames(DROPDOWN_MENU_SHELL_CLASS, ALIGN_CLASS_MAP[normalizeAlign(align)]);

export const getDropdownMenuClassName = ({
  size,
  className,
}: Pick<DropdownProps, 'size'> & { className?: string }): string =>
  joinClassNames(DROPDOWN_MENU_PANEL_CLASS, MENU_SIZE_CLASS_MAP[normalizeSize(size)], className);

export const getDropdownItemClassName = ({
  size,
  destructive,
  className,
}: Pick<DropdownItemProps, 'destructive'> & { size?: Size; className?: string }): string =>
  joinClassNames(
    DROPDOWN_ITEM_BASE_CLASS,
    ITEM_SIZE_CLASS_MAP[normalizeSize(size)],
    destructive && DROPDOWN_ITEM_DESTRUCTIVE_CLASS,
    className,
  );

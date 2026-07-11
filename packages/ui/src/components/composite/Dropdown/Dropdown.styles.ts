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
  if (align === 'end') return 'end';
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

export const DROPDOWN_ROOT_CLASS = 'relative inline-flex';
export const DROPDOWN_MENU_BASE_CLASS =
  'absolute z-dropdown mt-xs overflow-hidden rounded-md border border-border bg-background shadow-md focus:outline-none';

const ALIGN_CLASS_MAP: Record<DropdownAlign, string> = {
  start: 'start-0',
  end: 'end-0',
};

export const DROPDOWN_ITEM_BASE_CLASS =
  'flex w-full items-center text-start font-sans text-foreground transition-colors duration-normal hover:bg-muted focus-visible:outline-none focus-visible:bg-muted disabled:cursor-not-allowed disabled:opacity-50';

export const DROPDOWN_ITEM_DESTRUCTIVE_CLASS =
  'text-error hover:bg-error/10 focus-visible:bg-error/10';

export const getDropdownRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(DROPDOWN_ROOT_CLASS, className);

export const getDropdownMenuClassName = ({
  size,
  align,
  className,
}: Pick<DropdownProps, 'size' | 'align'> & { className?: string }): string =>
  joinClassNames(
    DROPDOWN_MENU_BASE_CLASS,
    MENU_SIZE_CLASS_MAP[normalizeSize(size)],
    ALIGN_CLASS_MAP[normalizeAlign(align)],
    className,
  );

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

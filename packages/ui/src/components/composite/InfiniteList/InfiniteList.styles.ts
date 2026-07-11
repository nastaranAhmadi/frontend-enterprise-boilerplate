import type { Size } from '../../../types';
import type { InfiniteListProps } from './InfiniteList.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: InfiniteListProps<unknown>['size']): Size => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const TEXT_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const GAP_CLASS_MAP: Record<Size, string> = {
  small: 'gap-sm',
  medium: 'gap-md',
  large: 'gap-lg',
};

export const INFINITE_LIST_ROOT_CLASS = 'flex w-full flex-col font-sans text-foreground';
export const INFINITE_LIST_ITEMS_CLASS = 'flex w-full flex-col';
export const INFINITE_LIST_ITEM_CLASS = 'w-full';
export const INFINITE_LIST_STATUS_CLASS = 'flex flex-col items-center justify-center text-center';
export const INFINITE_LIST_EMPTY_CLASS = 'text-muted';
export const INFINITE_LIST_END_CLASS = 'text-muted';
export const INFINITE_LIST_ERROR_CLASS = 'text-error';
export const INFINITE_LIST_LOADER_CLASS = 'text-muted';
export const INFINITE_LIST_SENTINEL_CLASS = 'h-px w-full';

export const getInfiniteListRootClassName = ({
  size,
  className,
}: Pick<InfiniteListProps<unknown>, 'size'> & { className?: string }): string =>
  joinClassNames(INFINITE_LIST_ROOT_CLASS, GAP_CLASS_MAP[normalizeSize(size)], className);

export const getInfiniteListItemsClassName = ({
  size,
  className,
}: Pick<InfiniteListProps<unknown>, 'size'> & { className?: string }): string =>
  joinClassNames(INFINITE_LIST_ITEMS_CLASS, GAP_CLASS_MAP[normalizeSize(size)], className);

export const getInfiniteListItemClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(INFINITE_LIST_ITEM_CLASS, className);

export const getInfiniteListStatusClassName = ({
  size,
  tone = 'muted',
  className,
}: {
  size?: Size;
  tone?: 'muted' | 'error';
  className?: string;
}): string =>
  joinClassNames(
    INFINITE_LIST_STATUS_CLASS,
    TEXT_SIZE_CLASS_MAP[normalizeSize(size)],
    tone === 'error' ? INFINITE_LIST_ERROR_CLASS : INFINITE_LIST_EMPTY_CLASS,
    className,
  );

export const getInfiniteListLoaderClassName = ({
  size,
  className,
}: Pick<InfiniteListProps<unknown>, 'size'> & { className?: string }): string =>
  joinClassNames(
    INFINITE_LIST_STATUS_CLASS,
    INFINITE_LIST_LOADER_CLASS,
    TEXT_SIZE_CLASS_MAP[normalizeSize(size)],
    className,
  );

export const getInfiniteListEndClassName = ({
  size,
  className,
}: Pick<InfiniteListProps<unknown>, 'size'> & { className?: string }): string =>
  joinClassNames(
    INFINITE_LIST_STATUS_CLASS,
    INFINITE_LIST_END_CLASS,
    TEXT_SIZE_CLASS_MAP[normalizeSize(size)],
    className,
  );

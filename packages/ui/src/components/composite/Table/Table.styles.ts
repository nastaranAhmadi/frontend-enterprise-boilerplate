import type { Size } from '../../../types';
import type { TableLayout, TableProps } from './Table.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: TableProps['size']): Size => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const TEXT_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const CELL_PADDING_CLASS_MAP: Record<Size, string> = {
  small: 'px-sm py-xs',
  medium: 'px-md py-sm',
  large: 'px-lg py-md',
};

export const TABLE_BASE_CLASS = 'w-full border-collapse font-sans text-foreground';
export const TABLE_WRAPPER_CLASS = 'w-full overflow-x-auto';
export const TABLE_WRAPPER_STACKED_CLASS = [
  'max-md:overflow-x-visible',
  'max-md:[&_thead]:hidden',
  'max-md:[&_tbody_tr]:mb-sm max-md:[&_tbody_tr]:block max-md:[&_tbody_tr]:overflow-hidden max-md:[&_tbody_tr]:rounded-md max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-background max-md:[&_tbody_tr]:shadow-sm',
  'max-md:[&_td]:flex max-md:[&_td]:items-center max-md:[&_td]:justify-between max-md:[&_td]:gap-sm max-md:[&_td]:border-b max-md:[&_td]:border-border max-md:[&_td]:py-xs max-md:[&_td]:before:me-sm max-md:[&_td]:before:shrink-0 max-md:[&_td]:before:font-medium max-md:[&_td]:before:text-muted-foreground max-md:[&_td]:before:content-[attr(data-label)]',
  'max-md:[&_td:last-child]:border-b-0',
].join(' ');
export const TABLE_HEADER_CLASS = 'bg-muted text-start font-medium text-foreground';
export const TABLE_BODY_CLASS = '';
export const TABLE_FOOTER_CLASS = 'bg-muted font-medium';
export const TABLE_ROW_BASE_CLASS = 'border-b border-border';
export const TABLE_ROW_SELECTED_CLASS = 'bg-muted';
export const TABLE_ROW_STRIPED_CLASS = 'even:bg-muted/50';
export const TABLE_CELL_CLASS = 'text-start align-middle';
export const TABLE_BORDERED_CLASS = 'border border-border';

export const getTableWrapperClassName = ({
  className,
  layout = 'scroll',
}: { className?: string; layout?: TableLayout } = {}): string =>
  joinClassNames(
    TABLE_WRAPPER_CLASS,
    layout === 'stacked' && TABLE_WRAPPER_STACKED_CLASS,
    className,
  );

export const getTableClassName = ({
  size,
  bordered,
  className,
}: Pick<TableProps, 'size' | 'bordered'> & { className?: string }): string =>
  joinClassNames(
    TABLE_BASE_CLASS,
    TEXT_SIZE_CLASS_MAP[normalizeSize(size)],
    bordered && TABLE_BORDERED_CLASS,
    className,
  );

export const TABLE_HEAD_SORTABLE_CLASS =
  'cursor-pointer select-none transition-colors duration-normal hover:bg-muted/80';

export const TABLE_HEAD_SORT_BUTTON_CLASS =
  'inline-flex w-full items-center gap-xs border-0 bg-transparent p-0 font-inherit text-inherit';

export const TABLE_HEAD_SORT_ICON_CLASS = 'inline-flex shrink-0 text-muted-foreground';

export const TABLE_SORT_ICON_STACK_CLASS = 'inline-flex shrink-0 flex-col gap-0';

export const TABLE_SORT_ICON_BASE_CLASS = 'h-3 w-3';

export const TABLE_SORT_ICON_ACTIVE_CLASS = 'text-primary';

export const TABLE_SORT_ICON_INACTIVE_CLASS = 'text-muted-foreground/50';

export const getTableSortIconClassName = ({ active }: { active: boolean }): string =>
  joinClassNames(
    TABLE_SORT_ICON_BASE_CLASS,
    active ? TABLE_SORT_ICON_ACTIVE_CLASS : TABLE_SORT_ICON_INACTIVE_CLASS,
  );

export const getTableHeadSortButtonClassName = ({
  align = 'start',
}: {
  align?: 'center' | 'end' | 'start';
} = {}): string =>
  joinClassNames(
    TABLE_HEAD_SORT_BUTTON_CLASS,
    align === 'end' && 'justify-end',
    align === 'center' && 'justify-center',
    align === 'start' && 'justify-start',
  );

export const TABLE_ALIGN_CLASS_MAP = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
} as const;

export const getTableHeadClassName = ({
  align = 'start',
  className,
  size,
  sortable,
}: {
  align?: 'center' | 'end' | 'start';
  className?: string;
  size?: Size;
  sortable?: boolean;
} = {}): string =>
  joinClassNames(
    TABLE_HEADER_CLASS,
    CELL_PADDING_CLASS_MAP[normalizeSize(size)],
    TABLE_ALIGN_CLASS_MAP[align],
    sortable && TABLE_HEAD_SORTABLE_CLASS,
    className,
  );

export const getTableCellClassName = ({
  align = 'start',
  className,
  size,
}: {
  align?: 'center' | 'end' | 'start';
  className?: string;
  size?: Size;
} = {}): string =>
  joinClassNames(
    TABLE_CELL_CLASS,
    CELL_PADDING_CLASS_MAP[normalizeSize(size)],
    TABLE_ALIGN_CLASS_MAP[align],
    className,
  );

export const getTableRowClassName = ({
  striped,
  selected,
  className,
}: {
  striped?: boolean;
  selected?: boolean;
  className?: string;
}): string =>
  joinClassNames(
    TABLE_ROW_BASE_CLASS,
    striped && TABLE_ROW_STRIPED_CLASS,
    selected && TABLE_ROW_SELECTED_CLASS,
    className,
  );

export const getTableSectionClassName = ({
  baseClass,
  className,
}: {
  baseClass: string;
  className?: string;
}): string => joinClassNames(baseClass, className);

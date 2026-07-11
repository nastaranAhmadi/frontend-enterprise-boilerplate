import type { Size } from '../../../types';
import type { TableProps } from './Table.types';

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
export const TABLE_HEADER_CLASS = 'bg-muted text-start font-medium text-foreground';
export const TABLE_BODY_CLASS = '';
export const TABLE_FOOTER_CLASS = 'bg-muted font-medium';
export const TABLE_ROW_BASE_CLASS = 'border-b border-border';
export const TABLE_ROW_SELECTED_CLASS = 'bg-muted';
export const TABLE_ROW_STRIPED_CLASS = 'even:bg-muted/50';
export const TABLE_CELL_CLASS = 'text-start align-middle';
export const TABLE_BORDERED_CLASS = 'border border-border';

export const getTableWrapperClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(TABLE_WRAPPER_CLASS, className);

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

export const getTableHeadClassName = ({
  size,
  className,
}: { size?: Size; className?: string } = {}): string =>
  joinClassNames(TABLE_HEADER_CLASS, CELL_PADDING_CLASS_MAP[normalizeSize(size)], className);

export const getTableCellClassName = ({
  size,
  className,
}: { size?: Size; className?: string } = {}): string =>
  joinClassNames(TABLE_CELL_CLASS, CELL_PADDING_CLASS_MAP[normalizeSize(size)], className);

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

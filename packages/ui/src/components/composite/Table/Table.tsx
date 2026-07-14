import { createContext, forwardRef, useContext } from 'react';

import {
  getTableCellClassName,
  getTableClassName,
  getTableHeadClassName,
  getTableHeadSortButtonClassName,
  getTableRowClassName,
  getTableSectionClassName,
  getTableWrapperClassName,
  TABLE_BODY_CLASS,
  TABLE_FOOTER_CLASS,
  TABLE_HEADER_CLASS,
} from './Table.styles';
import type {
  TableBodyProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from './Table.types';
import { TableSortIcon } from './TableSortIcon';

interface TableContextValue {
  size?: TableProps['size'];
  striped?: boolean;
}

const TableContext = createContext<TableContextValue | null>(null);

const useTableContext = (): TableContextValue => useContext(TableContext) ?? {};

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(props, ref) {
  const {
    children,
    className,
    wrapperClassName,
    layout = 'scroll',
    size,
    striped,
    bordered,
    ...tableProps
  } = props;

  return (
    <div className={getTableWrapperClassName({ className: wrapperClassName, layout })}>
      <TableContext.Provider value={{ size, striped }}>
        <table
          {...tableProps}
          ref={ref}
          className={getTableClassName({ size, bordered, className })}
        >
          {children}
        </table>
      </TableContext.Provider>
    </div>
  );
});

Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader(props, ref) {
    const { children, className, ...headerProps } = props;

    return (
      <thead
        {...headerProps}
        ref={ref}
        className={getTableSectionClassName({ baseClass: TABLE_HEADER_CLASS, className })}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    const { children, className, ...bodyProps } = props;

    return (
      <tbody
        {...bodyProps}
        ref={ref}
        className={getTableSectionClassName({ baseClass: TABLE_BODY_CLASS, className })}
      >
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter(props, ref) {
    const { children, className, ...footerProps } = props;

    return (
      <tfoot
        {...footerProps}
        ref={ref}
        className={getTableSectionClassName({ baseClass: TABLE_FOOTER_CLASS, className })}
      >
        {children}
      </tfoot>
    );
  },
);

TableFooter.displayName = 'TableFooter';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow(props, ref) {
    const { children, className, selected, ...rowProps } = props;
    const { striped } = useTableContext();

    return (
      <tr
        {...rowProps}
        ref={ref}
        className={getTableRowClassName({ striped, selected, className })}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead(props, ref) {
    const {
      align = 'start',
      children,
      className,
      onSort,
      scope = 'col',
      sortable = false,
      sortDirection = null,
      style,
      ...headProps
    } = props;
    const { size } = useTableContext();

    const ariaSort =
      sortable && sortDirection
        ? sortDirection === 'asc'
          ? 'ascending'
          : 'descending'
        : sortable
          ? 'none'
          : undefined;

    const content = sortable ? (
      <button type="button" className={getTableHeadSortButtonClassName({ align })} onClick={onSort}>
        <span>{children}</span>
        <TableSortIcon direction={sortDirection} />
      </button>
    ) : (
      children
    );

    return (
      <th
        {...headProps}
        ref={ref}
        scope={scope}
        style={style}
        aria-sort={ariaSort}
        className={getTableHeadClassName({ size, align, sortable, className })}
      >
        {content}
      </th>
    );
  },
);

TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(props, ref) {
    const { align = 'start', children, className, label, style, ...cellProps } = props;
    const { size } = useTableContext();

    return (
      <td
        {...cellProps}
        ref={ref}
        data-label={label}
        style={style}
        className={getTableCellClassName({ size, align, className })}
      >
        {children}
      </td>
    );
  },
);

TableCell.displayName = 'TableCell';

import { getTableSortIconClassName, TABLE_SORT_ICON_STACK_CLASS } from './Table.styles';

export interface TableSortIconProps {
  direction?: 'asc' | 'desc' | null;
}

const ChevronUp = ({ active }: { active: boolean }) => (
  <svg
    aria-hidden="true"
    className={getTableSortIconClassName({ active })}
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      d="M3 7.5 6 4.5 9 7.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ChevronDown = ({ active }: { active: boolean }) => (
  <svg
    aria-hidden="true"
    className={getTableSortIconClassName({ active })}
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      d="M3 4.5 6 7.5 9 4.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const TableSortIcon = ({ direction = null }: TableSortIconProps) => {
  const isAsc = direction === 'asc';
  const isDesc = direction === 'desc';

  return (
    <span className={TABLE_SORT_ICON_STACK_CLASS} aria-hidden="true">
      <ChevronUp active={isAsc} />
      <ChevronDown active={isDesc} />
    </span>
  );
};

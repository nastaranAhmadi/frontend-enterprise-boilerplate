import { Button } from '../../base/Button';
import { Checkbox } from '../../base/Checkbox';
import { Dropdown } from '../Dropdown';
import { DATA_TABLE_COLUMN_PICKER_MENU_CLASS } from './DataTable.styles';
import type { TableColumnDef } from './DataTable.types';
import { getColumnLabel } from './dataTable.utils';

export interface TableColumnPickerProps<T> {
  columns: TableColumnDef<T>[];
  label?: string;
  onToggle: (columnId: string, visible: boolean) => void;
  visibleColumnIds: string[];
}

export const TableColumnPicker = <T,>({
  columns,
  label = 'Columns',
  onToggle,
  visibleColumnIds,
}: TableColumnPickerProps<T>) => {
  const hideableColumns = columns.filter((column) => column.hideable !== false);

  if (hideableColumns.length === 0) {
    return null;
  }

  return (
    <Dropdown
      align="end"
      menuClassName={DATA_TABLE_COLUMN_PICKER_MENU_CLASS}
      trigger={
        <Button type="button" variant="outlined" color="secondary" size="small">
          {label}
        </Button>
      }
    >
      {hideableColumns.map((column) => {
        const checked = visibleColumnIds.includes(column.id);

        return (
          <label
            key={column.id}
            className="flex cursor-pointer items-center gap-sm px-md py-sm text-sm text-foreground hover:bg-muted"
          >
            <Checkbox
              checked={checked}
              onChange={(event) => {
                onToggle(column.id, event.target.checked);
              }}
              aria-label={`Toggle ${getColumnLabel(column)} column`}
            />
            <span>{getColumnLabel(column)}</span>
          </label>
        );
      })}
    </Dropdown>
  );
};

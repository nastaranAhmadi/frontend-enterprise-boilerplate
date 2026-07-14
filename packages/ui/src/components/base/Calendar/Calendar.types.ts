import type { HTMLAttributes } from 'react';

import type {
  CalendarId,
  CalendarMonth,
  DateDisableOptions,
  DateValue,
} from '../../../date/calendars';
import type { DateRangeValue } from '../../../date/time';
import type { Size } from '../../../types';

export type CalendarSelectionMode = 'single' | 'range';

export interface CalendarOwnProps {
  calendar?: CalendarId;
  className?: string;
  disabled?: boolean;
  disableOptions?: DateDisableOptions;
  focusedIsoDate?: DateValue | null;
  locale?: string;
  mode?: CalendarSelectionMode;
  onFocusedIsoDateChange?: (isoDate: DateValue) => void;
  onRangeChange?: (range: DateRangeValue) => void;
  onSelect?: (isoDate: DateValue) => void;
  onViewChange?: (view: CalendarMonth) => void;
  selectedIsoDate?: DateValue | null;
  selectedRange?: DateRangeValue;
  showFooter?: boolean;
  size?: Size;
  todayLabel?: string;
  view?: CalendarMonth;
}

export type CalendarProps = CalendarOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CalendarOwnProps>;

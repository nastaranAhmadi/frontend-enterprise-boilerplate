import type { HTMLAttributes } from 'react';

import type { CalendarId, DateValue } from '../../../date/calendars';
import type { Size } from '../../../types';

export interface DatePickerOwnProps {
  calendar?: CalendarId;
  className?: string;
  clearLabel?: string;
  defaultOpen?: boolean;
  defaultValue?: DateValue | null;
  disabled?: boolean;
  disabledDates?: DateValue[];
  disabledWeekdays?: number[];
  format?: string;
  id?: string;
  invalid?: boolean;
  locale?: string;
  maxDate?: DateValue | null;
  minDate?: DateValue | null;
  name?: string;
  onChange?: (value: DateValue | null) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  showClearButton?: boolean;
  showTodayButton?: boolean;
  size?: Size;
  todayLabel?: string;
  value?: DateValue | null;
}

export type DatePickerProps = DatePickerOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof DatePickerOwnProps | 'onChange' | 'defaultValue'>;

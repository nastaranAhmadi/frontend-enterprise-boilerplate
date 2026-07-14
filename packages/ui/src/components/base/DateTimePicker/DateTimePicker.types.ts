import type { HTMLAttributes } from 'react';

import type { CalendarId, DateValue } from '../../../date/calendars';
import type { DateTimeValue } from '../../../date/time';
import type { Size } from '../../../types';

export interface DateTimePickerOwnProps {
  ampm?: boolean;
  applyLabel?: string;
  calendar?: CalendarId;
  cancelLabel?: string;
  className?: string;
  clearLabel?: string;
  dateFormat?: string;
  defaultOpen?: boolean;
  defaultValue?: DateTimeValue | null;
  disabled?: boolean;
  disabledDates?: DateValue[];
  disabledWeekdays?: number[];
  format?: string;
  id?: string;
  invalid?: boolean;
  locale?: string;
  maxDate?: DateValue | null;
  minDate?: DateValue | null;
  minuteStep?: number;
  name?: string;
  onChange?: (value: DateTimeValue | null) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  showClearButton?: boolean;
  size?: Size;
  timeFormat?: string;
  todayLabel?: string;
  value?: DateTimeValue | null;
}

export type DateTimePickerProps = DateTimePickerOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof DateTimePickerOwnProps | 'onChange' | 'defaultValue'>;

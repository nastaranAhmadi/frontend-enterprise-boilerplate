import type { HTMLAttributes } from 'react';

import type { CalendarId, DateValue } from '../../../date/calendars';
import type { DateRangeValue } from '../../../date/time';
import type { RangePreset, RangePresetId } from '../../../date/time/rangePresets';
import type { Size } from '../../../types';

export interface DateRangePickerOwnProps {
  applyLabel?: string;
  calendar?: CalendarId;
  cancelLabel?: string;
  className?: string;
  clearLabel?: string;
  defaultOpen?: boolean;
  defaultValue?: DateRangeValue;
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
  onChange?: (value: DateRangeValue) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  presets?: RangePreset[];
  readOnly?: boolean;
  separator?: string;
  showClearButton?: boolean;
  showPresets?: boolean;
  size?: Size;
  value?: DateRangeValue;
}

export type DateRangePickerProps = DateRangePickerOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof DateRangePickerOwnProps | 'onChange' | 'defaultValue'>;

export type { RangePreset, RangePresetId };

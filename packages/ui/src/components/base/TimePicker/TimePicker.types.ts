import type { HTMLAttributes } from 'react';

import type { TimeValue } from '../../../date/time';
import type { Size } from '../../../types';

export interface TimePickerOwnProps {
  ampm?: boolean;
  className?: string;
  clearLabel?: string;
  defaultOpen?: boolean;
  defaultValue?: TimeValue | null;
  disabled?: boolean;
  format?: string;
  id?: string;
  invalid?: boolean;
  locale?: string;
  maxTime?: TimeValue | null;
  minTime?: TimeValue | null;
  minuteStep?: number;
  name?: string;
  onChange?: (value: TimeValue | null) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  showClearButton?: boolean;
  size?: Size;
  value?: TimeValue | null;
}

export type TimePickerProps = TimePickerOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TimePickerOwnProps | 'onChange' | 'defaultValue'>;

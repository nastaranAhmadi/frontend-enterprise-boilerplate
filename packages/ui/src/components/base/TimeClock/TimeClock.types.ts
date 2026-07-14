import type { HTMLAttributes } from 'react';

import type { TimeValue } from '../../../date/time';
import type { Size } from '../../../types';

export interface TimeClockOwnProps {
  ampm?: boolean;
  className?: string;
  disabled?: boolean;
  locale?: string;
  maxTime?: TimeValue | null;
  minTime?: TimeValue | null;
  minuteStep?: number;
  onChange?: (value: TimeValue) => void;
  size?: Size;
  value?: TimeValue | null;
}

export type TimeClockProps = TimeClockOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TimeClockOwnProps | 'onChange'>;

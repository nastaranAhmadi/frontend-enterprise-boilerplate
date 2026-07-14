import { dayjs } from '../dayjs';
import { delocalizeDigits, localizeDigits } from '../digits';
import { isTimeValue, type TimeValue } from './types';

const padTimeUnit = (value: number): string => String(value).padStart(2, '0');

export const createTimeValue = (hours: number, minutes: number): TimeValue =>
  `${padTimeUnit(hours)}:${padTimeUnit(minutes)}`;

export const splitTimeValue = (
  time: TimeValue | null,
): { hours: number; minutes: number } | null => {
  if (!time || !isTimeValue(time)) {
    return null;
  }

  const [hoursPart, minutesPart] = time.split(':');
  const hours = Number.parseInt(hoursPart ?? '', 10);
  const minutes = Number.parseInt(minutesPart ?? '', 10);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return null;
  }

  return { hours, minutes };
};

export const formatTimeValue = (
  time: TimeValue | null,
  {
    ampm = false,
    format,
    locale,
  }: {
    ampm?: boolean;
    format?: string;
    locale: string;
  },
): string => {
  if (!time) {
    return '';
  }

  const parts = splitTimeValue(time);
  if (!parts) {
    return '';
  }

  const instance = dayjs().hour(parts.hours).minute(parts.minutes).second(0);
  const resolvedFormat = format ?? (ampm ? 'h:mm A' : 'HH:mm');
  const formatted = instance.format(resolvedFormat);
  return localizeDigits(formatted, locale);
};

export const parseTimeValue = (
  value: string,
  {
    ampm = false,
    format,
    locale,
  }: {
    ampm?: boolean;
    format?: string;
    locale: string;
  },
): TimeValue | null => {
  const normalized = delocalizeDigits(value).trim();
  if (!normalized) {
    return null;
  }

  if (isTimeValue(normalized)) {
    return normalized;
  }

  const resolvedFormat = format ?? (ampm ? 'h:mm A' : 'HH:mm');
  const parsed = dayjs(normalized, resolvedFormat, locale, true);

  if (!parsed.isValid()) {
    return null;
  }

  return createTimeValue(parsed.hour(), parsed.minute());
};

export const clampTimeValue = (
  time: TimeValue,
  {
    minTime,
    maxTime,
  }: {
    minTime?: TimeValue | null;
    maxTime?: TimeValue | null;
  },
): TimeValue => {
  if (minTime && time < minTime) {
    return minTime;
  }

  if (maxTime && time > maxTime) {
    return maxTime;
  }

  return time;
};

export const buildTimeOptions = ({
  ampm = false,
  minuteStep = 1,
}: {
  ampm?: boolean;
  minuteStep?: number;
}): { hours: number[]; minutes: number[] } => {
  const safeMinuteStep = minuteStep > 0 && minuteStep <= 30 ? minuteStep : 1;
  const hours = ampm
    ? Array.from({ length: 12 }, (_, index) => index + 1)
    : Array.from({ length: 24 }, (_, index) => index);
  const minutes = Array.from(
    { length: Math.ceil(60 / safeMinuteStep) },
    (_, index) => index * safeMinuteStep,
  );

  return { hours, minutes };
};

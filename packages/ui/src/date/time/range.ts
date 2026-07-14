import { formatDateValue } from '../calendars/adapter';
import type { CalendarId, DateValue } from '../calendars/types';
import { dayjs } from '../dayjs';
import { localizeDigits } from '../digits';
import type { DateRangeValue } from './types';

export const normalizeDateRange = (range: DateRangeValue): DateRangeValue => {
  const { start, end } = range;

  if (start && end && start > end) {
    return { start: end, end: start };
  }

  return range;
};

export const isCompleteDateRange = (
  range: DateRangeValue,
): range is {
  start: DateValue;
  end: DateValue;
} => Boolean(range.start && range.end);

export const isDateInRange = (isoDate: DateValue, range: DateRangeValue): boolean => {
  const normalized = normalizeDateRange(range);
  if (!normalized.start || !normalized.end) {
    return false;
  }

  return isoDate >= normalized.start && isoDate <= normalized.end;
};

export const isDateRangeStart = (isoDate: DateValue, range: DateRangeValue): boolean =>
  range.start === isoDate;

export const isDateRangeEnd = (isoDate: DateValue, range: DateRangeValue): boolean =>
  range.end === isoDate;

export const isDateBetweenRange = (isoDate: DateValue, range: DateRangeValue): boolean => {
  const normalized = normalizeDateRange(range);
  if (!normalized.start || !normalized.end) {
    return false;
  }

  return isoDate > normalized.start && isoDate < normalized.end;
};

export const formatDateRangeValue = (
  range: DateRangeValue,
  {
    calendar,
    format,
    locale,
    separator = ' – ',
  }: {
    calendar: CalendarId;
    format?: string;
    locale: string;
    separator?: string;
  },
): string => {
  const normalized = normalizeDateRange(range);
  if (!normalized.start && !normalized.end) {
    return '';
  }

  if (normalized.start && !normalized.end) {
    return formatDateValue(normalized.start, { calendar, locale, format });
  }

  if (!normalized.start && normalized.end) {
    return formatDateValue(normalized.end, { calendar, locale, format });
  }

  const startLabel = formatDateValue(normalized.start, { calendar, locale, format });
  const endLabel = formatDateValue(normalized.end, { calendar, locale, format });
  return localizeDigits(`${startLabel}${separator}${endLabel}`, locale);
};

export const getNextRangeSelection = (
  currentRange: DateRangeValue,
  selectedIsoDate: DateValue,
): DateRangeValue => {
  const { start, end } = currentRange;

  if (!start || (start && end)) {
    return { start: selectedIsoDate, end: null };
  }

  return normalizeDateRange({ start, end: selectedIsoDate });
};

export const isRangeDayDisabled = (
  isoDate: DateValue,
  range: DateRangeValue,
  disableOptions: {
    minDate?: DateValue | null;
    maxDate?: DateValue | null;
  },
): boolean => {
  if (disableOptions.minDate && isoDate < disableOptions.minDate) {
    return true;
  }

  if (disableOptions.maxDate && isoDate > disableOptions.maxDate) {
    return true;
  }

  if (range.start && !range.end && disableOptions.maxDate) {
    return isoDate > disableOptions.maxDate;
  }

  return false;
};

export const shiftRangeByDays = (range: DateRangeValue, days: number): DateRangeValue => {
  const normalized = normalizeDateRange(range);
  if (!normalized.start || !normalized.end) {
    return normalized;
  }

  return {
    start: dayjs(normalized.start).add(days, 'day').format('YYYY-MM-DD'),
    end: dayjs(normalized.end).add(days, 'day').format('YYYY-MM-DD'),
  };
};

import type { DateDisableOptions, DateValue } from '../calendars/types';

export const isIsoDateValue = (value: string): value is DateValue =>
  /^\d{4}-\d{2}-\d{2}$/.test(value);

export const isDateDisabled = (
  isoDate: DateValue,
  { minDate, maxDate, disabledDates = [], disabledWeekdays = [] }: DateDisableOptions,
  weekday: number,
): boolean => {
  if (minDate && isoDate < minDate) {
    return true;
  }

  if (maxDate && isoDate > maxDate) {
    return true;
  }

  if (disabledDates.includes(isoDate)) {
    return true;
  }

  if (disabledWeekdays.length > 0 && disabledWeekdays.includes(weekday)) {
    return true;
  }

  return false;
};

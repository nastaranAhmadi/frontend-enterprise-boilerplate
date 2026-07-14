import type { DateValue } from '../calendars/types';

/** 24-hour time string `HH:mm`. */
export type TimeValue = string;

/** Local naive datetime string `YYYY-MM-DDTHH:mm`. */
export type DateTimeValue = string;

export interface DateRangeValue {
  end: DateValue | null;
  start: DateValue | null;
}

export const EMPTY_DATE_RANGE: DateRangeValue = { start: null, end: null };

export const TIME_VALUE_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const DATE_TIME_VALUE_PATTERN = /^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):([0-5]\d)$/;

export const isTimeValue = (value: string): value is TimeValue => TIME_VALUE_PATTERN.test(value);

export const isDateTimeValue = (value: string): value is DateTimeValue =>
  DATE_TIME_VALUE_PATTERN.test(value);

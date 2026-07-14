import { formatDateValue, parseDateValue } from '../calendars/adapter';
import type { CalendarId, DateValue } from '../calendars/types';
import { dayjs } from '../dayjs';
import { delocalizeDigits, localizeDigits } from '../digits';
import { formatTimeValue, parseTimeValue } from './formatTime';
import { type DateTimeValue, isDateTimeValue, type TimeValue } from './types';

export const combineDateAndTime = (date: DateValue, time: TimeValue): DateTimeValue =>
  `${date}T${time}`;

export const splitDateTimeValue = (
  value: DateTimeValue | null,
): { date: DateValue | null; time: TimeValue | null } => {
  if (!value || !isDateTimeValue(value)) {
    return { date: null, time: null };
  }

  const [date, time] = value.split('T') as [DateValue, TimeValue];
  return { date, time };
};

export const formatDateTimeValue = (
  value: DateTimeValue | null,
  {
    ampm = false,
    calendar,
    dateFormat,
    locale,
    timeFormat,
  }: {
    ampm?: boolean;
    calendar: CalendarId;
    dateFormat?: string;
    locale: string;
    timeFormat?: string;
  },
): string => {
  const { date, time } = splitDateTimeValue(value);
  if (!date || !time) {
    return '';
  }

  const formattedDate = formatDateValue(date, { calendar, locale, format: dateFormat });
  const formattedTime = formatTimeValue(time, { ampm, format: timeFormat, locale });
  return localizeDigits(`${formattedDate} ${formattedTime}`, locale);
};

export const parseDateTimeValue = (
  value: string,
  {
    ampm = false,
    calendar,
    dateFormat,
    locale,
    timeFormat,
  }: {
    ampm?: boolean;
    calendar: CalendarId;
    dateFormat?: string;
    locale: string;
    timeFormat?: string;
  },
): DateTimeValue | null => {
  const normalized = delocalizeDigits(value).trim();
  if (!normalized) {
    return null;
  }

  if (isDateTimeValue(normalized)) {
    return normalized;
  }

  const freeform = normalized as string;
  const lastSpaceIndex = freeform.lastIndexOf(' ');
  if (lastSpaceIndex <= 0) {
    return null;
  }

  const dateSegment = freeform.slice(0, lastSpaceIndex);
  const timeSegment = freeform.slice(lastSpaceIndex + 1);
  const parsedDate = parseDateValue(dateSegment, { calendar, locale, format: dateFormat });
  const parsedTime = parseTimeValue(timeSegment, { ampm, format: timeFormat, locale });

  if (!parsedDate || !parsedTime) {
    return null;
  }

  return combineDateAndTime(parsedDate, parsedTime);
};

export const createNowDateTimeValue = (): DateTimeValue => {
  const now = dayjs();
  return combineDateAndTime(now.format('YYYY-MM-DD'), now.format('HH:mm'));
};

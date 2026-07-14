import type { CalendarId } from './types';

export const CALENDAR_SYSTEM_MAP: Record<CalendarId, 'gregory' | 'jalali'> = {
  gregorian: 'gregory',
  persian: 'jalali',
};

export const DEFAULT_DATE_FORMAT: Record<CalendarId, string> = {
  gregorian: 'MMM D, YYYY',
  persian: 'D MMMM YYYY',
};

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

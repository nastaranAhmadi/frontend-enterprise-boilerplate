import { dayjs } from '../dayjs';
import { delocalizeDigits } from '../digits';
import { CALENDAR_SYSTEM_MAP, ISO_DATE_PATTERN } from './constants';
import { resolveDayjsLocale } from './resolveLocale';
import type { CalendarId, DateValue } from './types';

type DayjsLocaleConfig = {
  jmonths?: string[];
};

const toGregorianIso = (instance: ReturnType<typeof dayjs>): DateValue =>
  instance.calendar('gregory').format('YYYY-MM-DD');

const getJalaliMonthNames = (locale: string): string[] => {
  const locales = dayjs.Ls as Record<string, DayjsLocaleConfig>;
  const resolved = resolveDayjsLocale(locale);
  return locales[resolved]?.jmonths ?? locales.en?.jmonths ?? [];
};

const parseGregorianDate = (
  normalized: string,
  format: string,
  locale: string,
): DateValue | null => {
  const resolvedLocale = resolveDayjsLocale(locale);
  const strictParsed = dayjs(normalized, format, resolvedLocale, true);

  if (strictParsed.isValid()) {
    return toGregorianIso(strictParsed);
  }

  if (ISO_DATE_PATTERN.test(normalized)) {
    const isoParsed = dayjs(normalized);
    if (isoParsed.isValid()) {
      return isoParsed.format('YYYY-MM-DD');
    }
  }

  return null;
};

const parsePersianDate = (normalized: string, format: string, locale: string): DateValue | null => {
  if (ISO_DATE_PATTERN.test(normalized)) {
    const jalaliIso = dayjs(normalized, { jalali: true });
    if (jalaliIso.isValid()) {
      return toGregorianIso(jalaliIso);
    }
  }

  if (format === 'D MMMM YYYY') {
    const parts = normalized.split(/\s+/);
    if (parts.length !== 3) {
      return null;
    }

    const day = Number.parseInt(parts[0] ?? '', 10);
    const year = Number.parseInt(parts[2] ?? '', 10);
    const monthIndex = getJalaliMonthNames(locale).indexOf(parts[1] ?? '');

    if (!Number.isFinite(day) || !Number.isFinite(year) || monthIndex < 0) {
      return null;
    }

    const parsed = dayjs()
      .calendar(CALENDAR_SYSTEM_MAP.persian)
      .locale(resolveDayjsLocale(locale))
      .year(year)
      .month(monthIndex)
      .date(day);

    if (!parsed.isValid()) {
      return null;
    }

    return toGregorianIso(parsed);
  }

  return null;
};

export const parseCalendarDate = (
  value: string,
  {
    calendar,
    locale,
    format,
  }: {
    calendar: CalendarId;
    locale: string;
    format: string;
  },
): DateValue | null => {
  const normalized = delocalizeDigits(value).trim();
  if (!normalized) {
    return null;
  }

  if (calendar === 'persian') {
    return parsePersianDate(normalized, format, locale);
  }

  return parseGregorianDate(normalized, format, locale);
};

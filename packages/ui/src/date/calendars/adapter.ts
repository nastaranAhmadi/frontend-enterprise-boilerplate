import { dayjs } from '../dayjs';
import { localizeDigits } from '../digits';
import { isDateDisabled } from '../validation/isDateDisabled';
import { CALENDAR_SYSTEM_MAP } from './constants';
import { parseCalendarDate } from './parseDate';
import { resolveDayjsLocale } from './resolveLocale';
import type {
  CalendarAdapter,
  CalendarDayCell,
  CalendarId,
  CalendarMonth,
  DateDisableOptions,
  DateValue,
} from './types';

const WEEKS_IN_GRID = 6;

const toGregorianIso = (instance: ReturnType<typeof dayjs>): DateValue =>
  instance.calendar('gregory').format('YYYY-MM-DD');

const createCalendarInstance = (
  calendar: CalendarId,
  locale: string,
  view?: CalendarMonth,
): ReturnType<typeof dayjs> => {
  const calendarSystem = CALENDAR_SYSTEM_MAP[calendar];
  const resolvedLocale = resolveDayjsLocale(locale);
  let instance = dayjs().calendar(calendarSystem).locale(resolvedLocale);

  if (view) {
    instance = instance
      .year(view.year)
      .month(view.month - 1)
      .date(1);
  }

  return instance;
};

const createCalendarAdapter = (calendar: CalendarId, locale: string): CalendarAdapter => {
  const calendarSystem = CALENDAR_SYSTEM_MAP[calendar];
  const resolvedLocale = resolveDayjsLocale(locale);

  const toDisplayInstance = (isoDate: DateValue): ReturnType<typeof dayjs> =>
    dayjs(isoDate).calendar(calendarSystem).locale(resolvedLocale);

  return {
    calendar,
    locale,

    createTodayIso(): DateValue {
      return dayjs().format('YYYY-MM-DD');
    },

    formatDate(isoDate, format) {
      if (!isoDate) {
        return '';
      }

      const formatted = toDisplayInstance(isoDate).format(format);
      return localizeDigits(formatted, locale);
    },

    parseDate(value, format) {
      return parseCalendarDate(value, {
        calendar,
        locale,
        format,
      });
    },

    getMonthLabel(view) {
      const label = createCalendarInstance(calendar, locale, view).format('MMMM YYYY');
      return localizeDigits(label, locale);
    },

    getWeekdayLabels() {
      const labels = dayjs().locale(resolvedLocale).localeData().weekdaysMin();
      return labels.map((label) => localizeDigits(label, locale));
    },

    getFirstDayOfWeek() {
      return dayjs().locale(resolvedLocale).localeData().firstDayOfWeek();
    },

    addMonths(view, amount) {
      const next = createCalendarInstance(calendar, locale, view).add(amount, 'month');
      return {
        year: next.year(),
        month: next.month() + 1,
      };
    },

    getViewMonth(isoDate) {
      if (!isoDate) {
        const today = dayjs().calendar(calendarSystem).locale(resolvedLocale);
        return {
          year: today.year(),
          month: today.month() + 1,
        };
      }

      const instance = toDisplayInstance(isoDate);
      return {
        year: instance.year(),
        month: instance.month() + 1,
      };
    },

    buildMonthGrid(view, selectedIsoDate, disableOptions) {
      const firstOfMonth = createCalendarInstance(calendar, locale, view);
      const todayIso = dayjs().format('YYYY-MM-DD');
      const gridStart = firstOfMonth.startOf('month').startOf('week');

      const rows: CalendarDayCell[][] = [];

      for (let week = 0; week < WEEKS_IN_GRID; week += 1) {
        const cells: CalendarDayCell[] = [];

        for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
          const cellDate = gridStart.add(week * 7 + dayIndex, 'day');
          const isoDate = toGregorianIso(cellDate);
          const weekday = dayjs(isoDate).day();

          cells.push({
            isoDate,
            day: cellDate.date(),
            month: cellDate.month() + 1,
            year: cellDate.year(),
            isCurrentMonth: cellDate.month() === firstOfMonth.month(),
            isToday: isoDate === todayIso,
            isSelected: selectedIsoDate === isoDate,
            isDisabled: isDateDisabled(isoDate, disableOptions, weekday),
          });
        }

        rows.push(cells);
      }

      return rows;
    },

    shiftIsoDate(isoDate, amountDays) {
      return dayjs(isoDate).add(amountDays, 'day').format('YYYY-MM-DD');
    },

    isSameMonth(view, isoDate) {
      const instance = toDisplayInstance(isoDate);
      return instance.year() === view.year && instance.month() + 1 === view.month;
    },
  };
};

const adapterCache = new Map<string, CalendarAdapter>();

export const getCalendarAdapter = (calendar: CalendarId, locale: string): CalendarAdapter => {
  const cacheKey = `${calendar}:${resolveDayjsLocale(locale)}`;
  const cached = adapterCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const adapter = createCalendarAdapter(calendar, locale);
  adapterCache.set(cacheKey, adapter);
  return adapter;
};

export const formatDateValue = (
  isoDate: DateValue | null,
  {
    calendar,
    locale,
    format,
  }: {
    calendar: CalendarId;
    locale: string;
    format?: string;
  },
): string => {
  const adapter = getCalendarAdapter(calendar, locale);
  const resolvedFormat = format ?? (calendar === 'persian' ? 'D MMMM YYYY' : 'MMM D, YYYY');
  return adapter.formatDate(isoDate, resolvedFormat);
};

export const parseDateValue = (
  value: string,
  {
    calendar,
    locale,
    format,
  }: {
    calendar: CalendarId;
    locale: string;
    format?: string;
  },
): DateValue | null => {
  const adapter = getCalendarAdapter(calendar, locale);
  const resolvedFormat = format ?? (calendar === 'persian' ? 'D MMMM YYYY' : 'MMM D, YYYY');
  return adapter.parseDate(value, resolvedFormat);
};

export const isDateWithinBounds = (
  isoDate: DateValue,
  disableOptions: DateDisableOptions,
): boolean => {
  const weekday = dayjs(isoDate).day();
  return !isDateDisabled(isoDate, disableOptions, weekday);
};

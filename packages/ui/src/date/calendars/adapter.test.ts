import { describe, expect, it } from 'vitest';

import { delocalizeDigits, localizeDigits } from '../digits';
import { isDateDisabled } from '../validation/isDateDisabled';
import { formatDateValue, getCalendarAdapter, isDateWithinBounds, parseDateValue } from './adapter';

describe('date digits', () => {
  it('localizes digits for Persian locale', () => {
    expect(localizeDigits('2026-07-13', 'fa-IR')).toBe('۲۰۲۶-۰۷-۱۳');
  });

  it('delocalizes Persian digits', () => {
    expect(delocalizeDigits('۲۰۲۶-۰۷-۱۳')).toBe('2026-07-13');
  });
});

describe('calendar adapter', () => {
  it('formats gregorian dates in English', () => {
    expect(
      formatDateValue('2026-07-13', {
        calendar: 'gregorian',
        locale: 'en',
        format: 'MMM D, YYYY',
      }),
    ).toBe('Jul 13, 2026');
  });

  it('formats persian calendar dates with localized digits', () => {
    const formatted = formatDateValue('2026-07-13', {
      calendar: 'persian',
      locale: 'fa',
      format: 'D MMMM YYYY',
    });

    expect(formatted).toMatch(/۱۴۰۵/);
    expect(formatted).toMatch(/[۰-۹]/);
  });

  it('parses gregorian formatted values', () => {
    const parsed = parseDateValue('Jul 13, 2026', {
      calendar: 'gregorian',
      locale: 'en',
      format: 'MMM D, YYYY',
    });

    expect(parsed).toBe('2026-07-13');
  });

  it('parses persian formatted values with localized digits', () => {
    const adapter = getCalendarAdapter('persian', 'fa');
    const sample = adapter.formatDate('2026-07-13', 'D MMMM YYYY');
    const parsed = parseDateValue(sample, {
      calendar: 'persian',
      locale: 'fa',
      format: 'D MMMM YYYY',
    });

    expect(parsed).toBe('2026-07-13');
  });

  it('validates min and max dates', () => {
    expect(
      isDateWithinBounds('2026-07-10', {
        minDate: '2026-07-01',
        maxDate: '2026-07-15',
      }),
    ).toBe(true);

    expect(
      isDateWithinBounds('2026-06-30', {
        minDate: '2026-07-01',
        maxDate: '2026-07-15',
      }),
    ).toBe(false);
  });

  it('validates disabled dates and weekdays', () => {
    expect(
      isDateDisabled(
        '2026-07-13',
        {
          disabledDates: ['2026-07-13'],
          disabledWeekdays: [],
        },
        1,
      ),
    ).toBe(true);

    expect(
      isDateDisabled(
        '2026-07-12',
        {
          disabledWeekdays: [0],
        },
        0,
      ),
    ).toBe(true);
  });

  it('switches calendar systems without duplicating adapters', () => {
    const gregorian = getCalendarAdapter('gregorian', 'en');
    const persian = getCalendarAdapter('persian', 'fa');

    expect(gregorian.calendar).toBe('gregorian');
    expect(persian.calendar).toBe('persian');
    expect(gregorian.formatDate('2026-07-13', 'YYYY-MM-DD')).toBe('2026-07-13');
    expect(persian.formatDate('2026-07-13', 'YYYY-MM-DD')).not.toBe(
      gregorian.formatDate('2026-07-13', 'MMMM YYYY'),
    );
  });

  it('builds a six-week month grid', () => {
    const adapter = getCalendarAdapter('gregorian', 'en');
    const grid = adapter.buildMonthGrid({ year: 2026, month: 7 }, '2026-07-13', {});

    expect(grid).toHaveLength(6);
    expect(grid.every((week) => week.length === 7)).toBe(true);
    expect(grid.flat().some((cell) => cell.isoDate === '2026-07-13' && cell.isSelected)).toBe(true);
  });
});

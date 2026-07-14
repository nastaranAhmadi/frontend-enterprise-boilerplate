import { describe, expect, it } from 'vitest';

import {
  combineDateAndTime,
  createTimeValue,
  formatDateRangeValue,
  formatTimeValue,
  getNextRangeSelection,
  getRangePresetValue,
  normalizeDateRange,
  parseTimeValue,
  splitDateTimeValue,
} from './index';

describe('time utilities', () => {
  it('formats and parses time values', () => {
    expect(formatTimeValue('14:30', { locale: 'en' })).toBe('14:30');
    expect(parseTimeValue('2:30 PM', { locale: 'en', ampm: true })).toBe('14:30');
  });

  it('combines and splits datetime values', () => {
    const value = combineDateAndTime('2026-07-13', createTimeValue(9, 15));
    expect(value).toBe('2026-07-13T09:15');
    expect(splitDateTimeValue(value)).toEqual({
      date: '2026-07-13',
      time: '09:15',
    });
  });
});

describe('range utilities', () => {
  it('normalizes reversed ranges', () => {
    expect(normalizeDateRange({ start: '2026-07-20', end: '2026-07-10' })).toEqual({
      start: '2026-07-10',
      end: '2026-07-20',
    });
  });

  it('formats date ranges', () => {
    expect(
      formatDateRangeValue(
        { start: '2026-07-05', end: '2026-07-12' },
        { calendar: 'gregorian', locale: 'en', format: 'MMM D, YYYY' },
      ),
    ).toBe('Jul 5, 2026 – Jul 12, 2026');
  });

  it('selects the next range segment', () => {
    expect(getNextRangeSelection({ start: null, end: null }, '2026-07-05')).toEqual({
      start: '2026-07-05',
      end: null,
    });
    expect(getNextRangeSelection({ start: '2026-07-12', end: null }, '2026-07-05')).toEqual({
      start: '2026-07-05',
      end: '2026-07-12',
    });
  });

  it('returns preset ranges', () => {
    const today = getRangePresetValue('today');
    expect(today.start).toBe(today.end);
    expect(today.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

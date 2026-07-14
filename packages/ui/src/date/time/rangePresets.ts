import type { DateValue } from '../calendars/types';
import { dayjs } from '../dayjs';
import type { DateRangeValue } from './types';

export type RangePresetId =
  | 'allTime'
  | 'lastMonth'
  | 'lastWeek'
  | 'lastYear'
  | 'thisMonth'
  | 'thisWeek'
  | 'thisYear'
  | 'today'
  | 'yesterday';

export interface RangePreset {
  id: RangePresetId;
  label: string;
}

export const DEFAULT_RANGE_PRESETS: RangePreset[] = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'thisWeek', label: 'This week' },
  { id: 'lastWeek', label: 'Last week' },
  { id: 'thisMonth', label: 'This month' },
  { id: 'lastMonth', label: 'Last month' },
  { id: 'thisYear', label: 'This year' },
  { id: 'lastYear', label: 'Last year' },
  { id: 'allTime', label: 'All time' },
];

const toIsoDate = (instance: ReturnType<typeof dayjs>): DateValue => instance.format('YYYY-MM-DD');

export const getRangePresetValue = (presetId: RangePresetId): DateRangeValue => {
  const today = dayjs().startOf('day');

  switch (presetId) {
    case 'today':
      return { start: toIsoDate(today), end: toIsoDate(today) };
    case 'yesterday': {
      const yesterday = today.subtract(1, 'day');
      return { start: toIsoDate(yesterday), end: toIsoDate(yesterday) };
    }
    case 'thisWeek':
      return {
        start: toIsoDate(today.startOf('week')),
        end: toIsoDate(today.endOf('week')),
      };
    case 'lastWeek': {
      const lastWeek = today.subtract(1, 'week');
      return {
        start: toIsoDate(lastWeek.startOf('week')),
        end: toIsoDate(lastWeek.endOf('week')),
      };
    }
    case 'thisMonth':
      return {
        start: toIsoDate(today.startOf('month')),
        end: toIsoDate(today.endOf('month')),
      };
    case 'lastMonth': {
      const lastMonth = today.subtract(1, 'month');
      return {
        start: toIsoDate(lastMonth.startOf('month')),
        end: toIsoDate(lastMonth.endOf('month')),
      };
    }
    case 'thisYear':
      return {
        start: toIsoDate(today.startOf('year')),
        end: toIsoDate(today.endOf('year')),
      };
    case 'lastYear': {
      const lastYear = today.subtract(1, 'year');
      return {
        start: toIsoDate(lastYear.startOf('year')),
        end: toIsoDate(lastYear.endOf('year')),
      };
    }
    case 'allTime':
      return { start: null, end: null };
    default:
      return { start: toIsoDate(today), end: toIsoDate(today) };
  }
};

import { type KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';

import type { CalendarMonth, DateValue } from '../../../date/calendars';
import { getCalendarAdapter, isDateWithinBounds } from '../../../date/calendars';
import { localizeDigits } from '../../../date/digits';
import {
  getNextRangeSelection,
  isDateBetweenRange,
  isDateRangeEnd,
  isDateRangeStart,
  normalizeDateRange,
} from '../../../date/time';
import { getHorizontalNavigationKeys } from '../../../direction/textDirection';
import { useTextDirection } from '../../../hooks/useTextDirection';
import { resolveDirFromLocale } from '../../../locale/locale';
import {
  CALENDAR_DAY_CELL_WRAPPER_CLASS,
  CALENDAR_FOOTER_CLASS,
  CALENDAR_GRID_CLASS,
  CALENDAR_HEADER_CLASS,
  CALENDAR_NAV_BUTTON_CLASS,
  CALENDAR_TITLE_CLASS,
  CALENDAR_TODAY_BUTTON_CLASS,
  CALENDAR_WEEKDAY_CELL_CLASS,
  CALENDAR_WEEKDAY_ROW_CLASS,
  getCalendarDayButtonClassName,
  getCalendarRootClassName,
} from './Calendar.styles';
import type { CalendarProps } from './Calendar.types';

const DEFAULT_TODAY_LABEL = 'Today';

const ChevronIcon = ({ direction }: { direction: 'previous' | 'next' }) => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 16 16">
    <path
      d={direction === 'previous' ? 'M10 12 6 8l4-4' : 'M6 12l4-4-4-4'}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const Calendar = function Calendar(props: CalendarProps) {
  const {
    calendar = 'gregorian',
    className,
    disabled = false,
    disableOptions = {},
    focusedIsoDate: focusedIsoDateProp,
    locale = 'en',
    mode = 'single',
    onFocusedIsoDateChange,
    onRangeChange,
    onSelect,
    onViewChange,
    selectedIsoDate = null,
    selectedRange = { start: null, end: null },
    showFooter = true,
    size = 'medium',
    todayLabel = DEFAULT_TODAY_LABEL,
    view: viewProp,
    ...rootProps
  } = props;

  const adapter = useMemo(() => getCalendarAdapter(calendar, locale), [calendar, locale]);
  const { isRtl } = useTextDirection({ dir: resolveDirFromLocale(locale) });
  const navigationKeys = getHorizontalNavigationKeys(isRtl);

  const [internalView, setInternalView] = useState<CalendarMonth>(() =>
    adapter.getViewMonth(selectedIsoDate),
  );

  const view = viewProp ?? internalView;

  const [internalFocusedIsoDate, setInternalFocusedIsoDate] = useState<DateValue | null>(
    selectedIsoDate ?? adapter.createTodayIso(),
  );

  const focusedIsoDate = focusedIsoDateProp ?? internalFocusedIsoDate;

  const setFocusedIsoDate = useCallback(
    (nextIsoDate: DateValue) => {
      if (focusedIsoDateProp === undefined) {
        setInternalFocusedIsoDate(nextIsoDate);
      }
      onFocusedIsoDateChange?.(nextIsoDate);
    },
    [focusedIsoDateProp, onFocusedIsoDateChange],
  );

  const setView = useCallback(
    (nextView: CalendarMonth) => {
      if (viewProp === undefined) {
        setInternalView(nextView);
      }
      onViewChange?.(nextView);
    },
    [onViewChange, viewProp],
  );

  useEffect(() => {
    if (selectedIsoDate && !adapter.isSameMonth(view, selectedIsoDate)) {
      setView(adapter.getViewMonth(selectedIsoDate));
    }
  }, [adapter, selectedIsoDate, setView, view]);

  const grid = useMemo(
    () => adapter.buildMonthGrid(view, selectedIsoDate, disableOptions),
    [adapter, disableOptions, selectedIsoDate, view],
  );

  const weekdayLabels = useMemo(() => adapter.getWeekdayLabels(), [adapter]);

  const handlePreviousMonth = () => {
    if (disabled) return;
    setView(adapter.addMonths(view, -1));
  };

  const handleNextMonth = () => {
    if (disabled) return;
    setView(adapter.addMonths(view, 1));
  };

  const normalizedRange = useMemo(() => normalizeDateRange(selectedRange), [selectedRange]);

  const handleSelect = (isoDate: DateValue, isDisabled: boolean) => {
    if (disabled || isDisabled) return;
    setFocusedIsoDate(isoDate);

    if (mode === 'range') {
      onRangeChange?.(getNextRangeSelection(normalizedRange, isoDate));
      return;
    }

    onSelect?.(isoDate);
  };

  const handleToday = () => {
    if (disabled) return;
    const todayIso = adapter.createTodayIso();
    setView(adapter.getViewMonth(todayIso));
    setFocusedIsoDate(todayIso);
    onSelect?.(todayIso);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || !focusedIsoDate) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = adapter.shiftIsoDate(focusedIsoDate, -7);
      setFocusedIsoDate(next);
      if (!adapter.isSameMonth(view, next)) {
        setView(adapter.getViewMonth(next));
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = adapter.shiftIsoDate(focusedIsoDate, 7);
      setFocusedIsoDate(next);
      if (!adapter.isSameMonth(view, next)) {
        setView(adapter.getViewMonth(next));
      }
      return;
    }

    if (event.key === navigationKeys.previous) {
      event.preventDefault();
      const next = adapter.shiftIsoDate(focusedIsoDate, -1);
      setFocusedIsoDate(next);
      if (!adapter.isSameMonth(view, next)) {
        setView(adapter.getViewMonth(next));
      }
      return;
    }

    if (event.key === navigationKeys.next) {
      event.preventDefault();
      const next = adapter.shiftIsoDate(focusedIsoDate, 1);
      setFocusedIsoDate(next);
      if (!adapter.isSameMonth(view, next)) {
        setView(adapter.getViewMonth(next));
      }
      return;
    }

    if (event.key === 'PageUp') {
      event.preventDefault();
      setView(adapter.addMonths(view, -1));
      return;
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      setView(adapter.addMonths(view, 1));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (isDateWithinBounds(focusedIsoDate, disableOptions)) {
        handleSelect(focusedIsoDate, false);
      }
    }
  };

  return (
    <div
      {...rootProps}
      className={getCalendarRootClassName({ className, size })}
      role="group"
      aria-label={adapter.getMonthLabel(view)}
    >
      <div className={CALENDAR_HEADER_CLASS}>
        <button
          type="button"
          className={CALENDAR_NAV_BUTTON_CLASS}
          onClick={handlePreviousMonth}
          disabled={disabled}
          aria-label="Previous month"
        >
          <ChevronIcon direction={isRtl ? 'next' : 'previous'} />
        </button>

        <div className={CALENDAR_TITLE_CLASS} aria-live="polite">
          {adapter.getMonthLabel(view)}
        </div>

        <button
          type="button"
          className={CALENDAR_NAV_BUTTON_CLASS}
          onClick={handleNextMonth}
          disabled={disabled}
          aria-label="Next month"
        >
          <ChevronIcon direction={isRtl ? 'previous' : 'next'} />
        </button>
      </div>

      <table
        className={CALENDAR_GRID_CLASS}
        role="grid"
        aria-label={adapter.getMonthLabel(view)}
        onKeyDown={handleKeyDown}
      >
        <thead>
          <tr className={CALENDAR_WEEKDAY_ROW_CLASS}>
            {weekdayLabels.map((label) => (
              <th key={label} scope="col" className={CALENDAR_WEEKDAY_CELL_CLASS}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((week) => (
            <tr key={week.map((cell) => cell.isoDate).join('-')}>
              {week.map((cell) => {
                const isFocused = focusedIsoDate === cell.isoDate;
                const isRangeStart =
                  mode === 'range' && isDateRangeStart(cell.isoDate, normalizedRange);
                const isRangeEnd =
                  mode === 'range' && isDateRangeEnd(cell.isoDate, normalizedRange);
                const isInRange =
                  mode === 'range' && isDateBetweenRange(cell.isoDate, normalizedRange);
                const isSelected = mode === 'range' ? isRangeStart || isRangeEnd : cell.isSelected;

                return (
                  <td
                    key={cell.isoDate}
                    className={CALENDAR_DAY_CELL_WRAPPER_CLASS}
                    role="gridcell"
                    aria-selected={isSelected || isInRange}
                  >
                    <button
                      type="button"
                      tabIndex={isFocused ? 0 : -1}
                      disabled={disabled || cell.isDisabled}
                      aria-label={adapter.formatDate(cell.isoDate, 'dddd, MMMM D, YYYY')}
                      aria-current={cell.isToday ? 'date' : undefined}
                      className={getCalendarDayButtonClassName({
                        isCurrentMonth: cell.isCurrentMonth,
                        isToday: cell.isToday,
                        isSelected,
                        isDisabled: cell.isDisabled,
                        isFocused,
                        isInRange,
                        isRangeStart,
                        isRangeEnd,
                      })}
                      onClick={() => {
                        handleSelect(cell.isoDate, cell.isDisabled);
                      }}
                      onFocus={() => {
                        setFocusedIsoDate(cell.isoDate);
                      }}
                    >
                      {localizeDigits(String(cell.day), locale)}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showFooter ? (
        <div className={CALENDAR_FOOTER_CLASS}>
          <button
            type="button"
            className={CALENDAR_TODAY_BUTTON_CLASS}
            onClick={handleToday}
            disabled={disabled}
          >
            {todayLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
};

Calendar.displayName = 'Calendar';

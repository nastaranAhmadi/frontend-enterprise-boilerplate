/** Canonical stored value — always Gregorian ISO `YYYY-MM-DD`. */
export type DateValue = string;

export type CalendarId = 'gregorian' | 'persian';

export interface CalendarMonth {
  year: number;
  /** 1-based month index. */
  month: number;
}

export interface CalendarDayCell {
  isoDate: DateValue;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface DateDisableOptions {
  minDate?: DateValue | null;
  maxDate?: DateValue | null;
  disabledDates?: DateValue[];
  disabledWeekdays?: number[];
}

export interface CalendarAdapter {
  readonly calendar: CalendarId;
  readonly locale: string;
  createTodayIso(): DateValue;
  formatDate(isoDate: DateValue | null, format: string): string;
  parseDate(value: string, format: string): DateValue | null;
  getMonthLabel(view: CalendarMonth): string;
  getWeekdayLabels(): string[];
  getFirstDayOfWeek(): number;
  addMonths(view: CalendarMonth, amount: number): CalendarMonth;
  getViewMonth(isoDate: DateValue | null): CalendarMonth;
  buildMonthGrid(
    view: CalendarMonth,
    selectedIsoDate: DateValue | null,
    disableOptions: DateDisableOptions,
  ): CalendarDayCell[][];
  shiftIsoDate(isoDate: DateValue, amountDays: number): DateValue;
  isSameMonth(view: CalendarMonth, isoDate: DateValue): boolean;
}

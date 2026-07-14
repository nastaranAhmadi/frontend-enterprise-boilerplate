import { useMemo } from 'react';

import { localizeDigits } from '../../../date/digits';
import { buildTimeOptions, createTimeValue, splitTimeValue } from '../../../date/time';
import {
  getTimeClockOptionClassName,
  getTimeClockRootClassName,
  TIME_CLOCK_COLUMN_CLASS,
  TIME_CLOCK_LABEL_CLASS,
  TIME_CLOCK_LIST_CLASS,
  TIME_CLOCK_PERIOD_CLASS,
} from './TimeClock.styles';
import type { TimeClockProps } from './TimeClock.types';

const DEFAULT_TIME: ReturnType<typeof splitTimeValue> = { hours: 0, minutes: 0 };

const to24Hour = (hour: number, period: 'AM' | 'PM'): number => {
  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  }

  return hour === 12 ? 12 : hour + 12;
};

const to12Hour = (hours: number): { hour: number; period: 'AM' | 'PM' } => {
  const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return { hour, period };
};

export const TimeClock = function TimeClock(props: TimeClockProps) {
  const {
    ampm = false,
    className,
    disabled = false,
    locale = 'en',
    maxTime,
    minTime,
    minuteStep = 5,
    onChange,
    value = null,
    ...rootProps
  } = props;

  const parts = splitTimeValue(value) ?? DEFAULT_TIME;
  const display12 = to12Hour(parts.hours);
  const { hours: hourOptions, minutes: minuteOptions } = useMemo(
    () => buildTimeOptions({ ampm, minuteStep }),
    [ampm, minuteStep],
  );

  const updateTime = (hours: number, minutes: number) => {
    if (disabled) {
      return;
    }

    const next = createTimeValue(hours, minutes);
    if (minTime && next < minTime) {
      onChange?.(minTime);
      return;
    }

    if (maxTime && next > maxTime) {
      onChange?.(maxTime);
      return;
    }

    onChange?.(next);
  };

  const isMinuteDisabled = (minute: number): boolean => {
    const candidate = createTimeValue(parts.hours, minute);
    if (minTime && candidate < minTime) {
      return true;
    }

    if (maxTime && candidate > maxTime) {
      return true;
    }

    return false;
  };

  const isHourDisabled = (hour: number): boolean => {
    const hours24 = ampm ? to24Hour(hour, display12.period) : hour;
    const candidate = createTimeValue(hours24, parts.minutes);
    if (minTime && candidate < minTime) {
      return true;
    }

    if (maxTime && candidate > maxTime) {
      return true;
    }

    return false;
  };

  return (
    <div
      {...rootProps}
      className={getTimeClockRootClassName({ className })}
      role="group"
      aria-label="Time"
    >
      <div className={TIME_CLOCK_COLUMN_CLASS}>
        <span className={TIME_CLOCK_LABEL_CLASS}>Hour</span>
        <div className={TIME_CLOCK_LIST_CLASS} role="listbox" aria-label="Hour">
          {hourOptions.map((hour) => {
            const selected = ampm ? display12.hour === hour : parts.hours === hour;

            return (
              <button
                key={hour}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled || isHourDisabled(hour)}
                className={getTimeClockOptionClassName({
                  selected,
                  disabled: disabled || isHourDisabled(hour),
                })}
                onClick={() => {
                  updateTime(ampm ? to24Hour(hour, display12.period) : hour, parts.minutes);
                }}
              >
                {localizeDigits(String(hour).padStart(2, '0'), locale)}
              </button>
            );
          })}
        </div>
      </div>

      <div className={TIME_CLOCK_COLUMN_CLASS}>
        <span className={TIME_CLOCK_LABEL_CLASS}>Minute</span>
        <div className={TIME_CLOCK_LIST_CLASS} role="listbox" aria-label="Minute">
          {minuteOptions.map((minute) => {
            const selected = parts.minutes === minute;

            return (
              <button
                key={minute}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled || isMinuteDisabled(minute)}
                className={getTimeClockOptionClassName({
                  selected,
                  disabled: disabled || isMinuteDisabled(minute),
                })}
                onClick={() => {
                  updateTime(parts.hours, minute);
                }}
              >
                {localizeDigits(String(minute).padStart(2, '0'), locale)}
              </button>
            );
          })}
        </div>
      </div>

      {ampm ? (
        <div className={TIME_CLOCK_PERIOD_CLASS}>
          <span className={TIME_CLOCK_LABEL_CLASS}>Period</span>
          <div className={TIME_CLOCK_LIST_CLASS} role="listbox" aria-label="AM or PM">
            {(['AM', 'PM'] as const).map((period) => {
              const selected = display12.period === period;

              return (
                <button
                  key={period}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={disabled}
                  className={getTimeClockOptionClassName({ selected, disabled })}
                  onClick={() => {
                    updateTime(to24Hour(display12.hour, period), parts.minutes);
                  }}
                >
                  {period}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

TimeClock.displayName = 'TimeClock';

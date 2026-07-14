import {
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { DateValue } from '../../../date/calendars';
import { getCalendarAdapter } from '../../../date/calendars';
import type { DateTimeValue, TimeValue } from '../../../date/time';
import {
  combineDateAndTime,
  createNowDateTimeValue,
  formatDateTimeValue,
  splitDateTimeValue,
} from '../../../date/time';
import { useControllableBoolean, useControllableState } from '../../../hooks/useControllableState';
import { usePickerPopover } from '../../../hooks/usePickerPopover';
import { useResolvedLocale } from '../../../hooks/useResolvedLocale';
import { useTextDirection } from '../../../hooks/useTextDirection';
import { resolveDirFromLocale } from '../../../locale/locale';
import { Calendar } from '../Calendar';
import {
  DATE_PICKER_ACTION_BUTTON_CLASS,
  DATE_PICKER_ACTIONS_CLASS,
  DATE_PICKER_ICON_BUTTON_CLASS,
  DATE_PICKER_INPUT_CLASS,
  getDatePickerPanelClassName,
  getDatePickerRootClassName,
  getDatePickerTriggerClassName,
} from '../DatePicker/DatePicker.styles';
import { TimeClock } from '../TimeClock';
import type { DateTimePickerProps } from './DateTimePicker.types';

const DEFAULT_PLACEHOLDER = 'Select date and time';
const DEFAULT_APPLY_LABEL = 'Apply';
const DEFAULT_CANCEL_LABEL = 'Cancel';
const DEFAULT_CLEAR_LABEL = 'Clear';
const DEFAULT_TODAY_LABEL = 'Today';

const DateTimeIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M6.667 3.333v1.667M13.333 3.333v1.667M4.167 6.667h11.666M5.833 4.167h8.334c.92 0 1.666.746 1.666 1.666v10c0 .92-.746 1.667-1.666 1.667H5.833c-.92 0-1.666-.747-1.666-1.667v-10c0-.92.746-1.666 1.666-1.666Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker(props, ref) {
    const {
      ampm = false,
      applyLabel = DEFAULT_APPLY_LABEL,
      calendar = 'gregorian',
      cancelLabel = DEFAULT_CANCEL_LABEL,
      className,
      clearLabel = DEFAULT_CLEAR_LABEL,
      dateFormat,
      defaultOpen,
      defaultValue = null,
      disabled = false,
      disabledDates,
      disabledWeekdays,
      format,
      id: idProp,
      invalid = false,
      locale: localeProp,
      maxDate,
      minDate,
      minuteStep = 5,
      name,
      onChange,
      onOpenChange,
      open,
      placeholder = DEFAULT_PLACEHOLDER,
      readOnly = false,
      showClearButton = true,
      size = 'medium',
      timeFormat,
      todayLabel = DEFAULT_TODAY_LABEL,
      value,
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
      ...rootProps
    } = props;

    const locale = useResolvedLocale(localeProp);
    const generatedId = useId();
    const resolvedId = idProp ?? generatedId;
    const panelId = `${resolvedId}-panel`;
    const rootRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { isRtl } = useTextDirection({ dir: resolveDirFromLocale(locale) });

    const { value: committedValue, setValue } = useControllableState<DateTimeValue | null>({
      value,
      defaultValue,
      onChange,
    });
    const { value: isOpen, setValue: setOpen } = useControllableBoolean({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const [draftDate, setDraftDate] = useState<DateValue | null>(
      () => splitDateTimeValue(committedValue).date,
    );
    const [draftTime, setDraftTime] = useState<TimeValue | null>(
      () => splitDateTimeValue(committedValue).time,
    );

    const adapter = useMemo(() => getCalendarAdapter(calendar, locale), [calendar, locale]);

    const disableOptions = useMemo(
      () => ({ minDate, maxDate, disabledDates, disabledWeekdays }),
      [disabledDates, disabledWeekdays, maxDate, minDate],
    );

    const displayValue = useMemo(
      () =>
        formatDateTimeValue(committedValue, {
          ampm,
          calendar,
          dateFormat: dateFormat ?? format,
          locale,
          timeFormat,
        }),
      [ampm, calendar, committedValue, dateFormat, format, locale, timeFormat],
    );

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const resetDraft = useCallback(() => {
      const parts = splitDateTimeValue(committedValue);
      setDraftDate(parts.date ?? adapter.createTodayIso());
      setDraftTime(parts.time ?? '12:00');
    }, [adapter, committedValue]);

    const closePanel = useCallback(() => {
      setOpen(false);
      inputRef.current?.focus();
    }, [setOpen]);

    const openPanel = useCallback(() => {
      if (disabled || readOnly) return;
      resetDraft();
      setOpen(true);
    }, [disabled, readOnly, resetDraft, setOpen]);

    usePickerPopover({ isOpen, closePanel, rootRef });

    const handleApply = () => {
      if (!draftDate || !draftTime) {
        return;
      }

      setValue(combineDateAndTime(draftDate, draftTime));
      closePanel();
    };

    const handleCancel = () => {
      resetDraft();
      closePanel();
    };

    const handleClear = () => {
      setValue(null);
      closePanel();
    };

    const handleToday = () => {
      const now = createNowDateTimeValue();
      const parts = splitDateTimeValue(now);
      setDraftDate(parts.date);
      setDraftTime(parts.time);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPanel();
      }
    };

    return (
      <div
        {...rootProps}
        ref={rootRef}
        className={getDatePickerRootClassName({ className })}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className={getDatePickerTriggerClassName({ size, invalid, disabled, readOnly })}>
          <input
            ref={setInputRef}
            id={resolvedId}
            name={name}
            type="text"
            role="combobox"
            readOnly
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls={isOpen ? panelId : undefined}
            className={DATE_PICKER_INPUT_CLASS}
            onClick={openPanel}
            onKeyDown={handleTriggerKeyDown}
          />

          <button
            type="button"
            tabIndex={-1}
            className={DATE_PICKER_ICON_BUTTON_CLASS}
            onClick={openPanel}
            disabled={disabled || readOnly}
            aria-label="Open date and time picker"
          >
            <DateTimeIcon />
          </button>
        </div>

        {isOpen ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose date and time"
            className={getDatePickerPanelClassName()}
          >
            <Calendar
              calendar={calendar}
              locale={locale}
              size={size}
              selectedIsoDate={draftDate}
              disableOptions={disableOptions}
              onSelect={setDraftDate}
              showFooter={false}
              todayLabel={todayLabel}
            />

            <div className="border-t border-border bg-background p-sm">
              <TimeClock
                ampm={ampm}
                locale={locale}
                minuteStep={minuteStep}
                value={draftTime}
                disabled={disabled}
                onChange={setDraftTime}
              />
            </div>

            <div
              className={`${DATE_PICKER_ACTIONS_CLASS} rounded-b-md border border-t-0 border-border bg-background`}
            >
              <button
                type="button"
                className={DATE_PICKER_ACTION_BUTTON_CLASS}
                onClick={handleToday}
                disabled={disabled}
              >
                {todayLabel}
              </button>

              <div className="flex items-center gap-sm">
                {showClearButton ? (
                  <button
                    type="button"
                    className={DATE_PICKER_ACTION_BUTTON_CLASS}
                    onClick={handleClear}
                    disabled={disabled || !committedValue}
                  >
                    {clearLabel}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={DATE_PICKER_ACTION_BUTTON_CLASS}
                  onClick={handleCancel}
                  disabled={disabled}
                >
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  className={DATE_PICKER_ACTION_BUTTON_CLASS}
                  onClick={handleApply}
                  disabled={disabled || !draftDate || !draftTime}
                >
                  {applyLabel}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';

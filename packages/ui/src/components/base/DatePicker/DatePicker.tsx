import { forwardRef, type KeyboardEvent, useCallback, useId, useMemo, useRef } from 'react';

import type { DateValue } from '../../../date/calendars';
import { DEFAULT_DATE_FORMAT, formatDateValue, getCalendarAdapter } from '../../../date/calendars';
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
} from './DatePicker.styles';
import type { DatePickerProps } from './DatePicker.types';

const DEFAULT_PLACEHOLDER = 'Select date';
const DEFAULT_TODAY_LABEL = 'Today';
const DEFAULT_CLEAR_LABEL = 'Clear';

const CalendarIcon = () => (
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

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const {
      calendar = 'gregorian',
      className,
      clearLabel = DEFAULT_CLEAR_LABEL,
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
      name,
      onChange,
      onOpenChange,
      open,
      placeholder = DEFAULT_PLACEHOLDER,
      readOnly = false,
      showClearButton = true,
      showTodayButton = true,
      size = 'medium',
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

    const { value: selectedValue, setValue } = useControllableState<DateValue | null>({
      value,
      defaultValue,
      onChange,
    });
    const { value: isOpen, setValue: setOpen } = useControllableBoolean({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const adapter = useMemo(() => getCalendarAdapter(calendar, locale), [calendar, locale]);
    const resolvedFormat = format ?? DEFAULT_DATE_FORMAT[calendar];

    const disableOptions = useMemo(
      () => ({
        minDate,
        maxDate,
        disabledDates,
        disabledWeekdays,
      }),
      [disabledDates, disabledWeekdays, maxDate, minDate],
    );

    const displayValue = useMemo(
      () => formatDateValue(selectedValue, { calendar, locale, format: resolvedFormat }),
      [calendar, locale, resolvedFormat, selectedValue],
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

    const closePanel = useCallback(() => {
      setOpen(false);
      inputRef.current?.focus();
    }, [setOpen]);

    const openPanel = useCallback(() => {
      if (disabled || readOnly) return;
      setOpen(true);
    }, [disabled, readOnly, setOpen]);

    usePickerPopover({ isOpen, closePanel, rootRef });

    const handleSelect = (isoDate: DateValue) => {
      setValue(isoDate);
      closePanel();
    };

    const handleClear = () => {
      setValue(null);
      closePanel();
    };

    const handleToday = () => {
      const todayIso = adapter.createTodayIso();
      setValue(todayIso);
      closePanel();
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
            aria-label="Open calendar"
          >
            <CalendarIcon />
          </button>
        </div>

        {isOpen ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose date"
            className={getDatePickerPanelClassName()}
          >
            <Calendar
              calendar={calendar}
              locale={locale}
              size={size}
              selectedIsoDate={selectedValue}
              disableOptions={disableOptions}
              onSelect={handleSelect}
              showFooter={false}
              todayLabel={todayLabel}
            />

            {showTodayButton || showClearButton ? (
              <div
                className={`${DATE_PICKER_ACTIONS_CLASS} rounded-b-md border border-t-0 border-border bg-background`}
              >
                {showTodayButton ? (
                  <button
                    type="button"
                    className={DATE_PICKER_ACTION_BUTTON_CLASS}
                    onClick={handleToday}
                    disabled={disabled}
                  >
                    {todayLabel}
                  </button>
                ) : (
                  <span />
                )}

                {showClearButton ? (
                  <button
                    type="button"
                    className={DATE_PICKER_ACTION_BUTTON_CLASS}
                    onClick={handleClear}
                    disabled={disabled || !selectedValue}
                  >
                    {clearLabel}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';

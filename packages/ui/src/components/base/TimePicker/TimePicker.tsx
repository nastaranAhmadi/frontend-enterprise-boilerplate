import { forwardRef, type KeyboardEvent, useCallback, useId, useMemo, useRef } from 'react';

import type { TimeValue } from '../../../date/time';
import { formatTimeValue } from '../../../date/time';
import { useControllableBoolean, useControllableState } from '../../../hooks/useControllableState';
import { usePickerPopover } from '../../../hooks/usePickerPopover';
import { useResolvedLocale } from '../../../hooks/useResolvedLocale';
import { useTextDirection } from '../../../hooks/useTextDirection';
import { resolveDirFromLocale } from '../../../locale/locale';
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
import type { TimePickerProps } from './TimePicker.types';

const DEFAULT_PLACEHOLDER = 'Select time';
const DEFAULT_CLEAR_LABEL = 'Clear';

const ClockIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M10 5.833v4.167l2.5 1.667M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  function TimePicker(props, ref) {
    const {
      ampm = false,
      className,
      clearLabel = DEFAULT_CLEAR_LABEL,
      defaultOpen,
      defaultValue = null,
      disabled = false,
      format,
      id: idProp,
      invalid = false,
      locale: localeProp,
      maxTime,
      minTime,
      minuteStep = 5,
      name,
      onChange,
      onOpenChange,
      open,
      placeholder = DEFAULT_PLACEHOLDER,
      readOnly = false,
      showClearButton = true,
      size = 'medium',
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

    const { value: selectedValue, setValue } = useControllableState<TimeValue | null>({
      value,
      defaultValue,
      onChange,
    });
    const { value: isOpen, setValue: setOpen } = useControllableBoolean({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const displayValue = useMemo(
      () => formatTimeValue(selectedValue, { ampm, format, locale }),
      [ampm, format, locale, selectedValue],
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
            aria-label="Open time picker"
          >
            <ClockIcon />
          </button>
        </div>

        {isOpen ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose time"
            className={getDatePickerPanelClassName()}
          >
            <TimeClock
              ampm={ampm}
              locale={locale}
              minuteStep={minuteStep}
              minTime={minTime}
              maxTime={maxTime}
              value={selectedValue}
              disabled={disabled}
              onChange={(nextTime) => {
                setValue(nextTime);
                closePanel();
              }}
            />

            {showClearButton ? (
              <div
                className={`${DATE_PICKER_ACTIONS_CLASS} rounded-b-md border border-t-0 border-border bg-background`}
              >
                <span />
                <button
                  type="button"
                  className={DATE_PICKER_ACTION_BUTTON_CLASS}
                  onClick={() => {
                    setValue(null);
                    closePanel();
                  }}
                  disabled={disabled || !selectedValue}
                >
                  {clearLabel}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';

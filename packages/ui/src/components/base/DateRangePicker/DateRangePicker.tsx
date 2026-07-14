import {
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { DEFAULT_DATE_FORMAT } from '../../../date/calendars';
import type { DateRangeValue } from '../../../date/time';
import {
  DEFAULT_RANGE_PRESETS,
  EMPTY_DATE_RANGE,
  formatDateRangeValue,
  getRangePresetValue,
  isCompleteDateRange,
  normalizeDateRange,
} from '../../../date/time';
import type { RangePresetId } from '../../../date/time/rangePresets';
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
  getDatePickerRootClassName,
  getDatePickerTriggerClassName,
} from '../DatePicker/DatePicker.styles';
import {
  DATE_RANGE_CALENDAR_CLASS,
  DATE_RANGE_PICKER_PANEL_CLASS,
  DATE_RANGE_PRESETS_CLASS,
  getDateRangePresetButtonClassName,
} from './DateRangePicker.styles';
import type { DateRangePickerProps } from './DateRangePicker.types';

const DEFAULT_PLACEHOLDER = 'Select date range';
const DEFAULT_APPLY_LABEL = 'Apply';
const DEFAULT_CANCEL_LABEL = 'Cancel';
const DEFAULT_CLEAR_LABEL = 'Clear';

const RangeIcon = () => (
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

export const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  function DateRangePicker(props, ref) {
    const {
      applyLabel = DEFAULT_APPLY_LABEL,
      calendar = 'gregorian',
      cancelLabel = DEFAULT_CANCEL_LABEL,
      className,
      clearLabel = DEFAULT_CLEAR_LABEL,
      defaultOpen,
      defaultValue = EMPTY_DATE_RANGE,
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
      presets = DEFAULT_RANGE_PRESETS,
      readOnly = false,
      separator,
      showClearButton = true,
      showPresets = true,
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

    const { value: committedValue, setValue } = useControllableState<DateRangeValue>({
      value,
      defaultValue,
      onChange,
    });
    const { value: isOpen, setValue: setOpen } = useControllableBoolean({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const [draftRange, setDraftRange] = useState<DateRangeValue>(committedValue);
    const [activePreset, setActivePreset] = useState<RangePresetId | null>(null);

    const resolvedFormat = format ?? DEFAULT_DATE_FORMAT[calendar];

    const disableOptions = useMemo(
      () => ({ minDate, maxDate, disabledDates, disabledWeekdays }),
      [disabledDates, disabledWeekdays, maxDate, minDate],
    );

    const displayValue = useMemo(
      () =>
        formatDateRangeValue(committedValue, {
          calendar,
          format: resolvedFormat,
          locale,
          separator,
        }),
      [calendar, committedValue, locale, resolvedFormat, separator],
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
      setDraftRange(committedValue);
      setActivePreset(null);
    }, [committedValue]);

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
      setValue(normalizeDateRange(draftRange));
      closePanel();
    };

    const handleCancel = () => {
      resetDraft();
      closePanel();
    };

    const handleClear = () => {
      setValue(EMPTY_DATE_RANGE);
      closePanel();
    };

    const handlePreset = (presetId: RangePresetId) => {
      const nextRange = getRangePresetValue(presetId);
      setDraftRange(nextRange);
      setActivePreset(presetId);
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
            aria-label="Open date range picker"
          >
            <RangeIcon />
          </button>
        </div>

        {isOpen ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="Choose date range"
            className={DATE_RANGE_PICKER_PANEL_CLASS}
          >
            {showPresets ? (
              <div className={DATE_RANGE_PRESETS_CLASS} role="listbox" aria-label="Range presets">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    role="option"
                    aria-selected={activePreset === preset.id}
                    className={getDateRangePresetButtonClassName({
                      selected: activePreset === preset.id,
                    })}
                    onClick={() => {
                      handlePreset(preset.id);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className={DATE_RANGE_CALENDAR_CLASS}>
              <Calendar
                calendar={calendar}
                locale={locale}
                size={size}
                mode="range"
                selectedRange={draftRange}
                disableOptions={disableOptions}
                onRangeChange={(nextRange) => {
                  setDraftRange(nextRange);
                  setActivePreset(null);
                }}
                showFooter={false}
              />

              <div className={`${DATE_PICKER_ACTIONS_CLASS} border-t border-border`}>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {isCompleteDateRange(draftRange)
                    ? formatDateRangeValue(draftRange, {
                        calendar,
                        format: resolvedFormat,
                        locale,
                        separator,
                      })
                    : 'Select start and end dates'}
                </span>

                <div className="flex items-center gap-sm">
                  {showClearButton ? (
                    <button
                      type="button"
                      className={DATE_PICKER_ACTION_BUTTON_CLASS}
                      onClick={handleClear}
                      disabled={disabled}
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
                    disabled={disabled || !isCompleteDateRange(draftRange)}
                  >
                    {applyLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

DateRangePicker.displayName = 'DateRangePicker';

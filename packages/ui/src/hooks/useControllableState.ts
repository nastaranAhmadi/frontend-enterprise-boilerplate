import { useCallback, useState } from 'react';

export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
}): { value: T; setValue: (nextValue: T) => void } => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? (value as T) : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return { value: resolvedValue, setValue };
};

export const useControllableBoolean = ({
  value,
  defaultValue = false,
  onChange,
}: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (nextValue: boolean) => void;
}): { value: boolean; setValue: (nextValue: boolean) => void } =>
  useControllableState({
    value,
    defaultValue,
    onChange,
  });

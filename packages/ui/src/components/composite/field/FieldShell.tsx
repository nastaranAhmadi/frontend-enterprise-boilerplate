import type { ReactNode } from 'react';

import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { Label } from '../../base/Label';
import { getFieldRootClassName } from './field.styles';
import type { SharedFieldProps } from './field.types';
import { type FieldShellState, useFieldShell } from './useFieldShell';

export type FieldLabelPlacement = 'top' | 'inline-control-first';

export type FieldControlProps = Pick<FieldShellState, 'id' | 'ariaDescribedBy' | 'hasError'>;

export interface FieldShellProps extends SharedFieldProps {
  control: (field: FieldControlProps) => ReactNode;
  labelPlacement?: FieldLabelPlacement;
  controlRowClassName?: string;
}

export const FieldShell = function FieldShell(props: FieldShellProps) {
  const {
    label,
    helperText,
    error: errorMessage,
    required,
    className,
    disabled,
    size,
    control,
    labelPlacement = 'top',
    controlRowClassName,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
  } = props;

  const field = useFieldShell({
    id: idProp,
    helperText,
    error: errorMessage,
    'aria-describedby': ariaDescribedByProp,
  });

  const controlNode = control({
    id: field.id,
    ariaDescribedBy: field.ariaDescribedBy,
    hasError: field.hasError,
  });

  const labelElement = label ? (
    <Label htmlFor={field.id} required={required} disabled={disabled} size={size}>
      {label}
    </Label>
  ) : null;

  return (
    <div className={getFieldRootClassName({ className })}>
      {labelPlacement === 'top' ? labelElement : null}

      {labelPlacement === 'inline-control-first' ? (
        <div className={controlRowClassName}>
          {controlNode}
          {labelElement}
        </div>
      ) : (
        controlNode
      )}

      {field.hasHelperText ? (
        <HelperText id={field.helperId} disabled={disabled} size={size}>
          {helperText}
        </HelperText>
      ) : null}

      {field.hasError ? (
        <ErrorMessage id={field.errorId} size={size}>
          {errorMessage}
        </ErrorMessage>
      ) : null}
    </div>
  );
};

FieldShell.displayName = 'FieldShell';

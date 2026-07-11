import { useId } from 'react';

import type { SharedFieldProps } from './field.types';
import { buildAriaDescribedBy } from './fieldAccessibility';

export interface FieldShellState {
  id: string;
  helperId: string;
  errorId: string;
  hasHelperText: boolean;
  hasError: boolean;
  ariaDescribedBy: string | undefined;
}

export const useFieldShell = ({
  id: idProp,
  helperText,
  error: errorMessage,
  'aria-describedby': ariaDescribedByProp,
}: Pick<SharedFieldProps, 'id' | 'helperText' | 'error' | 'aria-describedby'>): FieldShellState => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasHelperText = Boolean(helperText);
  const hasError = Boolean(errorMessage);
  const ariaDescribedBy = buildAriaDescribedBy(
    hasHelperText ? helperId : undefined,
    hasError ? errorId : undefined,
    ariaDescribedByProp,
  );

  return { id, helperId, errorId, hasHelperText, hasError, ariaDescribedBy };
};

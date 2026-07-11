import { type ForwardedRef, forwardRef } from 'react';

import {
  getLabelClassName,
  type LabelClassNameInput,
  REQUIRED_INDICATOR,
  REQUIRED_INDICATOR_CLASS,
} from './Label.styles';
import type { FieldLegendProps } from './Label.types';

function FieldLegendComponent(props: FieldLegendProps, ref: ForwardedRef<HTMLLegendElement>) {
  const labelClassNames: LabelClassNameInput = {
    size: props.size,
    disabled: props.disabled,
    className: props.className,
  };

  return (
    <legend id={props.id} ref={ref} className={getLabelClassName(labelClassNames)}>
      {props.children}
      {props.required ? (
        <span aria-hidden="true" className={REQUIRED_INDICATOR_CLASS}>
          {REQUIRED_INDICATOR}
        </span>
      ) : null}
    </legend>
  );
}

export const FieldLegend = forwardRef(FieldLegendComponent);

FieldLegend.displayName = 'FieldLegend';

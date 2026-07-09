import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface HelperTextOwnProps {
  disabled?: boolean;
  size?: Size;
}

export type HelperTextProps = HelperTextOwnProps &
  Omit<HTMLAttributes<HTMLParagraphElement>, keyof HelperTextOwnProps>;

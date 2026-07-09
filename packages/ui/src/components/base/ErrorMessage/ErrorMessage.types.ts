import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface ErrorMessageOwnProps {
  size?: Size;
}

export type ErrorMessageProps = ErrorMessageOwnProps &
  Omit<HTMLAttributes<HTMLParagraphElement>, keyof ErrorMessageOwnProps>;

import { useMemo } from 'react';

import {
  resolveTextDirection,
  type TextDirection,
  type TextDirectionState,
} from '../direction/textDirection';
import { useOptionalDesignSystem } from '../providers/DesignSystemContext';

export interface UseTextDirectionOptions {
  /** Explicit override. Takes precedence over provider and document direction. */
  dir?: TextDirection;
}

/**
 * Resolves the active text direction for layout, navigation, and positioning.
 *
 * Priority: explicit `dir` prop → DesignSystemProvider → document root → `ltr`.
 *
 * For portaled UI (e.g. Tooltip), call `resolveTextDirection({ element })` at
 * interaction time so the trigger's ancestor `dir` is respected.
 */
export const useTextDirection = (options: UseTextDirectionOptions = {}): TextDirectionState => {
  const provider = useOptionalDesignSystem();

  return useMemo(
    () =>
      resolveTextDirection({
        dir: options.dir,
        providerDir: provider?.dir,
      }),
    [options.dir, provider?.dir],
  );
};

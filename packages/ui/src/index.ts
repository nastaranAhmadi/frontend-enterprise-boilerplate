import { PACKAGE_NAME as DesignTokensPackageName } from '@enterprise/design-tokens';
import { PACKAGE_NAME as SharedPackageName } from '@enterprise/shared';
import { PACKAGE_NAME as ThemePackageName } from '@enterprise/theme';
import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';
import type { ReactNode } from 'react';

/** Infrastructure placeholder — design system exports will be added in later sections. */
export const PACKAGE_NAME = '@enterprise/ui' as const;

export type UiInfrastructureProps = {
  children?: ReactNode;
};

export function getUiDependencies(): {
  designTokens: typeof DesignTokensPackageName;
  shared: typeof SharedPackageName;
  theme: typeof ThemePackageName;
  types: typeof TypesPackageName;
} {
  return {
    designTokens: DesignTokensPackageName,
    shared: SharedPackageName,
    theme: ThemePackageName,
    types: TypesPackageName,
  };
}

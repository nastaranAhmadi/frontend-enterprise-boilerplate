import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';
import { PACKAGE_NAME as UiPackageName } from '@enterprise/ui';

/** Infrastructure placeholder — Next.js application scaffold (no pages yet). */
export const APP_NAME = 'landing' as const;

export function getLandingDependencies(): {
  types: typeof TypesPackageName;
  ui: typeof UiPackageName;
} {
  return {
    types: TypesPackageName,
    ui: UiPackageName,
  };
}

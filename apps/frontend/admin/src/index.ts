import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';
import { PACKAGE_NAME as UiPackageName } from '@enterprise/ui';

/** Infrastructure placeholder — Vite CSR application scaffold (no pages yet). */
export const APP_NAME = 'admin' as const;

export function getAdminDependencies(): {
  types: typeof TypesPackageName;
  ui: typeof UiPackageName;
} {
  return {
    types: TypesPackageName,
    ui: UiPackageName,
  };
}

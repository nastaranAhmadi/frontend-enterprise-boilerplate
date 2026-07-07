import { PACKAGE_NAME as ConfigPackageName } from '@enterprise/config';
import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';
import { PACKAGE_NAME as UtilsPackageName } from '@enterprise/utils';
import { PACKAGE_NAME as ValidationPackageName } from '@enterprise/validation';

/** Infrastructure placeholder — cross-cutting shared modules will be added in later sections. */
export const PACKAGE_NAME = '@enterprise/shared' as const;

export function getSharedDependencies(): {
  config: typeof ConfigPackageName;
  types: typeof TypesPackageName;
  utils: typeof UtilsPackageName;
  validation: typeof ValidationPackageName;
} {
  return {
    config: ConfigPackageName,
    types: TypesPackageName,
    utils: UtilsPackageName,
    validation: ValidationPackageName,
  };
}

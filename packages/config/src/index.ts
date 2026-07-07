import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';
import { PACKAGE_NAME as ValidationPackageName } from '@enterprise/validation';

/** Infrastructure placeholder — environment config will be added in later sections. */
export const PACKAGE_NAME = '@enterprise/config' as const;

export function getConfigDependencies(): {
  types: typeof TypesPackageName;
  validation: typeof ValidationPackageName;
} {
  return {
    types: TypesPackageName,
    validation: ValidationPackageName,
  };
}

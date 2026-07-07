import { PACKAGE_NAME as TypesPackageName } from '@enterprise/types';

/** Infrastructure placeholder — utility exports will be added in later sections. */
export const PACKAGE_NAME = '@enterprise/utils' as const;

export function getWorkspacePackageName(): typeof TypesPackageName {
  return TypesPackageName;
}

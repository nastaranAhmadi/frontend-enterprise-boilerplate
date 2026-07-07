export type Permission = string;
export type Role = string;

export type PermissionMap = Record<Role, readonly Permission[]>;

export interface PermissionChecker {
  can(permission: Permission): boolean;
  canAny(permissions: readonly Permission[]): boolean;
  canAll(permissions: readonly Permission[]): boolean;
}

export type CreatePermissionCheckerOptions = {
  role: Role;
  permissionMap: PermissionMap;
};

/** Creates a role-based permission checker. No business rules — infrastructure only. */
export function createPermissionChecker(
  options: CreatePermissionCheckerOptions,
): PermissionChecker {
  const permissions = new Set(options.permissionMap[options.role] ?? []);

  return {
    can: (permission) => permissions.has(permission),
    canAny: (required) => required.some((permission) => permissions.has(permission)),
    canAll: (required) => required.every((permission) => permissions.has(permission)),
  };
}

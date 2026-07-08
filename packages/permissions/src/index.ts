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

export interface PermissionPolicy {
  readonly roles: readonly Role[];
  readonly permissions: PermissionMap;
}

/** 权限匹配模式：some 满足任一，every 满足全部 */
export type PermissionMatchMode = "some" | "every";

const matchValues = (owned: string[], required: string[], mode: PermissionMatchMode): boolean => {
  if (!required.length) return true;
  if (!owned.length) return false;

  return mode === "every"
    ? required.every((item) => owned.includes(item))
    : required.some((item) => owned.includes(item));
};

/** 角色匹配 */
export const matchRole = (userRoles: string[], requiredRoles?: string[], mode: PermissionMatchMode = "some"): boolean =>
  matchValues(userRoles, requiredRoles ?? [], mode);

/** 权限码匹配 */
export const matchPermission = (
  userPermissions: string[],
  requiredPermissions?: string[],
  mode: PermissionMatchMode = "some"
): boolean => matchValues(userPermissions, requiredPermissions ?? [], mode);

export interface RouteAccessMeta {
  roles?: string[];
  permissions?: string[];
}

import type { PermissionMatchMode } from "@/utils/permission";
import { matchPermission, matchRole } from "@/utils/permission";

export const usePermission = () => {
  const userStore = useUserStore();

  const hasRole = (
    role: string | string[],
    mode: PermissionMatchMode = "some"
  ) => {
    const required = Array.isArray(role) ? role : [role];
    return matchRole(userStore.roles, required, mode);
  };

  const hasPermission = (
    permission: string | string[],
    mode: PermissionMatchMode = "some"
  ) => {
    const required = Array.isArray(permission) ? permission : [permission];
    return matchPermission(userStore.permissions, required, mode);
  };

  return {
    roles: computed(() => userStore.roles),
    permissions: computed(() => userStore.permissions),
    hasRole,
    hasPermission,
  };
};

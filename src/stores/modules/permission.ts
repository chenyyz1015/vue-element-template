import type { AppRouteRecordRaw } from "@/router/types";
import { filterAccessibleRoutes } from "@/router/helpers";
import { asyncRoutes } from "@/router/modules";

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<AppRouteRecordRaw[]>([]);
  const isRoutesGenerated = ref(false);

  const generateRoutes = (roles: string[], permissions: string[]) => {
    const accessedRoutes = filterAccessibleRoutes(
      asyncRoutes,
      roles,
      permissions
    );
    routes.value = accessedRoutes;
    isRoutesGenerated.value = true;
    return accessedRoutes;
  };

  const resetPermission = () => {
    routes.value = [];
    isRoutesGenerated.value = false;
  };

  return {
    routes,
    isRoutesGenerated,
    generateRoutes,
    resetPermission,
  };
});

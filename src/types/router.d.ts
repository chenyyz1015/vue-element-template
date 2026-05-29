import type { SvgName } from "~virtual/svg-component";
import type { PermissionMatchMode } from "@/utils/permission";
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    /** i18n 标题 key */
    titleKey?: string;
    /** 导航图标（SvgIcon name） */
    icon?: SvgName;
    /** 是否需要登录 */
    requiresAuth?: boolean;
    /** 允许访问的角色（与 permissions 同时存在时为 AND） */
    roles?: string[];
    /** 允许访问的权限码（与 roles 同时存在时为 AND） */
    permissions?: string[];
    /** 角色匹配模式，默认 some */
    roleMode?: PermissionMatchMode;
    /** 权限匹配模式，默认 some */
    permissionMode?: PermissionMatchMode;
    /** 是否在导航菜单中隐藏 */
    hidden?: boolean;
  }
}

import type { AppRouteRecordRaw } from "../types";
import { adminRoutes } from "./admin";

/** 需登录后按权限动态注册的业务路由模块 */
export const asyncRoutes: AppRouteRecordRaw[] = [...adminRoutes];

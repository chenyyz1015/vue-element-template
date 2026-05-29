import type { LoginParams, LoginResult, UserProfile } from "@/api/types/auth";
import { post } from "@/api/request";

/** 用户登录 */
export function login(data: LoginParams) {
  return post<LoginResult>("/auth/login", data);
}

/** 获取当前用户信息与权限 */
export function getUserProfile() {
  return post<UserProfile>("/auth/profile");
}

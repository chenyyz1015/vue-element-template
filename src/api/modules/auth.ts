import type { AjaxResult } from "../types/common";
import type { LoginParams, LoginPhoneParams, LoginResult, UserInfoResult } from "@/api/types/auth";
import * as request from "@/api/request";

/** 登录 */
export function login(data: LoginParams | LoginPhoneParams) {
  return request.post<AjaxResult<LoginResult>>("/login", data, { skipAuth: true });
}

/** 获取当前用户信息 */
export function getInfo() {
  return request.get<AjaxResult<UserInfoResult>>("/getInfo");
}

/** 登出 */
export function logout() {
  return request.post("/logout");
}

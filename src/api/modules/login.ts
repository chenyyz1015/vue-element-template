import type { CaptchaResult, LoginParams, LoginResult, RegisterParams, UserInfoResult } from "@/api/types/auth";
import type { AjaxResult } from "@/api/types/common";
import * as request from "@/api/request";

export function login(data: LoginParams) {
  return request.post<LoginResult>("/login", data, {
    skipAuth: true,
    preventRepeatSubmit: false,
  });
}

export function getInfo() {
  return request.get<UserInfoResult>("/getInfo", { cancelDuplicate: false });
}

export function logout() {
  return request.post<AjaxResult>("/logout");
}

export function getCaptchaImage() {
  return request.get<CaptchaResult>("/captchaImage", {
    skipAuth: true,
    timeout: 20_000,
  });
}

/** 注册 */
export function register(data: RegisterParams) {
  return request.post<AjaxResult>("/register", data, {
    skipAuth: true,
    preventRepeatSubmit: false,
  });
}

/** 解锁屏幕 */
export function unlockScreen(password: string) {
  return request.post<AjaxResult>("/unlockscreen", { password });
}

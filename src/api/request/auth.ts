import { removeToken } from "@/utils/auth";
import { HTTP_ERROR_MESSAGES } from "../constants";

/** 处理未授权：清除 Token 并跳转登录 */
export function handleUnauthorized(message?: string) {
  removeToken();
  if (message) {
    ElMessage.warning(message);
  }
  const { pathname, href } = window.location;
  if (!pathname.startsWith("/login")) {
    const redirect = encodeURIComponent(href);
    window.location.href = `/login?redirect=${redirect}`;
  }
}

/** 未授权默认提示 */
export function getUnauthorizedMessage(message?: string) {
  return message || HTTP_ERROR_MESSAGES[401];
}

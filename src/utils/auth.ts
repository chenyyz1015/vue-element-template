/** Token 存储键 */
export const TOKEN_KEY = "access_token";

/** 刷新 Token 存储键 */
export const REFRESH_TOKEN_KEY = "refresh_token";

/** 获取 Token */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** 获取 Token */
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

/** 清除 Token */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

import { storage } from "@/utils/storage";

/** Token 存储键 */
export const TOKEN_KEY = "ACCESS_TOKEN";

/** 刷新 Token 存储键 */
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

/** 获取 Token */
export const getToken = (): string | null => {
  return storage.local.get<string>(TOKEN_KEY);
};

/** 设置 Token */
export const setToken = (token: string) => {
  storage.local.set<string>(TOKEN_KEY, token);
};

/** 清除 Token */
export const removeToken = () => {
  storage.local.remove(TOKEN_KEY);
};

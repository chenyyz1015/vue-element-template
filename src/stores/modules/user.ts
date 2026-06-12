import type { LoginParams, LoginPhoneParams, UserInfoResult } from "@/api/types/auth";
import * as authApi from "@/api/modules/auth";
import { getToken, removeToken, setToken } from "@/utils/auth";
import { captureEvent, identifyUser, resetUser } from "@/utils/posthog";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const userInfo = ref<UserInfoResult>({
    id: "",
    username: "",
    nickname: "",
    avatar: "",
    email: "",
    phone: "",
    roles: [],
    permissions: [],
  });

  const isLoggedIn = computed(() => !!token.value);
  const userId = computed(() => userInfo.value.id);
  const username = computed(() => userInfo.value.username);
  const nickname = computed(() => userInfo.value.nickname);
  const avatar = computed(() => userInfo.value.avatar);
  const email = computed(() => userInfo.value.email);
  const phone = computed(() => userInfo.value.phone);
  const roles = computed(() => userInfo.value.roles ?? []);
  const permissions = computed(() => userInfo.value.permissions ?? []);

  /** 登录 */
  const login = async (params: LoginParams | LoginPhoneParams) => {
    const { data } = await authApi.login(params);
    token.value = data.token;
    setToken(data.token);
    if ("username" in params) {
      captureEvent("user_login", { username: params.username });
    } else {
      captureEvent("user_login", { phone: params.phone });
    }
  };

  /** 获取用户信息 */
  const getInfo = async () => {
    const { data } = await authApi.getInfo();
    userInfo.value = data;
    identifyUser(String(data.id), {
      username: data.username,
      nickname: data.nickname,
      email: data.email,
    });
  };

  /** 登出 */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // 即使接口失败也要清除本地状态
    }
    token.value = "";
    userInfo.value = {
      id: "",
      username: "",
      nickname: "",
      avatar: "",
      email: "",
      phone: "",
      roles: [],
      permissions: [],
    };
    removeToken();
    resetUser();
    captureEvent("user_logout", { username, phone });
  };

  return {
    userId,
    username,
    nickname,
    avatar,
    email,
    phone,
    token,
    userInfo,
    isLoggedIn,
    roles,
    permissions,
    login,
    getInfo,
    logout,
  };
});

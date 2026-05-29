import type { LoginParams, UserProfile } from "@/api/types/auth";
import { getUserProfile, login as loginApi } from "@/api/modules/auth";
import { resetRouter } from "@/router/helpers";
import {
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/utils/auth";

/** 开发环境 Mock 用户（对接真实 API 前用于演示 RBAC） */
const MOCK_USERS: Record<string, { password: string; profile: UserProfile }> = {
  admin: {
    password: "admin123",
    profile: {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      roles: ["admin"],
      permissions: ["admin:view", "demo:edit", "demo:delete"],
    },
  },
  viewer: {
    password: "viewer123",
    profile: {
      id: 2,
      name: "Viewer",
      email: "viewer@example.com",
      roles: ["viewer"],
      permissions: ["demo:view"],
    },
  },
};

const isMockAuthEnabled = () => import.meta.env.DEV;

export const useUserStore = defineStore("user", () => {
  const id = ref<number | null>(null);
  const name = ref("");
  const email = ref("");
  const roles = ref<string[]>([]);
  const permissions = ref<string[]>([]);

  const isLoggedIn = computed(() => Boolean(getToken()));

  const setProfile = (profile: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
  }) => {
    id.value = profile.id;
    name.value = profile.name;
    email.value = profile.email;
    roles.value = profile.roles;
    permissions.value = profile.permissions;
  };

  const resetProfile = () => {
    id.value = null;
    name.value = "";
    email.value = "";
    roles.value = [];
    permissions.value = [];
  };

  const fetchUserInfo = async () => {
    if (isMockAuthEnabled()) {
      const token = getToken();
      const mockKey = token?.startsWith("mock:") ? token.slice(5) : "admin";
      const mockUser = MOCK_USERS[mockKey];

      if (!mockUser) {
        throw new Error("Invalid mock user");
      }

      setProfile(mockUser.profile);
      return mockUser.profile;
    }

    const { data } = await getUserProfile();
    setProfile(data);
    return data;
  };

  const login = async (params: LoginParams) => {
    if (isMockAuthEnabled()) {
      const mockUser = MOCK_USERS[params.username];

      if (!mockUser || mockUser.password !== params.password) {
        throw new Error("Invalid credentials");
      }

      setToken(`mock:${params.username}`);
      setProfile(mockUser.profile);
      return mockUser.profile;
    }

    const { data } = await loginApi(params);
    setToken(data.accessToken);

    if (data.refreshToken) {
      setRefreshToken(data.refreshToken);
    }

    return fetchUserInfo();
  };

  const logout = async () => {
    removeToken();
    removeRefreshToken();
    resetProfile();
    usePermissionStore().resetPermission();
    const { default: router } = await import("@/router");
    resetRouter(router);
  };

  return {
    id,
    name,
    email,
    roles,
    permissions,
    isLoggedIn,
    setProfile,
    resetProfile,
    fetchUserInfo,
    login,
    logout,
  };
});

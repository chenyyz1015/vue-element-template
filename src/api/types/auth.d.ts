/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录响应 */
export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
}

/** 当前用户权限信息 */
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

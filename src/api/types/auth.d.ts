/** 密码登录 */
export interface LoginParams {
  /** 账号 / 邮箱 */
  username: string;
  password: string;
  code: string;
  uuid: string;
}

/** 手机验证码登录 */
export interface LoginPhoneParams {
  phone: string;
  code: string;
}

/** 登录响应 */
export interface LoginResult {
  token: string;
}

/** 用户信息 */
export interface UserInfoResult {
  id: number | string;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  roles: string[];
  permissions: string[];
}

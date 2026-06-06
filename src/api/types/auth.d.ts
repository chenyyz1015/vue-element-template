/** 注册请求参数 */
export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
  code: string;
  uuid: string;
}

/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

/** 登录响应（token 在根级） */
export interface LoginResult {
  code: number;
  msg: string;
  token: string;
}

/** 系统用户 */
export interface SysUser {
  userId?: number;
  userName?: string;
  nickName?: string;
  avatar?: string;
  email?: string;
  phonenumber?: string;
  sex?: string;
  status?: string;
  deptId?: number;
  [key: string]: unknown;
}

/** 用户信息响应 */
export interface UserInfoResult {
  code: number;
  msg: string;
  user: SysUser;
  roles: string[];
  permissions: string[];
  isDefaultModifyPwd?: boolean;
  isPasswordExpired?: boolean;
  pwdChrtype?: string;
}

/** 验证码响应 */
export interface CaptchaResult {
  code: number;
  msg: string;
  uuid: string;
  img: string;
  captchaEnabled: boolean;
}

/** 当前用户权限信息（Store 归一化） */
export interface UserProfile {
  id: number;
  name: string;
  nickName: string;
  email: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}

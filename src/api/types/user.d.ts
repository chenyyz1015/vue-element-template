/** 用户信息 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/** 用户列表查询参数 */
export interface GetUserListParams {
  page?: number;
  size?: number;
}

/** 创建用户参数 */
export type CreateUserParams = Omit<User, "id">;

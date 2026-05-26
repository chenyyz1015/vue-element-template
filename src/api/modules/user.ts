import type { PageResult } from "@/api/types/common";
import type {
  CreateUserParams,
  GetUserListParams,
  User,
} from "@/api/types/user";
import { get, post } from "@/api/request";

/** 获取用户列表 */
export function getUserList(params?: GetUserListParams) {
  return get<PageResult<User>>("/users", { params });
}

/** 获取用户详情 */
export function getUserById(id: number) {
  return get<User>(`/users/${id}`);
}

/** 创建用户 */
export function createUser(data: CreateUserParams) {
  return post<User>("/users", data);
}

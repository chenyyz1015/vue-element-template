/** 业务成功状态码 */
export const SUCCESS_BIZ_CODES = [0, 200] as const;

/** 未登录业务状态码 */
export const UNAUTHORIZED_BIZ_CODES = [401, 40101, 40001] as const;

/** 警告类业务状态码（展示 warning，仍 reject） */
export const WARNING_BIZ_CODES = [601] as const;

/** 通用上传/下载路径（相对 VITE_API_BASE_URL） */
export const COMMON_UPLOAD_PATH = "/common/upload";
export const COMMON_DOWNLOAD_PATH = "/common/download";
export const COMMON_DOWNLOAD_RESOURCE_PATH = "/common/download/resource";

/** 默认请求超时（毫秒） */
export const DEFAULT_TIMEOUT = 15_000;

/** HTTP 状态码与默认提示文案 */
export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "请求参数错误",
  401: "登录已过期，请重新登录",
  403: "没有权限访问该资源",
  404: "请求的资源不存在",
  405: "请求方法不允许",
  408: "请求超时",
  409: "资源冲突",
  422: "请求参数校验失败",
  429: "请求过于频繁，请稍后再试",
  500: "服务器内部错误",
  502: "网关错误",
  503: "服务暂不可用",
  504: "网关超时",
};

/** 网络异常默认提示 */
export const NETWORK_ERROR_MESSAGE = "网络连接异常，请检查网络后重试";

/** 请求超时提示 */
export const TIMEOUT_ERROR_MESSAGE = "请求超时，请稍后重试";

/** 未知错误提示 */
export const UNKNOWN_ERROR_MESSAGE = "请求失败，请稍后重试";

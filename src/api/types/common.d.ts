import type { AxiosRequestConfig } from "axios";

/** 统一 API 响应结构 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** ApiResponse 别名，用于包装请求返回结果 */
export type AjaxResult<T = unknown> = ApiResponse<T>;

/** 分页请求参数 */
export interface PageParams {
  page: number;
  size: number;
}

/** 扩展请求配置 */
export interface CustomRequestConfig extends AxiosRequestConfig {
  /** 是否显示错误提示，默认 true */
  showError?: boolean;
  /** 是否跳过 Token 注入，默认 false */
  skipAuth?: boolean;
  /** 是否跳过业务 code 校验（文件流、第三方接口等），默认 false */
  skipBizCheck?: boolean;
  /** 是否取消重复请求（相同 method + url + params），默认 true */
  cancelDuplicate?: boolean;
  /** 是否跳过 Sentry 上报，默认 false */
  skipSentryReport?: boolean;
  /** POST/PUT 是否启用防重复提交，默认 true */
  preventRepeatSubmit?: boolean;
  /** 防重复提交间隔（毫秒），默认 1000 */
  repeatSubmitInterval?: number;
}

/** 请求错误对象 */
export interface RequestError extends Error {
  name: "RequestError";
  /** 业务错误码 */
  bizCode?: number;
  /** HTTP 状态码 */
  httpStatus?: number;
  /** 原始响应体 */
  responseData?: unknown;
  /** 是否为取消的请求 */
  canceled?: boolean;
}

/** 错误响应体 */
export interface ApiErrorBody {
  code?: number;
  message?: string;
  data?: unknown;
}

declare module "axios" {
  interface AxiosRequestConfig {
    /** 是否显示错误提示，默认 true */
    showError?: boolean;
    /** 是否跳过 Token 注入，默认 false */
    skipAuth?: boolean;
    /** 是否跳过业务 code 校验（文件流、第三方接口等），默认 false */
    skipBizCheck?: boolean;
    /** 是否取消重复请求（相同 method + url + params），默认 true */
    cancelDuplicate?: boolean;
    /** 是否跳过 Sentry 上报，默认 false */
    skipSentryReport?: boolean;
    /** POST/PUT 是否启用防重复提交，默认 true */
    preventRepeatSubmit?: boolean;
    /** 防重复提交间隔（毫秒），默认 1000 */
    repeatSubmitInterval?: number;
    /** 内部使用：重复请求取消控制器 */
    _abortController?: AbortController;
    /** 内部使用：请求唯一标识 */
    _requestKey?: string;
  }
}

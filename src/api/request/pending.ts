import type { InternalAxiosRequestConfig } from "axios";

/** 进行中的请求（用于取消重复请求） */
const pendingRequests = new Map<string, AbortController>();

/** 生成请求唯一标识 */
export function getRequestKey(config: InternalAxiosRequestConfig): string {
  const { method = "GET", url, params, data } = config;
  const paramStr = params ? JSON.stringify(params) : "";
  const dataStr = data ? JSON.stringify(data) : "";
  return [method.toUpperCase(), url, paramStr, dataStr].join("&");
}

/** 移除 pending 请求 */
export function removePendingRequest(config: InternalAxiosRequestConfig) {
  const key = config._requestKey;
  if (key) {
    pendingRequests.delete(key);
  }
}

/** 取消重复请求 */
export function cancelDuplicateRequest(config: InternalAxiosRequestConfig) {
  const cancelDuplicate = config.cancelDuplicate ?? true;
  if (!cancelDuplicate || config.signal) {
    return;
  }

  const requestKey = getRequestKey(config);
  config._requestKey = requestKey;

  const existing = pendingRequests.get(requestKey);
  if (existing) {
    existing.abort();
    pendingRequests.delete(requestKey);
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  config._abortController = controller;
  pendingRequests.set(requestKey, controller);
}

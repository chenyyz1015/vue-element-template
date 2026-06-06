import type { CustomRequestConfig } from "../types/common";
import { service } from "./instance";
import { setupInterceptors } from "./interceptors";

setupInterceptors();

/** 统一请求方法 */
export async function request<T = unknown>(config: CustomRequestConfig) {
  return service.request<T>(config) as Promise<T>;
}

export async function get<T = unknown>(url: string, params?: unknown, config?: CustomRequestConfig) {
  return request<T>({ ...(config ?? {}), method: "GET", url, params });
}

export async function post<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig) {
  return request<T>({ ...(config ?? {}), method: "POST", url, data });
}

export async function put<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig) {
  return request<T>({ ...(config ?? {}), method: "PUT", url, data });
}

export async function patch<T = unknown>(url: string, data?: unknown, config?: CustomRequestConfig) {
  return request<T>({ ...(config ?? {}), method: "PATCH", url, data });
}

export async function del<T = unknown>(url: string, params?: unknown, config?: CustomRequestConfig) {
  return request<T>({ ...(config ?? {}), method: "DELETE", url, params });
}

/** 上传文件（multipart/form-data） */
export async function upload<T = unknown>(url: string, formData: FormData, config?: CustomRequestConfig) {
  return request<T>({
    ...(config ?? {}),
    method: "POST",
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(config?.headers ?? {}),
    },
  });
}

/** 下载文件（返回 Blob） */
export async function download(url: string, config?: CustomRequestConfig): Promise<Blob> {
  return request<Blob>({
    ...(config ?? {}),
    method: "GET",
    url,
    responseType: "blob",
    skipBizCheck: true,
  });
}

export default service;

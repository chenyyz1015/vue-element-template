import type { ApiResponse, CustomRequestConfig } from "../types/common";
import { service } from "./instance";
import { setupInterceptors } from "./interceptors";

setupInterceptors();

/** 统一请求方法 */
async function request<T = unknown>(
  config: CustomRequestConfig
): Promise<ApiResponse<T>> {
  const response = await service.request<ApiResponse<T>>(config);
  return response.data as ApiResponse<T>;
}

export async function get<T = unknown>(
  url: string,
  config?: CustomRequestConfig
) {
  return request<T>({ ...config, method: "GET", url });
}

export async function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: CustomRequestConfig
) {
  return request<T>({ ...config, method: "POST", url, data });
}

export async function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: CustomRequestConfig
) {
  return request<T>({ ...config, method: "PUT", url, data });
}

export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  config?: CustomRequestConfig
) {
  return request<T>({ ...config, method: "PATCH", url, data });
}

export async function del<T = unknown>(
  url: string,
  config?: CustomRequestConfig
) {
  return request<T>({ ...config, method: "DELETE", url });
}

/** 上传文件（multipart/form-data） */
export async function upload<T = unknown>(
  url: string,
  formData: FormData,
  config?: CustomRequestConfig
) {
  return request<T>({
    ...config,
    method: "POST",
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      ...config?.headers,
    },
  });
}

/** 下载文件（返回 Blob） */
export async function download(
  url: string,
  config?: CustomRequestConfig
): Promise<Blob> {
  const response = await service.request<Blob>({
    method: "GET",
    url,
    responseType: "blob",
    skipBizCheck: true,
    ...config,
  });
  return response.data;
}

export { service as request };
export default service;

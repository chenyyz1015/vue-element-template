import type { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import type { ApiErrorBody } from "../types/common";
import { AxiosHeaders as AxiosHeadersCtor } from "axios";
import { getToken } from "@/utils/auth";
import { checkSubmitGuard } from "@/utils/submit-guard";
import { UNKNOWN_ERROR_MESSAGE } from "../constants";
import { createRequestError, handleHttpError } from "./error";
import { service } from "./instance";
import { cancelDuplicateRequest, registerRequest, removePendingRequest } from "./pending";
import { handleBizResponse } from "./response";

/** 注册请求拦截器 */
export function setupRequestInterceptor() {
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.showError ??= true;
      config.skipAuth ??= false;
      config.skipBizCheck ??= false;
      config.cancelDuplicate ??= true;
      config.skipSentryReport ??= false;
      config.preventRepeatSubmit ??= true;

      if (!config.skipAuth) {
        const token = getToken();
        if (token) {
          const headers = AxiosHeadersCtor.from(config.headers ?? {});
          headers.set("Authorization", `Bearer ${token}`);
          config.headers = headers as AxiosHeaders;
        }
      }

      config.headers["X-Request-Time"] = String(Date.now());

      const method = config.method?.toUpperCase();
      if (config.preventRepeatSubmit && (method === "POST" || method === "PUT" || method === "PATCH")) {
        checkSubmitGuard(config.url ?? "", config.data, config.repeatSubmitInterval);
      }

      registerRequest(config);
      cancelDuplicateRequest(config);

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(createRequestError(UNKNOWN_ERROR_MESSAGE, { responseData: error }));
    }
  );
}

/** 注册响应拦截器 */
export function setupResponseInterceptor() {
  service.interceptors.response.use(
    (response) => {
      removePendingRequest(response.config);
      return handleBizResponse(response);
    },
    (error: AxiosError<ApiErrorBody>) => {
      if (error.config) {
        removePendingRequest(error.config);
      }
      return Promise.reject(handleHttpError(error));
    }
  );
}

/** 初始化所有拦截器 */
export function setupInterceptors() {
  setupRequestInterceptor();
  setupResponseInterceptor();
}

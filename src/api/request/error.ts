import type { AxiosError } from "axios";
import type { ApiErrorBody, ApiResponse, CustomRequestConfig, RequestError } from "../types/common";
import axios from "axios";
import { captureApiRequestError } from "@/sentry";
import { HTTP_ERROR_MESSAGES, NETWORK_ERROR_MESSAGE, TIMEOUT_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from "../constants";
import { handleUnauthorized } from "./auth";

/** 判断是否为统一业务响应结构 */
export function isApiResponse(data: unknown): data is ApiResponse {
  return typeof data === "object" && data !== null && "code" in data && "message" in data && "data" in data;
}

/** 从响应体提取错误信息 */
export function extractErrorMessage(data: unknown, fallback: string): string {
  return isApiResponse(data) && data.message ? data.message : fallback;
}

/** 根据 HTTP 状态码获取提示文案 */
export function getHttpErrorMessage(status: number, data?: unknown): string {
  const preset = HTTP_ERROR_MESSAGES[status];
  if (data) {
    const extracted = extractErrorMessage(data, "");
    if (extracted) {
      return extracted;
    }
  }
  return preset || UNKNOWN_ERROR_MESSAGE;
}

/** 创建标准化请求错误 */
export function createRequestError(
  message: string,
  options?: Partial<Pick<RequestError, "bizCode" | "httpStatus" | "responseData" | "canceled">>
): RequestError {
  const error = new Error(message) as RequestError;
  error.name = "RequestError";
  error.bizCode = options?.bizCode;
  error.httpStatus = options?.httpStatus;
  error.responseData = options?.responseData;
  error.canceled = options?.canceled;
  return error;
}

/** 显示错误提示 */
export function showError(message: string, config?: CustomRequestConfig) {
  if (config?.showError !== false) {
    ElMessage.error(message);
  }
}

/** 显示警告提示 */
export function showWarning(message: string, config?: CustomRequestConfig) {
  if (config?.showError !== false) {
    ElMessage.warning(message);
  }
}

/** 处理 HTTP 层错误 */
export function handleHttpError(error: AxiosError<ApiErrorBody>): RequestError {
  const { config, response, code, message } = error;

  if (axios.isCancel(error) || code === "ERR_CANCELED") {
    return createRequestError("请求已取消", { canceled: true });
  }

  if (code === "ECONNABORTED" || message?.includes("timeout")) {
    const requestError = createRequestError(TIMEOUT_ERROR_MESSAGE);
    showError(requestError.message, config);
    captureApiRequestError(requestError, config);
    return requestError;
  }

  if (!response) {
    const requestError = createRequestError(NETWORK_ERROR_MESSAGE);
    showError(requestError.message, config);
    captureApiRequestError(requestError, config);
    return requestError;
  }

  const { status, data } = response;
  const errorMessage = getHttpErrorMessage(status, data);

  if (status === 401) {
    handleUnauthorized(errorMessage);
    const requestError = createRequestError(errorMessage, {
      httpStatus: status,
      responseData: data,
      bizCode: data?.code,
    });
    captureApiRequestError(requestError, config);
    return requestError;
  }

  showError(errorMessage, config);

  const requestError = createRequestError(errorMessage, {
    httpStatus: status,
    responseData: data,
    bizCode: data?.code,
  });
  captureApiRequestError(requestError, config);
  return requestError;
}

import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../types/common";
import {
  SUCCESS_CODES,
  UNAUTHORIZED_BIZ_CODES,
  UNKNOWN_ERROR_MESSAGE,
} from "../constants";
import { getUnauthorizedMessage, handleUnauthorized } from "./auth";
import { createRequestError, isApiResponse, showError } from "./error";

/** 判断业务是否成功 */
export function isSuccessCode(code: number): boolean {
  return (SUCCESS_CODES as readonly number[]).includes(code);
}

/** 判断是否需要重新登录 */
export function isUnauthorizedBizCode(code: number): boolean {
  return (UNAUTHORIZED_BIZ_CODES as readonly number[]).includes(code);
}

/** 处理业务层响应 */
export function handleBizResponse<T>(
  response: AxiosResponse<ApiResponse<T> | T>
): AxiosResponse<ApiResponse<T> | T> {
  const { config, data, status } = response;

  if (config.skipBizCheck) {
    return response;
  }

  const responseType = config.responseType;
  if (responseType === "blob" || responseType === "arraybuffer") {
    return response;
  }

  if (status < 200 || status >= 300) {
    return response;
  }

  if (!isApiResponse(data)) {
    return response;
  }

  const { code, message } = data;

  if (isSuccessCode(code)) {
    return response;
  }

  if (isUnauthorizedBizCode(code)) {
    const errorMessage = getUnauthorizedMessage(message);
    handleUnauthorized(errorMessage);
    throw createRequestError(errorMessage, {
      bizCode: code,
      httpStatus: status,
      responseData: data,
    });
  }

  const errorMessage = message || UNKNOWN_ERROR_MESSAGE;
  showError(errorMessage, config);

  throw createRequestError(errorMessage, {
    bizCode: code,
    httpStatus: status,
    responseData: data,
  });
}

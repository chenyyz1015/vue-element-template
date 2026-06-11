import type { AxiosResponse } from "axios";
import { captureApiRequestError } from "@/sentry";
import { SUCCESS_BIZ_CODES, UNAUTHORIZED_BIZ_CODES, UNKNOWN_ERROR_MESSAGE, WARNING_BIZ_CODES } from "../constants";
import { getUnauthorizedMessage, handleUnauthorized } from "./auth";
import { createRequestError, isApiResponse, showError, showWarning } from "./error";

/** 判断业务是否成功 */
export function isSuccessCode(code: number): boolean {
  return (SUCCESS_BIZ_CODES as readonly number[]).includes(code);
}

/** 判断是否需要重新登录 */
export function isUnauthorizedBizCode(code: number): boolean {
  return (UNAUTHORIZED_BIZ_CODES as readonly number[]).includes(code);
}

/** 判断业务是否警告 */
export function isWarningCode(code: number): boolean {
  return (WARNING_BIZ_CODES as readonly number[]).includes(code);
}

/** 处理业务层响应 */
export function handleBizResponse<T>(response: AxiosResponse<T>): Promise<T> {
  const { config, data, status } = response;

  const responseType = config.responseType;
  if (responseType === "blob" || responseType === "arraybuffer") {
    return Promise.resolve(data);
  } else if (!isApiResponse(data)) {
    return Promise.resolve(data);
  } else if (config.skipBizCheck) {
    return Promise.resolve(data);
  }

  const { code, message } = data;

  if (isSuccessCode(code)) {
    return Promise.resolve(data);
  } else {
    if (isUnauthorizedBizCode(code)) {
      const errorMessage = getUnauthorizedMessage(message);
      handleUnauthorized(errorMessage);
      const requestError = createRequestError(errorMessage, {
        bizCode: code,
        httpStatus: status,
        responseData: data,
      });
      captureApiRequestError(requestError, config);
      return Promise.reject(requestError);
    } else {
      const errorMessage = message || UNKNOWN_ERROR_MESSAGE;
      if (isWarningCode(code)) {
        showWarning(errorMessage, config);
      } else {
        showError(errorMessage, config);
      }
      const requestError = createRequestError(errorMessage, {
        bizCode: code,
        httpStatus: status,
        responseData: data,
      });
      captureApiRequestError(requestError, config);
      return Promise.reject(requestError);
    }
  }
}

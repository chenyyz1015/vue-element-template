import type { AxiosInstance } from "axios";
import axios from "axios";
import { DEFAULT_BASE_URL, DEFAULT_TIMEOUT } from "../constants";

/** Axios 实例 */
export const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

import posthog from "posthog-js";

const POSTHOG_ENABLED = import.meta.env.VITE_POSTHOG_ENABLED === "true";
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST as string;

/** 初始化 PostHog 实例，须在应用启动时调用 */
export const initPosthog = () => {
  if (!POSTHOG_ENABLED || !POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
  });
};

/** 命令式埋点上报，properties 为可选附加属性 */
export const captureEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (!POSTHOG_ENABLED) return;
  posthog.capture(eventName, properties);
};

/**
 * 将当前匿名用户与业务用户关联，通常在登录成功后调用
 * @param distinctId 业务用户唯一标识
 * @param userProperties 可选用户属性（如 name、email、role）
 */
export const identifyUser = (distinctId: string, userProperties?: Record<string, unknown>) => {
  if (!POSTHOG_ENABLED) return;
  posthog.identify(distinctId, userProperties);
};

/** 重置用户关联，通常在登出时调用 */
export const resetUser = () => {
  if (!POSTHOG_ENABLED) return;
  posthog.reset();
};

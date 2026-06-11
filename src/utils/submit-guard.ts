import { storage } from "@/utils/storage";

const SUBMIT_GUARD = "SUBMIT_GUARD";
const DEFAULT_INTERVAL_MS = 1000;
const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024;

interface SubmitGuardPayload {
  url: string;
  data: string;
  time: number;
}

export const getSubmitGuard = () => {
  return storage.session.get<SubmitGuardPayload>(SUBMIT_GUARD);
};

export const setSubmitGuard = (payload: SubmitGuardPayload) => {
  storage.session.set<SubmitGuardPayload>(SUBMIT_GUARD, payload);
};

export const removeSubmitGuard = () => {
  storage.session.remove(SUBMIT_GUARD);
};

/** POST/PUT 防重复提交（会话级，与后端处理间隔对齐） */
export const checkSubmitGuard = (url: string, data: unknown, intervalMs = DEFAULT_INTERVAL_MS): void => {
  const payload: SubmitGuardPayload = {
    url,
    data: typeof data === "object" ? JSON.stringify(data) : String(data ?? ""),
    time: Date.now(),
  };

  const serialized = JSON.stringify(payload);
  if (serialized.length >= MAX_PAYLOAD_BYTES) {
    return;
  }

  const previous = getSubmitGuard();

  if (
    previous &&
    previous.url === payload.url &&
    previous.data === payload.data &&
    payload.time - previous.time < intervalMs
  ) {
    throw new Error("数据正在处理，请勿重复提交");
  }

  setSubmitGuard(payload);
};

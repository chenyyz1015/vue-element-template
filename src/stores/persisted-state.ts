import { createPersistedState } from "pinia-plugin-persistedstate";
import { storage } from "@/utils/storage";

/** Pinia Store 持久化存储键前缀 */
export const PINIA_STORAGE_KEY_PREFIX = "PINIA_";

/** 根据 Store id 生成持久化存储键（UPPER_SNAKE_CASE） */
export const getPiniaPersistKey = (storeId: string) => {
  const normalized = storeId.toUpperCase().replace(/-/g, "_");
  return `${PINIA_STORAGE_KEY_PREFIX}${normalized}`;
};

export const persistedState = createPersistedState({
  storage: storage.local.toStorageLike(),
  key: getPiniaPersistKey,
});

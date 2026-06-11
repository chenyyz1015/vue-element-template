import type { ComponentSize } from "element-plus";
import { applyElementPlusFontSize, getSize, setSize } from "@/utils/element-plus-size";

export const useAppSize = () => {
  const size = ref<ComponentSize>(getSize() || "default");

  watch(size, (size) => {
    setSize(size);
    applyElementPlusFontSize(size);
  });

  return { size };
};

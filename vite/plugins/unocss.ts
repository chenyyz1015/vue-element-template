import type { PluginOption } from "vite";
import UnoCSS from "unocss/vite";

export function unocss(): PluginOption {
  return UnoCSS();
}

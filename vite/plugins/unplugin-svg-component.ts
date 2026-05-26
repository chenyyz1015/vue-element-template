import type { PluginOption } from "vite";
import { fileURLToPath, URL } from "node:url";
import SvgComponent from "unplugin-svg-component/vite";

export function unpluginSvgComponent(): PluginOption {
  return SvgComponent({
    iconDir: fileURLToPath(new URL("../../src/assets/icons", import.meta.url)),
    preserveColor: fileURLToPath(
      new URL("../../src/assets/icons/preserve-color", import.meta.url)
    ),
    dts: true,
    dtsDir: fileURLToPath(new URL("../../types", import.meta.url)),
  });
}

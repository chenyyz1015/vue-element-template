import type { GetManualChunk } from "rollup";

/** [node_modules 路径片段, chunk 名]；顺序靠前者优先匹配 */
const VENDOR_CHUNKS: ReadonlyArray<readonly [string, string]> = [
  ["@element-plus/icons-vue", "element-plus-icons"],
  [
    "@popperjs|@floating-ui|async-validator|@ctrl/tinycolor|normalize-wheel-es|memoize-one",
    "element-plus-deps",
  ],
  ["element-plus", "element-plus"],
  ["@sentry", "sentry"],
  ["@vueuse", "vueuse"],
  ["lodash-es", "lodash"],
  ["axios", "axios"],
  ["dayjs", "dayjs"],
  ["@ant-design/colors", "ant-design-colors"],
];

const VUE_VENDOR_RE =
  /[/\\]node_modules[/\\](?:vue[/\\]|vue-router[/\\]|pinia[/\\]|vue-i18n[/\\]|@vue[/\\])/;

const matchesVendorPkg = (id: string, pkg: string): boolean =>
  pkg.includes("|") ? new RegExp(pkg).test(id) : id.includes(pkg);

export const manualChunks: GetManualChunk = (id) => {
  if (!id.includes("node_modules")) return undefined;

  for (const [pkg, chunkName] of VENDOR_CHUNKS) {
    if (matchesVendorPkg(id, pkg)) return chunkName;
  }

  if (VUE_VENDOR_RE.test(id)) return "vue-vendor";

  return undefined;
};

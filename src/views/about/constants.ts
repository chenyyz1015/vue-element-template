export const TECH_STACK_KEYS = [
  "vite",
  "vue",
  "typescript",
  "pinia",
  "piniaPersist",
  "elementPlus",
  "unocss",
  "axios",
  "vueuse",
  "vueI18n",
  "dayjs",
  "lodashEs",
  "svgComponent",
] as const;

export type TechStackKey = (typeof TECH_STACK_KEYS)[number];

export const AI_TOOL_KEYS = ["claude", "cursor", "agents"] as const;

export type AiToolKey = (typeof AI_TOOL_KEYS)[number];

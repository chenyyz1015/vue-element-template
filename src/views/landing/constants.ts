export const LANDING_SECTION_IDS = {
  features: "features",
  compare: "compare",
  integrations: "integrations",
  docs: "docs",
} as const;

export const LANDING_FEATURE_KEYS = [
  "typescript",
  "autoImport",
  "aiReady",
  "i18n",
  "lint",
  "deploy",
] as const;

export type LandingFeatureKey = (typeof LANDING_FEATURE_KEYS)[number];

export const LANDING_FEATURE_ICON_MAP: Record<LandingFeatureKey, string> = {
  typescript: "TS",
  autoImport: "{}",
  aiReady: "AI",
  i18n: "i18n",
  lint: "lint",
  deploy: "▶",
};

export const COMPARISON_ROW_KEYS = [
  "typescript",
  "autoImport",
  "piniaPersist",
  "aiConfig",
  "i18n",
  "lintCi",
  "darkReady",
] as const;

export type ComparisonRowKey = (typeof COMPARISON_ROW_KEYS)[number];

export const COMPARISON_COLUMNS = ["template", "manual", "generic"] as const;

export type ComparisonColumn = (typeof COMPARISON_COLUMNS)[number];

export const INTEGRATION_ITEMS = [
  { id: "vite", label: "Vite", color: "#646CFF" },
  { id: "vue", label: "Vue", color: "#42B883" },
  { id: "typescript", label: "TypeScript", color: "#3178C6" },
  { id: "pinia", label: "Pinia", color: "#FFD859" },
  { id: "elementPlus", label: "Element Plus", color: "#409EFF" },
  { id: "unocss", label: "UnoCSS", color: "#888888" },
  { id: "eslint", label: "ESLint", color: "#4B32C3" },
  { id: "github", label: "GitHub", color: "#F0F6FC" },
  { id: "cursor", label: "Cursor", color: "#A78BFA" },
] as const;

export type CodeTabKey = "cli" | "config" | "component";

export const CODE_TAB_KEYS: CodeTabKey[] = ["cli", "config", "component"];

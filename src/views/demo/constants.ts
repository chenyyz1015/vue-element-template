export const DEMO_STEP_KEYS = ["clone", "install", "dev"] as const;

export type DemoStepKey = (typeof DEMO_STEP_KEYS)[number];

export const DEMO_STACK_BADGES = [
  "Vue 3",
  "Vite 7",
  "TypeScript",
  "Pinia",
  "Element Plus",
  "UnoCSS",
] as const;

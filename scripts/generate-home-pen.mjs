import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("design/pages/home.pen");

const variables = {
  "color-accent": { type: "color", value: "#FF8400" },
  "color-bg": { type: "color", value: "#FFFFFF" },
  "color-bg-muted": { type: "color", value: "#FAFAFA" },
  "color-border": { type: "color", value: "#E5E5E5" },
  "color-cta": { type: "color", value: "#141414" },
  "color-primary-ep": { type: "color", value: "#2563eb" },
  "color-text": { type: "color", value: "#141414" },
  "color-text-muted": { type: "color", value: "#666666" },
  "font-body": { type: "string", value: "Rubik" },
  "font-heading": { type: "string", value: "DM Sans" },
};

const text = (name, content, extra = {}) => ({
  type: "text",
  name,
  content,
  ...extra,
});

const frame = (name, extra = {}) => ({
  type: "frame",
  name,
  ...extra,
});

/** pencil.dev：8×16 padding、9999px 圆角、#141414 字色 */
const navPillLink = (label) =>
  frame(`Nav ${label}`, {
    layout: "horizontal",
    padding: [8, 16],
    cornerRadius: 9999,
    alignItems: "center",
    fill: "#00000000",
    children: [
      text("Label", label, {
        fontFamily: "Rubik",
        fontSize: 16,
        fill: "#141414",
      }),
    ],
  });

const navPlainLink = (label) =>
  text(`Link ${label}`, label, {
    fontFamily: "Rubik",
    fontSize: 16,
    fill: "#141414",
  });

const featureCard = (icon, title, desc) =>
  frame(`Feature ${title}`, {
    layout: "vertical",
    width: "fill_container",
    padding: 28,
    gap: 16,
    cornerRadius: 16,
    fill: "#FFFFFF",
    stroke: { thickness: 1, fill: "#E5E5E5" },
    children: [
      frame("Icon", {
        width: 44,
        height: 44,
        cornerRadius: 12,
        fill: "#FAFAFA",
        stroke: { thickness: 1, fill: "#E5E5E5" },
        layout: "horizontal",
        justifyContent: "center",
        alignItems: "center",
        children: [
          text("Icon Label", icon, {
            fontFamily: "Fira Code",
            fontSize: 14,
            fontWeight: "700",
            fill: "#141414",
          }),
        ],
      }),
      text("Card Title", title, {
        textGrowth: "fixed-width",
        width: "fill_container",
        fontFamily: "DM Sans",
        fontSize: 18,
        fontWeight: "600",
        fill: "#141414",
      }),
      text("Card Desc", desc, {
        textGrowth: "fixed-width",
        width: "fill_container",
        fontFamily: "Rubik",
        fontSize: 14,
        lineHeight: 1.65,
        fill: "#666666",
      }),
    ],
  });

const features = [
  ["TS", "TypeScript 严格模式", "vue-tsc 类型检查、完整类型推导，构建前拦截错误。"],
  ["{}", "自动引入", "Vue / Pinia / VueUse / composables / 公共组件零 import。"],
  ["AI", "AI 开发就绪", "Claude Code / Cursor 配置，AGENTS.md 与 Skills 内置。"],
  ["i18n", "国际化", "vue-i18n Composition API，中英文语言包与类型安全。"],
  ["lint", "Lint & CI", "ESLint + Stylelint + Commitlint，Conventional Commits。"],
  ["▶", "一键构建", "Vite 7 生产构建，多环境 .env 与 dev proxy 配置。"],
];

const desktop = frame("Home Light 1440", {
  id: "home-desktop",
  x: 0,
  y: 0,
  width: 1440,
  layout: "vertical",
  fill: "#FFFFFF",
  children: [
    frame("Site Header", {
      layout: "horizontal",
      width: "fill_container",
      height: 80,
      padding: [0, 48],
      alignItems: "center",
      justifyContent: "space_between",
      fill: "#FAFAFA80",
      effect: { type: "background_blur", radius: 12 },
      stroke: { thickness: { bottom: 1 }, fill: "#0000000F" },
      children: [
        frame("Logo", {
          layout: "horizontal",
          gap: 10,
          alignItems: "center",
          children: [
            {
              type: "rectangle",
              name: "Logo Icon",
              width: 28,
              height: 28,
              cornerRadius: 6,
              fill: "#141414",
            },
            text("Brand Name", "Vue Element Template", {
              fontFamily: "Rubik",
              fontSize: 16,
              fontWeight: "600",
              fill: "#141414",
            }),
          ],
        }),
        frame("Nav Links", {
          layout: "horizontal",
          gap: 4,
          alignItems: "center",
          children: ["功能", "对比", "集成", "演示", "关于", "文档"].map(navPillLink),
        }),
        frame("Nav Actions", {
          layout: "horizontal",
          gap: 16,
          alignItems: "center",
          children: [
            frame("Theme Controls", {
              layout: "horizontal",
              gap: 6,
              alignItems: "center",
              children: [
                {
                  type: "rectangle",
                  name: "Color Swatch",
                  width: 14,
                  height: 14,
                  cornerRadius: 4,
                  fill: "#2563eb",
                  stroke: { thickness: 1, fill: "#0000001F" },
                },
                text("Mode Icon", "◐", {
                  fontFamily: "Rubik",
                  fontSize: 16,
                  fill: "#666666",
                }),
              ],
            }),
            navPlainLink("中文"),
            navPlainLink("GitHub"),
            frame("Nav CTA", {
              layout: "horizontal",
              height: 40,
              padding: [0, 16],
              cornerRadius: 9999,
              fill: "#141414",
              alignItems: "center",
              justifyContent: "center",
              children: [
                text("CTA Label", "运行 Demo", {
                  fontFamily: "Rubik",
                  fontSize: 16,
                  fill: "#FFFFFF",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    frame("Hero Section", {
      layout: "horizontal",
      width: "fill_container",
      padding: [64, 48, 80, 48],
      gap: 48,
      alignItems: "center",
      fill: "#FFFFFF",
      children: [
        frame("Hero Content", {
          layout: "vertical",
          width: "fill_container",
          gap: 24,
          children: [
            frame("Hero Badge", {
              layout: "horizontal",
              gap: 8,
              padding: [6, 14],
              cornerRadius: 9999,
              fill: "#FFF7ED",
              stroke: { thickness: 1, fill: "#FED7AA" },
              alignItems: "center",
              children: [
                { type: "ellipse", name: "Badge Dot", width: 6, height: 6, fill: "#FF8400" },
                text("Badge Text", "v1.0 · 开发者优先", {
                  fontFamily: "Rubik",
                  fontSize: 13,
                  fontWeight: "500",
                  fill: "#C2410C",
                }),
              ],
            }),
            text("Hero Title", "构建 Vue 应用的\n最小工具链", {
              textGrowth: "fixed-width",
              width: "fill_container",
              fontFamily: "DM Sans",
              fontSize: 64,
              fontWeight: "700",
              lineHeight: 1.05,
              fill: "#141414",
            }),
            text("Hero Subtitle", "TypeScript 严格模式、自动引入、AI 配置、主题切换与国际化 — 零配置启动，专注业务代码。", {
              textGrowth: "fixed-width",
              width: 480,
              fontFamily: "Rubik",
              fontSize: 18,
              lineHeight: 1.5,
              fill: "#666666",
            }),
            frame("Hero Actions", {
              layout: "horizontal",
              gap: 12,
              alignItems: "center",
              children: [
                frame("Primary CTA", {
                  layout: "horizontal",
                  padding: [14, 28],
                  cornerRadius: 9999,
                  fill: "#141414",
                  children: [
                    text("Label", "立即体验", {
                      fontFamily: "Rubik",
                      fontSize: 15,
                      fontWeight: "500",
                      fill: "#FFFFFF",
                    }),
                  ],
                }),
                frame("Secondary CTA", {
                  layout: "horizontal",
                  padding: [14, 28],
                  cornerRadius: 9999,
                  fill: "#FFFFFF",
                  stroke: { thickness: 1, fill: "#E5E5E5" },
                  children: [
                    text("Label", "GitHub 仓库", {
                      fontFamily: "Rubik",
                      fontSize: 15,
                      fontWeight: "500",
                      fill: "#141414",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        frame("Code Preview", {
          layout: "vertical",
          width: 520,
          height: 340,
          cornerRadius: 24,
          fill: "#FAFAFA",
          stroke: { thickness: 1, fill: "#E5E5E5" },
          effect: {
            type: "shadow",
            shadowType: "outer",
            offset: { x: 0, y: 16 },
            blur: 48,
            color: "#0000000F",
          },
          children: [
            frame("Preview Tabs", {
              layout: "horizontal",
              width: "fill_container",
              padding: [12, 16, 0, 16],
              gap: 4,
              fill: "#FFFFFF",
              stroke: { thickness: { bottom: 1 }, fill: "#E5E5E5" },
              children: ["terminal", "vite.config.ts", "index.vue"].map((label, i) =>
                frame(`Tab ${label}`, {
                  layout: "horizontal",
                  padding: [8, 12],
                  cornerRadius: [8, 8, 0, 0],
                  fill: i === 0 ? "#FAFAFA" : "#00000000",
                  children: [
                    text("Tab Label", label, {
                      fontFamily: "Fira Code",
                      fontSize: 12,
                      fontWeight: i === 0 ? "600" : "400",
                      fill: i === 0 ? "#141414" : "#666666",
                    }),
                  ],
                }),
              ),
            }),
            frame("Code Body", {
              layout: "vertical",
              width: "fill_container",
              height: "fill_container",
              padding: [20, 24, 28, 24],
              gap: 6,
              children: [
                ["# 30 秒启动", "#9E9E9E"],
                ["git clone github.com/chenyyz1015/vue-element-template", "#82AAFF"],
                ["cd vue-element-template", "#C792EA"],
                ["npm install && npm run dev", "#82AAFF"],
                ["# → http://localhost:5173", "#9E9E9E"],
                ["✓ 主题切换 · 国际化 · Element Plus 就绪", "#C3E88D"],
              ].map(([line, color]) =>
                text("Code Line", line, {
                  textGrowth: "fixed-width",
                  width: "fill_container",
                  fontFamily: "Fira Code",
                  fontSize: 13,
                  lineHeight: 1.7,
                  fill: color,
                }),
              ),
            }),
          ],
        }),
      ],
    }),
    frame("Features Section", {
      layout: "vertical",
      width: "fill_container",
      padding: [80, 48],
      gap: 48,
      fill: "#FAFAFA",
      alignItems: "center",
      children: [
        frame("Section Head", {
          layout: "vertical",
          width: 640,
          gap: 12,
          alignItems: "center",
          children: [
            text("Eyebrow", "FEATURES", {
              fontFamily: "Rubik",
              fontSize: 13,
              fontWeight: "600",
              letterSpacing: 1,
              fill: "#FF8400",
            }),
            text("Title", "开发者体验，开箱即用", {
              textGrowth: "fixed-width",
              width: "fill_container",
              fontFamily: "DM Sans",
              fontSize: 40,
              fontWeight: "700",
              textAlign: "center",
              fill: "#141414",
            }),
            text("Subtitle", "从脚手架到规范约定，减少重复基建工作。", {
              textGrowth: "fixed-width",
              width: "fill_container",
              fontFamily: "Rubik",
              fontSize: 16,
              textAlign: "center",
              lineHeight: 1.6,
              fill: "#666666",
            }),
          ],
        }),
        frame("Feature Grid", {
          layout: "vertical",
          width: 1200,
          gap: 20,
          children: [
            frame("Feature Row 1", {
              layout: "horizontal",
              width: "fill_container",
              gap: 20,
              children: features.slice(0, 3).map(([icon, title, desc]) => featureCard(icon, title, desc)),
            }),
            frame("Feature Row 2", {
              layout: "horizontal",
              width: "fill_container",
              gap: 20,
              children: features.slice(3).map(([icon, title, desc]) => featureCard(icon, title, desc)),
            }),
          ],
        }),
      ],
    }),
    frame("Preview Footer Note", {
      layout: "horizontal",
      width: "fill_container",
      padding: [32, 48],
      justifyContent: "center",
      stroke: { thickness: { top: 1 }, fill: "#E5E5E5" },
      children: [
        text("Footer Text", "Batch B · GitHub: chenyyz1015/vue-element-template", {
          fontFamily: "Rubik",
          fontSize: 13,
          fill: "#666666",
        }),
      ],
    }),
    frame("Compare Section", {
      layout: "vertical",
      width: "fill_container",
      padding: [80, 48],
      gap: 48,
      fill: "#FFFFFF",
      alignItems: "center",
      children: [
        frame("Section Head", {
          layout: "vertical",
          width: 640,
          gap: 12,
          alignItems: "center",
          children: [
            text("Eyebrow", "COMPARE", { fontFamily: "Rubik", fontSize: 13, fontWeight: "600", letterSpacing: 1, fill: "#FF8400" }),
            text("Title", "功能对比", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "DM Sans", fontSize: 40, fontWeight: "700", textAlign: "center", fill: "#141414" }),
            text("Subtitle", "与手动搭建和通用脚手架相比，节省数天配置时间。", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 16, textAlign: "center", fill: "#666666" }),
          ],
        }),
        frame("Compare Table", {
          layout: "vertical",
          width: 1200,
          cornerRadius: 16,
          fill: "#FFFFFF",
          stroke: { thickness: 1, fill: "#E5E5E5" },
          children: [
            frame("Table Head", {
              layout: "horizontal",
              width: "fill_container",
              padding: [16, 20],
              stroke: { thickness: { bottom: 1 }, fill: "#E5E5E5" },
              children: [
                text("Col", "功能", { textGrowth: "fixed-width", width: 280, fontFamily: "Rubik", fontSize: 14, fontWeight: "600", fill: "#666666" }),
                text("Col", "本模板", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fontWeight: "600", fill: "#FF8400", textAlign: "center" }),
                text("Col", "手动搭建", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fill: "#141414", textAlign: "center" }),
                text("Col", "通用脚手架", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fill: "#141414", textAlign: "center" }),
              ],
            }),
            ...["TypeScript", "自动引入", "Pinia 持久化", "AI 配置"].map((row, i) =>
              frame(`Row ${row}`, {
                layout: "horizontal",
                width: "fill_container",
                padding: [14, 20],
                fill: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                children: [
                  text("Feature", row, { textGrowth: "fixed-width", width: 280, fontFamily: "Rubik", fontSize: 14, fill: "#141414" }),
                  text("Val", "✓", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fill: "#FF8400", textAlign: "center" }),
                  text("Val", "—", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fill: "#999", textAlign: "center" }),
                  text("Val", "~", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "Rubik", fontSize: 14, fill: "#999", textAlign: "center" }),
                ],
              }),
            ),
          ],
        }),
      ],
    }),
    frame("Integrations Section", {
      layout: "vertical",
      width: "fill_container",
      padding: [80, 48],
      gap: 48,
      fill: "#FAFAFA",
      alignItems: "center",
      children: [
        frame("Section Head", {
          layout: "vertical",
          width: 640,
          gap: 12,
          alignItems: "center",
          children: [
            text("Eyebrow", "INTEGRATIONS", { fontFamily: "Rubik", fontSize: 13, fontWeight: "600", letterSpacing: 1, fill: "#FF8400" }),
            text("Title", "AI 与工具链集成", { textGrowth: "fixed-width", width: "fill_container", fontFamily: "DM Sans", fontSize: 40, fontWeight: "700", textAlign: "center", fill: "#141414" }),
          ],
        }),
        frame("Integration Grid", {
          layout: "horizontal",
          width: 1200,
          gap: 16,
          children: ["Vite", "Vue", "Cursor", "Pinia", "EP"].map((label) =>
            frame(`Integration ${label}`, {
              layout: "vertical",
              width: "fill_container",
              padding: 20,
              gap: 12,
              cornerRadius: 16,
              fill: "#FFFFFF",
              stroke: { thickness: 1, fill: "#E5E5E5" },
              alignItems: "center",
              children: [
                frame("Logo", { width: 44, height: 44, cornerRadius: 12, fill: "#FAFAFA", stroke: { thickness: 1, fill: "#E5E5E5" }, layout: "horizontal", justifyContent: "center", alignItems: "center", children: [text("L", label.charAt(0), { fontFamily: "Rubik", fontSize: 16, fontWeight: "700", fill: "#141414" })] }),
                text("Label", label, { fontFamily: "Rubik", fontSize: 14, fill: "#141414" }),
              ],
            }),
          ),
        }),
      ],
    }),
    frame("Docs CTA Section", {
      layout: "vertical",
      width: "fill_container",
      padding: [80, 48],
      alignItems: "center",
      children: [
        frame("CTA Panel", {
          layout: "vertical",
          width: 800,
          padding: [48, 40],
          gap: 16,
          cornerRadius: 24,
          fill: "#FF8400",
          alignItems: "center",
          children: [
            text("Title", "阅读文档，快速上手", { fontFamily: "DM Sans", fontSize: 32, fontWeight: "700", fill: "#FFFFFF", textAlign: "center" }),
            text("Subtitle", "完整 README 与 AI 工作流说明见 GitHub 仓库。", { textGrowth: "fixed-width", width: 560, fontFamily: "Rubik", fontSize: 16, fill: "#FFFFFFCC", textAlign: "center" }),
            frame("Actions", { layout: "horizontal", gap: 12, children: [
              frame("Primary", { layout: "horizontal", padding: [12, 24], cornerRadius: 9999, fill: "#141414", children: [text("L", "GitHub README", { fontFamily: "Rubik", fontSize: 15, fill: "#FFFFFF" })] }),
              frame("Ghost", { layout: "horizontal", padding: [12, 24], cornerRadius: 9999, stroke: { thickness: 1, fill: "#FFFFFF66" }, children: [text("L", "运行 Demo", { fontFamily: "Rubik", fontSize: 15, fill: "#FFFFFF" })] }),
            ]}),
          ],
        }),
      ],
    }),
  ],
});

const doc = {
  version: "2.11",
  variables,
  children: [desktop],
};

writeFileSync(out, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
console.log(`Wrote ${out} (${JSON.stringify(doc).length} bytes)`);

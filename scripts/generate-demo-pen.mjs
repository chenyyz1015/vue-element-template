import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("design/pages/demo.pen");

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

const sectionHead = (eyebrow, title, subtitle) =>
  frame("Section Head", {
    layout: "vertical",
    width: 640,
    gap: 12,
    alignItems: "center",
    children: [
      text("Eyebrow", eyebrow, {
        fontFamily: "Rubik",
        fontSize: 13,
        fontWeight: "600",
        letterSpacing: 1,
        fill: "#FF8400",
      }),
      text("Title", title, {
        textGrowth: "fixed-width",
        width: "fill_container",
        fontFamily: "DM Sans",
        fontSize: 36,
        fontWeight: "700",
        textAlign: "center",
        fill: "#141414",
      }),
      text("Subtitle", subtitle, {
        textGrowth: "fixed-width",
        width: "fill_container",
        fontFamily: "Rubik",
        fontSize: 16,
        textAlign: "center",
        fill: "#666666",
      }),
    ],
  });

const demoSection = (name, eyebrow, title, subtitle, fill, body) =>
  frame(name, {
    layout: "vertical",
    width: "fill_container",
    padding: [80, 48],
    gap: 40,
    fill,
    alignItems: "center",
    children: [sectionHead(eyebrow, title, subtitle), body],
  });

const doc = {
  version: "2.0",
  variables: {
    "color-accent": { type: "color", value: "#FF8400" },
    "color-bg": { type: "color", value: "#FFFFFF" },
    "color-bg-muted": { type: "color", value: "#FAFAFA" },
    "color-border": { type: "color", value: "#E5E5E5" },
    "color-text": { type: "color", value: "#141414" },
    "color-text-muted": { type: "color", value: "#666666" },
  },
  children: [
    frame("Demo Desktop", {
      id: "demo-desktop",
      layout: "vertical",
      width: 1440,
      fill: "#FFFFFF",
      children: [
        frame("Hero", {
          layout: "vertical",
          width: "fill_container",
          padding: [120, 48, 80, 48],
          gap: 16,
          alignItems: "center",
          fill: "#FFFFFF",
          children: [
            text("Eyebrow", "DEMO", {
              fontFamily: "Rubik",
              fontSize: 13,
              fontWeight: "600",
              letterSpacing: 1,
              fill: "#FF8400",
            }),
            text("Title", "能力演示", {
              fontFamily: "DM Sans",
              fontSize: 48,
              fontWeight: "700",
              fill: "#141414",
            }),
            text("Subtitle", "主题切换、主色定制、国际化与 Element Plus 组件一览。", {
              textGrowth: "fixed-width",
              width: 560,
              fontFamily: "Rubik",
              fontSize: 18,
              textAlign: "center",
              fill: "#666666",
            }),
          ],
        }),
        demoSection(
          "Theme Section",
          "THEME",
          "明暗模式",
          "切换 light / dark，Element Plus 同步响应。",
          "#FAFAFA",
          frame("Panel", {
            layout: "vertical",
            width: 720,
            padding: 32,
            gap: 16,
            cornerRadius: 16,
            fill: "#FFFFFF",
            stroke: { thickness: 1, fill: "#E5E5E5" },
            alignItems: "center",
            children: [
              text("Current", "当前模式：Light", {
                fontFamily: "Rubik",
                fontSize: 16,
                fill: "#141414",
              }),
              frame("Toggle", {
                layout: "horizontal",
                padding: [12, 24],
                cornerRadius: 9999,
                fill: "#141414",
                children: [
                  text("Label", "切换 Dark", {
                    fontFamily: "Rubik",
                    fontSize: 15,
                    fill: "#FFFFFF",
                  }),
                ],
              }),
            ],
          }),
        ),
        demoSection(
          "Color Section",
          "PRIMARY COLOR",
          "Element Plus 主色",
          "预设色或自定义，按钮实时跟随。",
          "#FFFFFF",
          frame("Swatches", {
            layout: "horizontal",
            width: 720,
            gap: 12,
            justifyContent: "center",
            children: ["#2563eb", "#FF8400", "#22C55E", "#9333ea"].map((c) =>
              frame(`Swatch ${c}`, {
                width: 48,
                height: 48,
                cornerRadius: 9999,
                fill: c,
                stroke: { thickness: 2, fill: c === "#2563eb" ? "#141414" : "#E5E5E5" },
              }),
            ),
          }),
        ),
        demoSection(
          "I18n Section",
          "I18N",
          "国际化",
          "切换语言后文案与路由标题同步。",
          "#FAFAFA",
          frame("Sample Card", {
            layout: "vertical",
            width: 480,
            padding: 24,
            gap: 12,
            cornerRadius: 16,
            fill: "#FFFFFF",
            stroke: { thickness: 1, fill: "#E5E5E5" },
            children: [
              text("Title", "示例文案", {
                fontFamily: "DM Sans",
                fontSize: 20,
                fontWeight: "600",
                fill: "#141414",
              }),
              frame("Lang", {
                layout: "horizontal",
                gap: 8,
                children: ["中文", "English"].map((l) =>
                  frame(`Lang ${l}`, {
                    padding: [8, 16],
                    cornerRadius: 9999,
                    fill: l === "中文" ? "#141414" : "#FFFFFF",
                    stroke: { thickness: 1, fill: "#E5E5E5" },
                    children: [
                      text("L", l, {
                        fontFamily: "Rubik",
                        fontSize: 14,
                        fill: l === "中文" ? "#FFFFFF" : "#141414",
                      }),
                    ],
                  }),
                ),
              }),
            ],
          }),
        ),
        demoSection(
          "Components Section",
          "COMPONENTS",
          "Element Plus 组件",
          "主色随主题色变化。",
          "#FFFFFF",
          frame("Row", {
            layout: "horizontal",
            width: 720,
            gap: 12,
            children: [
              frame("Input", {
                layout: "horizontal",
                width: "fill_container",
                padding: [12, 16],
                cornerRadius: 8,
                stroke: { thickness: 1, fill: "#E5E5E5" },
                children: [
                  text("P", "输入示例", {
                    fontFamily: "Rubik",
                    fontSize: 14,
                    fill: "#999999",
                  }),
                ],
              }),
              frame("Btn", {
                padding: [12, 20],
                cornerRadius: 8,
                fill: "#2563eb",
                children: [
                  text("L", "Primary", {
                    fontFamily: "Rubik",
                    fontSize: 14,
                    fill: "#FFFFFF",
                  }),
                ],
              }),
            ],
          }),
        ),
        frame("Footer Note", {
          layout: "horizontal",
          width: "fill_container",
          padding: [32, 48],
          justifyContent: "center",
          stroke: { thickness: { top: 1 }, fill: "#E5E5E5" },
          children: [
            text("Note", "Demo · Batch B · chenyyz1015/vue-element-template", {
              fontFamily: "Rubik",
              fontSize: 13,
              fill: "#666666",
            }),
          ],
        }),
      ],
    }),
  ],
};

writeFileSync(out, JSON.stringify(doc, null, 2), "utf8");
console.log(`Wrote ${out} (${JSON.stringify(doc).length} bytes)`);

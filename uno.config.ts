import type { CustomIconLoader } from "@iconify/utils";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgIconDir = path.resolve(__dirname, "src/assets/icons");

// 递归获取所有 SVG 文件，返回 { 集合名: 图标名 }
const getSvgIconCollections = (dir: string, baseDir: string = dir): Record<string, string[]> => {
  const collections: Record<string, string[]> = {};

  // 先处理当前目录下的 SVG 文件（根目录或子目录的根）
  const items = fs.readdirSync(dir);

  // 收集当前目录的 SVG 文件
  const currentDirSvgs = items
    .filter((item) => {
      const fullPath = path.join(dir, item);
      return fs.statSync(fullPath).isFile() && item.endsWith(".svg");
    })
    .map((f) => f.replace(".svg", ""));

  // 如果有 SVG 文件，添加到集合中
  if (currentDirSvgs.length > 0) {
    // 当前目录相对于 baseDir 的路径
    const relativePath = path.relative(baseDir, dir);
    // 如果相对路径为空，说明是根目录，使用 'svg' 作为集合名
    const collectionName = relativePath || "svg";
    collections[collectionName] = currentDirSvgs;
  }

  // 然后递归处理子目录
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subCollections = getSvgIconCollections(fullPath, baseDir);
      Object.assign(collections, subCollections);
    }
  }

  return collections;
};

// 处理 SVG 内容
const processSvgContent = (svg: string): string => {
  // 处理 fill：none 保留，其他替换为 currentColor
  svg = svg
    .replace(/fill\s*=\s*"([^"]*)"/g, (match, value) => {
      const trimmed = value.trim();
      if (trimmed === "none" || trimmed === "currentColor") return match;
      return 'fill="currentColor"';
    })
    .replace(/fill\s*=\s*'([^']*)'/g, (match, value) => {
      const trimmed = value.trim();
      if (trimmed === "none" || trimmed === "currentColor") return match;
      return 'fill="currentColor"';
    });

  // 处理 stroke：none 保留，其他替换
  svg = svg
    .replace(/stroke\s*=\s*"([^"]*)"/g, (match, value) => {
      const trimmed = value.trim();
      if (trimmed === "currentColor" || trimmed === "none") return match;
      return 'stroke="currentColor"';
    })
    .replace(/stroke\s*=\s*'([^']*)'/g, (match, value) => {
      const trimmed = value.trim();
      if (trimmed === "currentColor" || trimmed === "none") return match;
      return 'stroke="currentColor"';
    });

  return svg;
};

/** 生成本地预设图标配置 */
const getPresetIconsConfig = () => {
  const safelist: string[] = [];
  const collections: Record<string, CustomIconLoader> = {};

  try {
    if (!fs.existsSync(svgIconDir)) {
      console.warn(`[unocss:presetIcons] ⚠️ 图标目录不存在: ${svgIconDir}`);
      return { safelist, collections };
    }

    const iconCollections = getSvgIconCollections(svgIconDir);
    console.log("[unocss:presetIcons] 扫描到的图标集合:", Object.keys(iconCollections));

    // 为每个集合创建加载器
    for (const [collectionName, icons] of Object.entries(iconCollections)) {
      const collectionDir = path.join(svgIconDir, collectionName);

      // 检查目录是否存在
      const dirExists = fs.existsSync(collectionDir) && fs.statSync(collectionDir).isDirectory();

      if (dirExists) {
        // 子目录：使用目录加载器
        collections[collectionName] = FileSystemIconLoader(collectionDir, processSvgContent);
        console.log(`[unocss:presetIcons] 📁 加载集合: ${collectionName} (目录)`);
      } else {
        // 根目录：使用自定义加载器（直接从 svgIconDir 读取）
        collections[collectionName] = (iconName: string) => {
          const filePath = path.join(svgIconDir, `${iconName}.svg`);
          if (!fs.existsSync(filePath)) {
            console.warn(`[unocss:presetIcons] ⚠️ 图标文件不存在: ${filePath}`);
            return "";
          }
          const svg = fs.readFileSync(filePath, "utf-8");
          return processSvgContent(svg);
        };
        console.log(`[unocss:presetIcons] 📄 加载集合: ${collectionName} (根目录)`);
      }

      // 生成 safelist
      icons.forEach((icon) => {
        safelist.push(`i-${collectionName}:${icon}`);
      });
    }

    console.log(
      `[unocss:presetIcons] ✅ 读取图标目录成功，找到 ${safelist.length} 个图标，分布在 ${Object.keys(collections).length} 个集合中`
    );
    console.log(`[unocss:presetIcons] 📋 图标列表:`, safelist);
  } catch (error) {
    console.error("[unocss:presetIcons] ❌ 读取图标目录失败");
    console.error(error);
  }

  return { safelist, collections };
};

const { safelist, collections } = getPresetIconsConfig();

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify({ attributify: false }),
    presetIcons({
      scale: 1.2,
      warn: true,
      // 设置图标的默认 CSS 属性
      extraProperties: {
        display: "inline-block",
        width: "1em",
        height: "1em",
      },
      collections,
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // 注册本地图标类名
  safelist,
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
  },
});

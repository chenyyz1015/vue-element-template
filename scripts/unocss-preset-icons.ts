import type { CustomIconLoader } from "@iconify/utils";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgIconDir = path.resolve(__dirname, "../src/assets/icons");

// 配置：需要保留原始颜色的目录名（不进行颜色替换）
const PRESERVE_COLOR_DIRS = ["preserve-color", "brand", "logo"];

/**
 * 判断目录是否需要保留原始颜色
 */
const shouldPreserveColor = (dirPath: string): boolean => {
  const dirName = path.basename(dirPath);
  return PRESERVE_COLOR_DIRS.includes(dirName);
};

/**
 * 递归获取所有 SVG 文件，返回 { 集合名: 图标名 }
 */
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

/**
 * 处理 SVG 内容：替换颜色为 currentColor（可控制是否保留原始颜色）
 */
const processSvgContent = (svg: string, preserveColor: boolean = false): string => {
  if (preserveColor) {
    // 保留原始颜色：不做任何替换
    return svg;
  }

  // 替换颜色为 currentColor
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

/**
 * 生成本地预设图标配置
 */
export const getPresetIconsConfig = () => {
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
      const dirExists = fs.existsSync(collectionDir) && fs.statSync(collectionDir).isDirectory();

      // 判断是否需要保留原始颜色
      const preserveColor = shouldPreserveColor(collectionDir);

      if (dirExists) {
        // 子目录：使用目录加载器
        collections[collectionName] = FileSystemIconLoader(collectionDir, (svg) =>
          processSvgContent(svg, preserveColor)
        );
        console.log(
          `[unocss:presetIcons] 📁 加载集合: ${collectionName} (目录) ${preserveColor ? "🎨 [保留颜色]" : "🔄 [可着色]"}`
        );
      } else {
        // 根目录：使用自定义加载器（直接从 svgIconDir 读取）
        collections[collectionName] = (iconName: string) => {
          const filePath = path.join(svgIconDir, `${iconName}.svg`);
          if (!fs.existsSync(filePath)) {
            console.warn(`[unocss:presetIcons] ⚠️ 图标文件不存在: ${filePath}`);
            return "";
          }
          const svg = fs.readFileSync(filePath, "utf-8");
          // 根目录永远是可着色的（除非单独配置）
          return processSvgContent(svg, false);
        };
        console.log(
          `[unocss:presetIcons] 📄 加载集合: ${collectionName} (根目录) ${preserveColor ? "🎨 [保留颜色]" : "🔄 [可着色]"}`
        );
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

import { generate } from "@ant-design/colors";

const PRIMARY_INDEX = 5;
const DARK_INDEX = 7;
const LIGHT_LEVEL_COUNT = 9;
const DARK_BACKGROUND = "#141414";

/** 将 @ant-design/colors 色阶写入 Element Plus CSS 变量 */
export const applyElementPlusPrimaryColor = (
  color: string,
  options?: { dark?: boolean }
): void => {
  const isDark =
    options?.dark ?? document.documentElement.classList.contains("dark");
  const palette = generate(
    color,
    isDark ? { theme: "dark", backgroundColor: DARK_BACKGROUND } : {}
  );
  const root = document.documentElement;

  root.style.setProperty("--el-color-primary", palette[PRIMARY_INDEX]);

  for (let level = 1; level <= LIGHT_LEVEL_COUNT; level++) {
    const paletteIndex = Math.max(0, PRIMARY_INDEX - level);
    root.style.setProperty(
      `--el-color-primary-light-${level}`,
      palette[paletteIndex]
    );
  }

  root.style.setProperty(
    "--el-color-primary-dark-2",
    palette[DARK_INDEX] ?? palette[PRIMARY_INDEX + 1]
  );
};

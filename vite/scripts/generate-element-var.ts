import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { appTheme } from "../../src/styles/theme";

const varScssPath = fileURLToPath(
  new URL("../src/styles/element/var.scss", import.meta.url)
);

export function generateElementVarScss() {
  const { colors, radius } = appTheme;
  const content = `// 由 scripts/generate-element-var.ts 根据 src/styles/theme.ts 生成，请勿手改
@forward 'element-plus/theme-chalk/src/common/var' with (
  $colors: (
    'primary': (
      'base': ${colors.primary},
    ),
    'success': (
      'base': ${colors.success},
    ),
    'warning': (
      'base': ${colors.warning},
    ),
    'danger': (
      'base': ${colors.danger},
    ),
    'error': (
      'base': ${colors.error},
    ),
    'info': (
      'base': ${colors.info},
    ),
  ),
  $border-radius: (
    'base': ${radius.base},
    'small': ${radius.small},
    'round': 20px,
    'circle': 100%,
  )
);
`;

  if (readFileSync(varScssPath, "utf8") !== content) {
    writeFileSync(varScssPath, content, "utf8");
  }
}

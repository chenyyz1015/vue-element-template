import type { App, Directive, Plugin } from "vue";

const MODULE_PATH_RE = /\/modules\/([^/]+)\.ts$/;

const isDirective = (value: unknown): value is Directive =>
  typeof value === "object" &&
  value !== null &&
  ("mounted" in value ||
    "beforeMount" in value ||
    "updated" in value ||
    "created" in value ||
    "beforeUpdate" in value);

const getDirectiveName = (path: string) => path.match(MODULE_PATH_RE)?.[1];

const directiveModules = import.meta.glob<Directive>("./modules/*.ts", {
  eager: true,
  import: "default",
});

/** 统一注册自定义指令，在 main.ts 中 `app.use(directivesPlugin)` */
export const directivesPlugin: Plugin = {
  install(app: App) {
    for (const [path, directive] of Object.entries(directiveModules)) {
      const name = getDirectiveName(path);

      if (!name) {
        console.warn(`[directives] Skip invalid module path: ${path}`);
        continue;
      }

      if (!isDirective(directive)) {
        console.warn(
          `[directives] Missing export default directive in ${path}`
        );
        continue;
      }

      app.directive(name, directive);
    }
  },
};

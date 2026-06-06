import type { SvgName } from "~virtual/svg-component";
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    /** i18n 标题 key */
    titleKey?: string;
    /** 导航图标（SvgIcon name） */
    icon?: SvgName;
    /** 是否在导航菜单中隐藏 */
    hidden?: boolean;
    /** 是否缓存 */
    noCache?: boolean;
  }
}

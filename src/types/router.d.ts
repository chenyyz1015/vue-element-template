import type { SvgName } from "~virtual/svg-component";
import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    titleKey: string;
    icon: SvgName;
    requiresAuth: boolean;
  }
}

/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    // 项目 Vue 均使用 lang="scss"，且须放在 extends 最后一项
    "stylelint-config-recommended-vue/scss",
  ],
  rules: {
    // Element Plus / UnoCSS 类名与 BEM 并存
    "selector-class-pattern": null,
    "scss/selector-class-pattern": null,
    "custom-property-pattern": null,
    "no-descending-specificity": null,
    "import-notation": null,
    "no-empty-source": null,
  },
};

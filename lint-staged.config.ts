/** @type {import('lint-staged').Configuration} */
export default {
  "*.vue": ["prettier --write", "eslint --fix", "stylelint --fix"],
  "*.{js,ts}": ["prettier --write", "eslint --fix"],
  "*.{css,scss}": "stylelint --fix",
};

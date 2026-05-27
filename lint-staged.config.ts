/** @type {import('lint-staged').Configuration} */
export default {
  "src/**/*.vue": ["prettier --write", "eslint --fix", "stylelint --fix"],
  "src/**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "src/**/*.{css,scss}": "stylelint --fix",
};

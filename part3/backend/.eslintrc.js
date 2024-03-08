module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ["@stylistic/js"],
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "@stylistic/js/quotes": ["error", "double"],
    "@stylistic/js/semi": ["error", "always"],
    "@stylistic/js/no-trailing-spaces": "error",
    "@stylistic/js/object-curly-spacing": ["error", "always"],
    "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],
  },
};

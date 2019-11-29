module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier", "import"],
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    es6: true,
    node: true
  }
};
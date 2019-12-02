module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:eslint-plugin/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: ["eslint-plugin", "prettier", "import"],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    env: {
        es6: true,
        node: true
    }
};

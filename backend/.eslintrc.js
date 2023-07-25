module.exports = {
  env: {
    commonjs: true,
    es2021: true
  },
  extends: "airbnb-base",
  plugins: ["import"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "consistent-return": "off",
    "linebreak-style": "off",
    "object-curly-newline": [
      "error",
      {
        ObjectPattern: { multiline: true },
        ImportDeclaration: "never",
        ExportDeclaration: { multiline: true, minProperties: 3 }
      }
    ],
    "comma-dangle": "off",
    quotes: ["error", "double"],
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_id"]
      }
    ]
  }
};

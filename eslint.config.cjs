/* eslint-disable @typescript-eslint/no-require-imports */
const { FlatCompat } = require('@eslint/eslintrc');
const typeScriptEsLintPlugin = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
});

module.exports = [
  ...compat.config({
    env: { node: true },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        modules: true,
      },
    },
    plugins: ['@typescript-eslint'],
  }),
  {
    rules: {
      'require-jsdoc': 'off',
      'no-invalid-this': 'off',
      // "import/no-unresolved": 0,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],
      'max-len': [
        2,
        {
          code: 140,
          ignoreStrings: true,
          ignoreUrls: true,
        },
      ],
      'no-shadow': 'off',
      'global-require': 0,
      'no-console': 1,
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 1,
    },
  },
];

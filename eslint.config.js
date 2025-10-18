import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  { files: ['**/*.{js,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      parserOptions: { warnOnUnsupportedTypeScriptVersion: false },
      globals: globals.browser,
    },
  },
  { ignores: ['**/*.mjs'] },
  {
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];

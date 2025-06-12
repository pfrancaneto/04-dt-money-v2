import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import erasableSyntaxOnly from 'eslint-plugin-erasable-syntax-only';
import prettier from 'eslint-plugin-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      erasableSyntaxOnly.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        prettierConfig,
        {
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
);

// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import * as pluginImportX from 'eslint-plugin-import-x';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import eslintPluginReact from 'eslint-plugin-react';

//
//

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      '.prettierrc.cjs',
      'commitlint.config.cjs',
      '!**/.server',
      '!**/.client',
      'build/',
      '.eslint-cache',
      'public/tinymce/**/*',
      '.react-router/**/*',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      react: eslintPluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': 'off',
      'no-extra-boolean-cast': 'off',
      'no-constant-binary-expression': 'off',
      'no-unused-vars': 'off',
      'no-unresolved': 'off',
      'no-global-assign': 'off',
      'no-useless-escape': 'off',
      'max-lines': 'off',
      'no-regex-spaces': 'off',

      //

      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-array-delete': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-implied-eval': 'off',

      //
      //

      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react/jsx-curly-brace-presence': 'off',
      'react/display-name': ['error', { ignoreTranspilerName: false, checkContextObjects: true }],
      'react/no-direct-mutation-state': 'off',
      'react/require-render-return': 'off',

      //
      //

      'import-x/default': 'off',
      'import-x/namespace': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-duplicates': 'off',
      'import-x/export': 'off',
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: '@zidsa/zidmui/**', group: 'external', position: 'after' },
            { pattern: '@mui/**', group: 'external', position: 'after' },
            { pattern: '~/zidmui/**', group: 'internal', position: 'after' },
            { pattern: '~/global/**', group: 'internal', position: 'after' },
            { pattern: '~/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc' },
        },
      ],

      //

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['multiline-block-like'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['multiline-block-like'] },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
          rootDir: 'app',
          prefix: '~',
          allowedDepth: 1,
        },
      ],
    },
  },
);

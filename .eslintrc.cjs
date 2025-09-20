/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ['eslint:recommended'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },

    // Custom rules
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'react/jsx-curly-brace-presence': [1, { props: 'never', children: 'never' }],
        'import/default': 'off',
        'no-console': 'error',
        'react/display-name': ['error', { ignoreTranspilerName: false, checkContextObjects: true }],
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-anonymous-default-export': 'warn',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-lines': ['warn', { max: 300, skipComments: true, skipBlankLines: true }],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: ['multiline-block-like'], next: '*' },
          { blankLine: 'always', prev: '*', next: ['multiline-block-like'] },
        ],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [
              { pattern: '@mui/**', group: 'external', position: 'after' },
              { pattern: '~/global/**', group: 'internal', position: 'after' },
              { pattern: '~/**', group: 'internal', position: 'after' },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: { order: 'asc' },
          },
        ],
        'import/no-cycle': [2, { maxDepth: '∞' }],
      },
    },
  ],
};

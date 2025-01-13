module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: false,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'max-lines': ['warn', {max: 200, skipComments: true, skipBlankLines: true}],
        'max-lines-per-function': ['warn', {max: 50, skipComments: true, skipBlankLines: true}],
        'no-console': 'error',
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          // { blankLine: 'always', prev: ['multiline-const', 'multiline-let', 'multiline-var'], next: '*' },
          { blankLine: 'always', prev: ['multiline-block-like'], next: '*' },
          { blankLine: 'always', prev: '*', next: ['multiline-block-like'] },
        ],
        // '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/default': 'off',
        'import/no-unresolved': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-anonymous-default-export': 'warn',
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroupsExcludedImportTypes: ['builtin'],
            distinctGroup: true
          },
        ],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};

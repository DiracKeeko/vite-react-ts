module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^@(?:\\/.*|$)'],
          [
            '^(\\.\\.\\/){2,}\\w+(\\/\\w+)*$',
            '^\\.\\.\\/\\w+(\\/\\w+)*$',
            '^\\.\\/\\w+$',
            '^(\\.\\/\\w+)(\\/\\w+)+$'
          ],
          [
            '^(\\.\\.\\/)+\\w+(\\/\\w+)*(\\.(less|css))$',
            '^(\\.\\/\\w+)(\\/\\w+)*(\\.(less|css))$'
          ],
          ['^\\u0000']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect'
    }
  }
};

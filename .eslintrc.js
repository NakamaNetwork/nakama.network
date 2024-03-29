module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    // Override recommended rule -- allow for return type inferrence
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Override recommended rule -- empty interfaces are sometimes necessary
    '@typescript-eslint/no-empty-interface': 'off',
    // Override recommended rule -- it's preferred to be explicit about types
    '@typescript-eslint/no-inferrable-types': 'off',
    // Override recommended rule -- we utilize non-null assertions
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Override recommended rule -- allow for variables starting with `_` to be
    //   unused.
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true }
    ],
    // Don't allow imports with extensions
    'import/extensions': ['warn', 'never'],
    'import/no-default-export': 'error',
    // Enforce ordering of imported packages
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'parent', ['index', 'sibling'], 'object'],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    // Warn about "useless" path segments (i.e. unambigious ./index and superfluous paths)
    'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
    // Reduce prettier violations to `warn` level
    'prettier/prettier': 'warn',
    // Enforce members of imports to be sorted
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  }
};

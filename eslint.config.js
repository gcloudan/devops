const js = require('@eslint/js');
const jest = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**']
  },

  // Configuration for test files
  {
    files: ['**/src/tests/*.js'],
    languageOptions: {
      globals: {
        // Only declare Jest globals for test files
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly'
      }
    },
    plugins: {
      jest
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },

  // General configuration for all JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        // Define globals for all JavaScript files
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      jest
    },
    rules: {
      'indent': ['error', 2],
      'semi': ['error', 'always'],
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'func-style': ['error', 'expression'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-useless-return': 'error',
      'prefer-const': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'no-extra-parens': ['error', 'all']
    }
  }
];

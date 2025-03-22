import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'], // Apply ESLint only to TypeScript files
    languageOptions: {
      globals: globals.node, // Use Node.js environment
      parser: tseslint.parser, // Use TypeScript parser
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      ...tseslint.configs.recommended.rules, // Apply recommended TypeScript rules
      'no-console': 'warn', // Warn about console logs
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Treat unused variables as errors
    },
  },
  {
    ignores: ['dist/**', '**/*.js'], // Ignore JavaScript files and the dist folder
  },
]);

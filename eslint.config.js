import js from '@eslint/js';
import react from 'eslint-plugin-react';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      "react/prop-types": "off", // Отключить правило prop-types для TypeScript
      "no-unused-vars": "warn",
      'semi': ['error', 'always'], // Требовать точку с запятой
      'quotes': ['error', 'single'], // Использовать одинарные кавычки
      'indent': ['error', 2], // Установить отступы в 2 пробела
      'no-trailing-spaces': 'error', // Удалить пробелы в конце строк
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
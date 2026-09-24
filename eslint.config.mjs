import js from '@eslint/js';
import globals from 'globals';
export default [js.configs.recommended,{files:['resources/js/**/*.js'],languageOptions:{globals:globals.browser}},{files:['scripts/**/*.mjs','vite.config.js'],languageOptions:{globals:globals.node}}];

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
export default defineConfig({base:'./',plugins:[laravel({input:['resources/css/frontend/app.css','resources/css/frontend/festival.css','resources/css/frontend/composition.css','resources/css/frontend/home-2026.css','resources/css/frontend/site-theme.css','resources/js/frontend/app.js','resources/js/frontend/home-2026.js'],refresh:true})]});

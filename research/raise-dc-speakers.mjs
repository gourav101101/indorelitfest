import fs from 'node:fs/promises';
import sharp from 'sharp';
const source='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/exec-3d4942fa-8e2d-4fb3-a461-6e56196bcace.png';
await fs.copyFile(source,'public/images/hero-seven-voices-dc-raised-2026.png');
await sharp(source).webp({quality:90}).toFile('public/images/hero-seven-voices-dc-raised-2026.webp');
const view='resources/views/frontend/pages/home.blade.php';
let html=await fs.readFile(view,'utf8');
html=html.replace('hero-seven-voices-dc-spacing-2026.webp','hero-seven-voices-dc-raised-2026.webp');
await fs.writeFile(view,html);
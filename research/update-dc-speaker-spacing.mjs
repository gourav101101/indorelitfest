import fs from 'node:fs/promises';
import sharp from 'sharp';
const source='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/exec-691453fb-3d20-495e-a1a8-0b3cab16b10f.png';
await fs.copyFile(source,'public/images/hero-seven-voices-dc-spacing-2026.png');
await sharp(source).webp({quality:90}).toFile('public/images/hero-seven-voices-dc-spacing-2026.webp');
const view='resources/views/frontend/pages/home.blade.php';
const html=await fs.readFile(view,'utf8');
await fs.writeFile(view,html.replace('hero-seven-voices-seamless-v2-2026.webp','hero-seven-voices-dc-spacing-2026.webp'));
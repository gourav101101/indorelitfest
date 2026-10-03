import fs from 'node:fs/promises';
import sharp from 'sharp';
const source='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/exec-52836949-9566-4a1e-98d8-62715c0ac099.png';
await fs.copyFile(source,'public/images/hero-seven-voices-seamless-v2-2026.png');
await sharp(source).webp({quality:90}).toFile('public/images/hero-seven-voices-seamless-v2-2026.webp');
const path='resources/views/frontend/pages/home.blade.php';
let html=await fs.readFile(path,'utf8');
await fs.writeFile(path,html.replace('hero-seven-voices-seamless-2026.webp','hero-seven-voices-seamless-v2-2026.webp'));
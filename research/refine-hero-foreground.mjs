import fs from 'node:fs/promises';
import sharp from 'sharp';
const generated='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/';
for(const [side,file] of [['left','exec-ee673de8-2d6d-457c-9683-d2ec02fc508b.png'],['right','exec-6945f529-9686-455f-bcc7-03e40695ac6f.png']]){
 await fs.copyFile(generated+file,`public/images/hero-foreground-speakers-${side}-wide-2026.png`);
 await sharp(generated+file).resize({width:1100}).webp({quality:88}).toFile(`public/images/hero-foreground-speakers-${side}-wide-2026.webp`);
}
let html=await fs.readFile('resources/views/frontend/pages/home.blade.php','utf8');
html=html.replaceAll('hero-foreground-speakers-left-2026.webp','hero-foreground-speakers-left-wide-2026.webp').replaceAll('hero-foreground-speakers-right-2026.webp','hero-foreground-speakers-right-wide-2026.webp').replaceAll('width="1122" height="1402"','width="1536" height="1024"');
// Supply the mask through Laravel's asset helper so subdirectory deployments work.
html=html.replace('<div class="ilf-hero-scene">',`<div class="ilf-hero-scene" style="--hero-figure-mask: url('{{ asset('images/hero-original-figure-mask.svg') }}')">`);
await fs.writeFile('resources/views/frontend/pages/home.blade.php',html);
let css=await fs.readFile('resources/css/frontend/home-scenes.css','utf8');
css=css.replace("mask-image:url('/images/hero-original-figure-mask.svg')","mask-image:var(--hero-figure-mask)").replace('height:82%;width:auto;','height:auto;width:38%;');
await fs.writeFile('resources/css/frontend/home-scenes.css',css);
let mask=await fs.readFile('public/images/hero-original-figure-mask.svg','utf8');
mask=mask.replace('<g fill="black">','<g fill="black"><rect x="1400" y="250" width="335" height="474"/>');
await fs.writeFile('public/images/hero-original-figure-mask.svg',mask);
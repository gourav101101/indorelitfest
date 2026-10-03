import fs from 'node:fs';import sharp from 'sharp';
const root='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/';
for(const [side,file] of [['left','exec-2366cb0f-f4d5-45d9-92e3-78afc298e653.png'],['right','exec-181bf1cd-4393-4cd6-b177-40bbce4247e2.png']]){
 const target='public/images/hero-voices-'+side+'-v2-2026.png';fs.copyFileSync(root+file,target);
 const metadata=await sharp(target).metadata();if(!metadata.hasAlpha)throw new Error('Artwork has no transparency');
 await sharp(target).resize({width:1000,withoutEnlargement:true}).webp({quality:87}).toFile(target.replace('.png','.webp'));
 console.log(side,{width:metadata.width,height:metadata.height,webpBytes:fs.statSync(target.replace('.png','.webp')).size});
}
const viewPath='resources/views/frontend/pages/home.blade.php';let view=fs.readFileSync(viewPath,'utf8');
view=view.replaceAll('hero-voices-left-2026.webp','hero-voices-left-v2-2026.webp').replaceAll('hero-voices-right-2026.webp','hero-voices-right-v2-2026.webp');
view=view.replaceAll('width="1122" height="1402"','width="1254" height="1254"');
fs.writeFileSync(viewPath,view);
const cssPath='resources/css/frontend/home-scenes.css';let css=fs.readFileSync(cssPath,'utf8');
const marker='/* Seven client-selected past voices, painted for the hero. */';if(!css.includes(marker))throw new Error('Hero CSS marker missing');
css=css.slice(0,css.indexOf(marker))+"/* Seven past festival voices framed by Indore's landmarks. */\n.ilf-hero-voices{position:absolute;top:90px;width:39%;height:calc(100% - 135px);max-width:700px;object-fit:contain;pointer-events:none}\n.ilf-hero-voices-left{left:2%;object-position:left top}\n.ilf-hero-voices-right{right:2%;object-position:right top}\n@media(min-width:1600px){\n .ilf-hero-voices{top:100px;width:38%;max-width:760px}\n .ilf-hero-voices-left{left:3%}\n .ilf-hero-voices-right{right:3%}\n}\n@media(min-width:701px) and (max-width:1099px){\n .ilf-home .ilf-hero{padding-top:325px;min-height:970px}\n .ilf-home .ilf-hero-sky{height:970px}\n .ilf-home .ilf-hero-arch{top:210px}\n .ilf-home .ilf-hero-voices{top:12px;width:45%;height:310px;max-width:none}\n .ilf-home .ilf-hero-voices-left{left:2%;object-position:left top}\n .ilf-home .ilf-hero-voices-right{right:2%;object-position:right top}\n .ilf-home .ilf-hero-mark{display:none}\n}\n@media(max-width:700px){\n .ilf-home .ilf-hero{padding-top:245px}\n .ilf-home .ilf-hero-sky{height:730px}\n .ilf-home .ilf-hero-arch{top:150px}\n .ilf-home .ilf-hero-voices{top:14px;width:47%;height:225px;max-width:none}\n .ilf-home .ilf-hero-voices-left{left:2%;object-position:left top}\n .ilf-home .ilf-hero-voices-right{right:2%;object-position:right top}\n .ilf-home .ilf-hero-mark{display:none}\n}\n";fs.writeFileSync(cssPath,css);
let review=fs.readFileSync('research/review-hero-voices.mjs','utf8').replace("research/hero-voices-2026-10-02","research/hero-voices-v2-2026-10-02").replace('[1440,768,390]','[1920,1440,1280,768,390,320]');
fs.writeFileSync('research/review-hero-voices-v2.mjs',review);

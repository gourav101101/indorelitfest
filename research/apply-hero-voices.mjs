import fs from 'node:fs';import sharp from 'sharp';
const root='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/';
for(const [side,file] of [['left','exec-619dd2c0-3072-4e49-af18-3092e6b3b55c.png'],['right','exec-3f7379a0-94af-4af3-b6dc-cb5c6f09764e.png']]){
 const dest='public/images/hero-voices-'+side+'-2026.png';fs.copyFileSync(root+file,dest);
 await sharp(dest).resize({width:1000,withoutEnlargement:true}).webp({quality:87}).toFile(dest.replace('.png','.webp'));
 console.log(side,await sharp(dest).metadata());
}
const p='resources/views/frontend/pages/home.blade.php';let view=fs.readFileSync(p,'utf8');
view=view.replace(/            <img class="ilf-hero-people is-current"[^>]+>/,'            <img class="ilf-hero-voices ilf-hero-voices-left" src="{{ asset(\'images/hero-voices-left-2026.webp\') }}" alt="" width="1122" height="1402" fetchpriority="high">\n            <img class="ilf-hero-voices ilf-hero-voices-right" src="{{ asset(\'images/hero-voices-right-2026.webp\') }}" alt="" width="1122" height="1402" fetchpriority="high">');
fs.writeFileSync(p,view);
fs.appendFileSync('resources/css/frontend/home-scenes.css',"\n/* Seven client-selected past voices, painted for the hero. */\n.ilf-hero-voices{position:absolute;top:105px;width:38%;height:calc(100% - 110px);max-width:600px;object-fit:contain;pointer-events:none}\n.ilf-hero-voices-left{left:-2%;object-position:left bottom}\n.ilf-hero-voices-right{right:-2%;object-position:right bottom}\n@media(min-width:1600px){.ilf-hero-voices{width:36%;max-width:680px}}\n@media(min-width:701px) and (max-width:1099px){\n .ilf-hero-voices{top:70px;width:40%;height:500px}\n}\n@media(max-width:700px){\n .ilf-home .ilf-hero{padding-top:255px}\n .ilf-home .ilf-hero-sky{height:290px}\n .ilf-home .ilf-hero-arch{top:160px}\n .ilf-home .ilf-hero-voices{top:0;width:49%;height:260px;max-width:none}\n .ilf-home .ilf-hero-voices-left{left:0;object-position:left top}\n .ilf-home .ilf-hero-voices-right{right:0;object-position:right top}\n .ilf-home .ilf-hero-mark{display:none}\n}\n");
let review=fs.readFileSync('research/review-speaker-attendance.mjs','utf8').replace("research/speaker-attendance-2026-10-01","research/hero-voices-2026-10-02").replace("for(const width of [1440,390])","for(const width of [1440,768,390])").replace("path==='/'?'.ilf-speakers'","path==='/'?'.ilf-hero'");
fs.writeFileSync('research/review-hero-voices.mjs',review);

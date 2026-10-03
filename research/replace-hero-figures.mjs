import fs from 'node:fs/promises';
import sharp from 'sharp';
const generated='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/';
for(const [side,file] of [['left','exec-4976b0c0-a0f6-4757-b077-d5e99b291b6f.png'],['right','exec-530f9c88-6449-402a-b62e-da93b39a4591.png']]){
 await fs.copyFile(generated+file,`public/images/hero-foreground-speakers-${side}-2026.png`);
 await sharp(generated+file).resize({height:1000}).webp({quality:88}).toFile(`public/images/hero-foreground-speakers-${side}-2026.webp`);
}
const path='resources/views/frontend/pages/home.blade.php';
let html=await fs.readFile(path,'utf8');
html=html.replace(/        <div class="ilf-hero-voices"[\s\S]*?<\/div>\r?\n/,'');
const image=html.match(/            <img class="ilf-hero-people[^\n]+/)[0];
html=html.replace(image,`            <div class="ilf-hero-scene">
${image}
                <img class="ilf-hero-foreground ilf-hero-foreground-left" src="{{ asset('images/hero-foreground-speakers-left-2026.webp') }}" alt="" width="1122" height="1402">
                <img class="ilf-hero-foreground ilf-hero-foreground-right" src="{{ asset('images/hero-foreground-speakers-right-2026.webp') }}" alt="" width="1122" height="1402">
            </div>`);
await fs.writeFile(path,html);
let css=await fs.readFile('resources/css/frontend/home-scenes.css','utf8');
css=css.slice(0,css.indexOf('/* Separate painted archive portraits;'));
css+=`/* Replace the original foreground figures while retaining the original landmark pixels. */
.ilf-hero-scene{position:absolute;left:0;bottom:0;width:100%;aspect-ratio:3/1}
.ilf-home .ilf-hero-scene .ilf-hero-people[data-hero-scene]{position:absolute;inset:0;width:100%;height:100%;min-height:0;transform:none;object-fit:fill;mask-image:url('/images/hero-original-figure-mask.svg');mask-size:100% 100%;mask-repeat:no-repeat}
.ilf-hero-foreground{position:absolute;bottom:0;height:82%;width:auto;max-width:none;object-fit:contain}
.ilf-hero-foreground-left{left:0}
.ilf-hero-foreground-right{right:0}
@media(min-width:701px) and (max-width:1099px){.ilf-hero-scene{width:1250px;left:50%;transform:translateX(-50%)}}
@media(max-width:700px){.ilf-hero-scene{width:650px;left:50%;transform:translateX(-50%);bottom:240px}}
`;
await fs.writeFile('resources/css/frontend/home-scenes.css',css);
const mask=`<svg xmlns="http://www.w3.org/2000/svg" width="2172" height="724" viewBox="0 0 2172 724"><defs><mask id="figures" maskUnits="userSpaceOnUse"><rect width="2172" height="724" fill="white"/><g fill="black"><path d="M0 80L170 80L210 145L225 240L170 400L105 550L0 724Z"/><path d="M0 724L80 460L115 300L170 220L235 195L310 210L350 280L380 400L430 540L485 724Z"/><path d="M350 724L380 450L440 335L480 305L545 305L575 355L590 420L665 450L780 555L910 724Z"/><path d="M1350 724L1380 475L1440 365L1490 285L1550 265L1605 280L1635 360L1680 460L1750 724Z"/><path d="M1630 724L1620 455L1660 290L1700 200L1760 190L1800 225L1820 300L1890 260L1910 310L1870 430L1930 600L1950 724Z"/><path d="M1740 724L1790 495L1845 370L1895 325L1960 325L2010 375L2030 485L2100 570L2172 724Z"/></g></mask></defs><rect width="2172" height="724" fill="white" mask="url(#figures)"/></svg>`;
await fs.writeFile('public/images/hero-original-figure-mask.svg',mask);
console.log('Replaced floating groups with painted foreground speakers; kept original landmark source.');
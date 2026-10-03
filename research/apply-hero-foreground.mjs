import fs from 'node:fs/promises';
import sharp from 'sharp';
const root='C:/Users/ADIN/.codex/generated_images/01a0f693-daec-73c1-872b-3679c98edab5/';
for(const [side,file] of [['left','exec-9825b90c-e37a-446f-a10b-3168eb48f02f.png'],['right','exec-a96cf73e-50dc-4d3c-a980-a4d775d7a1a3.png']]) {
 await fs.copyFile(root+file,`public/images/hero-speaker-paintings-${side}-2026.png`);
 await sharp(root+file).resize({width:1000}).webp({quality:87}).toFile(`public/images/hero-speaker-paintings-${side}-2026.webp`);
}
const view='resources/views/frontend/pages/home.blade.php';
let html=await fs.readFile(view,'utf8');
const marker='        <div class="ilf-hero-content">';
html=html.replace(marker,`        <div class="ilf-hero-voices" aria-hidden="true">
            <img class="ilf-hero-voices-left" src="{{ asset('images/hero-speaker-paintings-left-2026.webp') }}" alt="" width="1536" height="1024">
            <img class="ilf-hero-voices-right" src="{{ asset('images/hero-speaker-paintings-right-2026.webp') }}" alt="" width="1536" height="1024">
        </div>
${marker}`);
await fs.writeFile(view,html);
await fs.appendFile('resources/css/frontend/home-scenes.css',`
/* Separate painted archive portraits; preserve the original landmark image and placement. */
.ilf-hero-voices{position:absolute;inset:0;z-index:-2;pointer-events:none}
.ilf-hero-voices img{position:absolute;top:60px;width:min(28%,390px);height:auto}
.ilf-hero-voices-left{left:1.2%}
.ilf-hero-voices-right{right:1.2%}
@media(max-width:1099px){
 .ilf-hero-voices{position:relative;inset:auto;z-index:auto;display:flex;align-items:center;justify-content:center;gap:6px;width:min(640px,96%);margin:20px auto 0}
 .ilf-hero-voices img{position:static;width:calc(50% - 3px);height:auto}
 .ilf-hero-voices-left{order:0}.ilf-hero-voices-right{order:1}
 .ilf-hero-content{position:relative}
}
`);
// Move the artwork below the invitation on small screens, while CSS positions it in the sky on desktop.
html=await fs.readFile(view,'utf8');
const block=html.match(/        <div class="ilf-hero-voices"[\s\S]*?<\/div>\n/)[0];
html=html.replace(block,'').replace('    </section>',block+'    </section>');
await fs.writeFile(view,html);
let review=await fs.readFile('research/review-hero-voices-v2.mjs','utf8');
review=review.replace('hero-voices-v2-2026-10-02','hero-voices-foreground-2026-10-02');
await fs.writeFile('research/review-hero-voices-foreground.mjs',review);
console.log('Saved two transparent portrait assets and integrated separate layers.');
import fs from 'node:fs/promises';
const view='resources/views/frontend/partials/ilf-footer.blade.php';
let html=await fs.readFile(view,'utf8');
html=html.replace('<div class="ilf-produced">','<div class="ilf-produced ilf-producer-compact">').replace('<p>Produced by</p>','<p class="ilf-producer-label">Produced by</p>');
html=html.replace(/(<img class="producer-logo"[^>]+>)/,'<div class="ilf-producer-logo-frame">$1</div>');
html=html.replace('<p>Hello Hindustan News & Network</p>','<p class="ilf-producer-name">Hello Hindustan News & Network</p>');
await fs.writeFile(view,html);
await fs.appendFile('resources/css/frontend/site-theme.css',`
/* Compact producer identity; retain the original logo and trim its empty display area. */
.festival-site .ilf-footer .ilf-producer-compact{display:flex;flex-direction:column;align-items:flex-start;gap:0;min-width:0}
.festival-site .ilf-footer .ilf-producer-compact>img{display:block;float:none;width:76px;height:76px;margin:0 0 18px}
.festival-site .ilf-footer .ilf-producer-compact .ilf-producer-label{margin:0 0 10px;font-size:12px;line-height:1.5;max-width:none}
.festival-site .ilf-producer-logo-frame{width:180px;height:56px;max-width:100%;overflow:hidden;margin:0 0 10px}
.festival-site .ilf-footer .ilf-producer-logo-frame img.producer-logo{display:block;width:204px;max-width:none;height:auto;margin:0;float:none;transform:translate(-13px,-14px);border-radius:0;background:transparent}
.festival-site .ilf-footer .ilf-producer-compact .ilf-producer-name{font-size:13px;line-height:1.6;margin:0;max-width:240px}
.festival-site .ilf-footer .ilf-producer-compact small{font-size:12px;line-height:1.7;max-width:240px;margin:16px 0 0;padding:0;clear:none}
`);
let review=await fs.readFile('research/review-hero-voices-foreground.mjs','utf8');
review=review.replace('research/hero-voices-foreground-2026-10-02','research/footer-layout-2026-10-03').replace("?'.ilf-hero'","?'.ilf-footer-grid'").replace('scrollY-150','scrollY-40');
await fs.writeFile('research/review-footer-layout.mjs',review);
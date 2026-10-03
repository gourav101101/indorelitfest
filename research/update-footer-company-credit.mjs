import fs from 'node:fs/promises';
const footerPath='resources/views/frontend/partials/ilf-footer.blade.php';
let footer=await fs.readFile(footerPath,'utf8');
const credits=footer.match(/<details class="footer-art-credits">[\s\S]*?<\/details>/)?.[0];
if(!credits)throw new Error('Expected artwork credits block missing');
footer=footer.replace(/@if\(request\(\)->routeIs\('home'\)\)\s*<details class="footer-art-credits">[\s\S]*?<\/details>\s*@endif\s*/,'');
footer=footer.replace('<span>Let the legacy of literature grow.</span>','<span class="ilf-website-credit">Website by <strong>MAK Digital Arena</strong></span>');
await fs.writeFile(footerPath,footer);
const aboutPath='resources/views/frontend/pages/about.blade.php';
let about=await fs.readFile(aboutPath,'utf8');
about=about.replace('@endsection','<section id="artwork-credits" class="container section">\n'+credits.replace('class="footer-art-credits"','class="artwork-credits"')+'\n</section>\n@endsection');
await fs.writeFile(aboutPath,about);
await fs.appendFile('resources/css/frontend/site-theme.css',`
.festival-site .ilf-website-credit strong{color:var(--ilf-gold);font-weight:600}
.festival-site .artwork-credits{font-size:14px;line-height:1.8;overflow-wrap:anywhere}
.festival-site .artwork-credits summary{cursor:pointer;font-weight:600}
.festival-site .artwork-credits p{margin-block:16px}
.festival-site .artwork-credits ul{padding-left:22px}
.festival-site .artwork-credits li{margin-bottom:14px}
.festival-site .artwork-credits a{text-decoration:underline}
`);
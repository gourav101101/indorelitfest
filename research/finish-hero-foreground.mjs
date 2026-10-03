import fs from 'node:fs/promises';
let css=await fs.readFile('resources/css/frontend/home-scenes.css','utf8');
css=css.replace('height:auto;width:32%;','height:auto;width:35%;').replace('left:-3%','left:-4.5%').replace('right:-3%','right:-4.5%');
css+='\n@media(max-width:700px){.ilf-hero-foreground-left{left:8%}.ilf-hero-foreground-right{right:8%}}\n';
await fs.writeFile('resources/css/frontend/home-scenes.css',css);
let mask=await fs.readFile('public/images/hero-original-figure-mask.svg','utf8');
mask=mask.replace('<g fill="black">','<g fill="black"><path d="M1820 240L1850 215L1900 220L1915 255L1885 310L1875 365L1800 470L1750 420Z"/>');
await fs.writeFile('public/images/hero-original-figure-mask.svg',mask);
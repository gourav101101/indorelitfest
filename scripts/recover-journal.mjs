import fs from 'node:fs/promises';
const root='research/journal-recovery-2026-09-30';
await fs.mkdir(root,{recursive:true});
async function get(url){const r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error(url+' '+r.status);return r.text()}
const index=await get('https://indorelitfest.in/blog.php');
await fs.writeFile(root+'/blog.html',index);
const body=index.replace(/<!--[\s\S]*?-->/g,'').match(/<section[^>]*class="about-ilf"[\s\S]*?<\/section>/i)?.[0];
if(!body)throw Error('Missing blog section');
const slugs=[...new Set([...body.matchAll(/href=["']([^"']+\.php)["']/g)].map(m=>m[1].replace('.php','')))];
await fs.writeFile(root+'/slugs.json',JSON.stringify(slugs,null,2));
for(let i=0;i<slugs.length;i+=4) await Promise.all(slugs.slice(i,i+4).map(async slug=>{await fs.writeFile(root+'/'+slug+'.html',await get('https://indorelitfest.in/'+slug+'.php'));console.log(slug)}));
await fs.writeFile(root+'/main.css',await get('https://indorelitfest.in/css/main.css'));
console.log('Recovered',slugs.length,'articles');
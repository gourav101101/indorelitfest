import fs from 'node:fs/promises';
import path from 'node:path';
await fs.mkdir('research/legacy',{recursive:true});
const pages=['index.php','about.php','speakers.php','schedule.php','blog.php','contact.php','day-one.php','day-two.php','day-three.php','sharmistha-mukherjee.php','ramayan-dhar-dwivedi.php','writing-toolkit.php','one-nation-one-election.php','mera-rachna-dharm.php','uday-mahurkar.php','ambi-parameswaran.php','rahagir.php','new-age-writing.php','budding-authors.php','vinay_blog.php','vikas_blog.php','kavita_blog.php'];
const assets=new Set();
for(const page of pages){
const html=await (await fetch('https://indorelitfest.in/'+page)).text();
await fs.writeFile('research/legacy/'+page.replace('.php','.html'),html);
const links=[...html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map(m=>m[1]);
for(const link of links) if(/^(images\/|.*\.pdf$)/i.test(link))assets.add(link);
console.log('Page:',page);
}
const manifest=[];
for(const source of assets){
const destination='public/legacy/'+source;
try{await fs.access(destination);}catch{const response=await fetch(new URL(source,'https://indorelitfest.in/'));if(!response.ok){console.log('Unavailable:',source,response.status);continue;}await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,Buffer.from(await response.arrayBuffer()));}
manifest.push({source:'https://indorelitfest.in/'+source,local:'/legacy/'+source});
}
await fs.writeFile('research/legacy/assets.json',JSON.stringify(manifest,null,2));console.log('Assets:',manifest.length);

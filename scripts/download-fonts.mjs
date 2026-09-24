import fs from 'node:fs/promises';
const query='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap';
const response=await fetch(query,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}});
if(!response.ok)throw new Error(`Font stylesheet: ${response.status}`);
let css=await response.text();const urls=[...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];
await fs.mkdir('public/fonts',{recursive:true});
for(let i=0;i<urls.length;i++){
 const r=await fetch(urls[i]);if(!r.ok)throw new Error('Font download failed');
 const name=`festival-${i}.woff2`;await fs.writeFile('public/fonts/'+name,Buffer.from(await r.arrayBuffer()));css=css.replaceAll(urls[i],name);
}
await fs.writeFile('public/fonts/fonts.css',css);
for(const family of ['dmsans','fraunces','notosansdevanagari']){
 const license=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
 if(!license.ok)throw new Error(`License unavailable: ${family}`);
 await fs.writeFile(`public/fonts/${family}-OFL.txt`,await license.text());
}
console.log(`Saved ${urls.length} font files locally.`);

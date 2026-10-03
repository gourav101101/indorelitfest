import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
const articles=JSON.parse(await fs.readFile('research/journal-recovery-2026-09-30/articles.json','utf8'));
const sources=[...new Set(articles.flatMap(a=>a.photo_sources.map(p=>p.url)))];
const folder='public/legacy/journal';await fs.mkdir(folder,{recursive:true});
const images=new Map();
for(let i=0;i<sources.length;i+=5){
 await Promise.all(sources.slice(i,i+5).map(async url=>{
  const key=crypto.createHash('sha256').update(url).digest('hex').slice(0,12);
  const ext=path.extname(new URL(url).pathname).toLowerCase();
  const original=folder+'/'+key+ext;
  let buffer;try{buffer=await fs.readFile(original)}catch{
   let r;for(let attempt=0;attempt<4;attempt++){try{r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error(url+' '+r.status);break}catch(error){if(attempt===3)throw error;await new Promise(resolve=>setTimeout(resolve,800));}}
   buffer=Buffer.from(await r.arrayBuffer());await fs.writeFile(original,buffer);
  }
  const metadata=await sharp(buffer).metadata();
  await sharp(buffer).rotate().resize({width:1400,withoutEnlargement:true}).webp({quality:86}).toFile(folder+'/'+key+'.webp');
  await sharp(buffer).rotate().resize({width:640,withoutEnlargement:true}).webp({quality:82}).toFile(folder+'/'+key+'-thumb.webp');
  images.set(url,{image:'/legacy/journal/'+key+'.webp',thumbnail:'/legacy/journal/'+key+'-thumb.webp',original:'/legacy/journal/'+key+ext,width:metadata.width,height:metadata.height});
 }));
 console.log(Math.min(i+5,sources.length)+'/'+sources.length+' images');
}
for(const a of articles){
 a.photos=a.photo_sources.map(p=>({...images.get(p.url),source_url:p.url,source_kind:p.kind,alt:a.title+' - '+(p.kind==='shared-archive-background'?'Archive photograph from the original article':'Festival photograph from the original article')}));
 a.image=a.photos[0].image;a.thumbnail=a.photos[0].thumbnail;a.image_alt=a.photos[0].alt;
 delete a.photo_sources;
}
await fs.writeFile('resources/data/journal.json',JSON.stringify(articles,null,2)+'\n');
console.log('Saved',articles.length,'articles,',sources.length,'unique images,',articles.reduce((s,a)=>s+a.photos.length,0),'photo placements');
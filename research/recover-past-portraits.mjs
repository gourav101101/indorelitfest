import fs from 'node:fs/promises';
import sharp from 'sharp';
const profiles=JSON.parse(await fs.readFile('resources/data/past-speakers.json','utf8'));
const sources=JSON.parse(await fs.readFile('research/client-changes-2026-09-28/public-speaker-merged.json','utf8'));
const get=async url=>{const r=await fetch(url,{headers:{'User-Agent':'ILFWebsiteContentReview/1.0'},signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(String(r.status));return r;};
const files=sources.filter(s=>s.thumbnail?.includes('.wikimedia.org/wikipedia/commons/')).map(s=>{const url=new URL(s.thumbnail);url.search='';return {slug:s.slug,file:'File:'+decodeURIComponent(url.pathname.split('/').at(url.pathname.includes('/thumb/')?-2:-1)),url:url.href};});
const api='https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',prop:'imageinfo',iiprop:'extmetadata|url',titles:files.map(x=>x.file).join('|'),format:'json'});
const result=await(await get(api)).json();
await fs.writeFile('research/client-changes-2026-09-28/portrait-licenses.json',JSON.stringify(result,null,2));
await fs.mkdir('public/images/speakers/past',{recursive:true});
const plain=text=>(text||'').replace(/<[^>]*>/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
for(const file of files){
 const page=Object.values(result.query.pages).find(p=>p.title.replaceAll('_',' ')===file.file.replaceAll('_',' '));
 const info=page?.imageinfo?.[0],meta=info?.extmetadata,license=plain(meta?.LicenseShortName?.value);
 if(!meta||!(/^(CC BY|CC0|Public domain)/i.test(license))){console.log('SKIP',file.slug,license);continue;}
 try {
  const bytes=Buffer.from(await(await get(file.url)).arrayBuffer());
  const path=`public/images/speakers/past/${file.slug}.webp`;
  await sharp(bytes).resize({width:700,height:850,fit:'inside',withoutEnlargement:true}).webp({quality:86}).toFile(path);
  const profile=profiles.find(p=>p.slug===file.slug);
  profile.image='/images/speakers/past/'+file.slug+'.webp';
  profile.portrait={credit:plain(meta.Artist?.value)||'Wikimedia Commons contributors',license,license_url:meta.LicenseUrl?.value||'https://commons.wikimedia.org/wiki/Commons:Licensing',source:info.descriptionurl,changes:'Resized and converted to WebP; displayed with a responsive crop.'};
  console.log('SAVED',file.slug,license);
 }catch(error){console.log('FAILED',file.slug,error.message);}
}
await fs.writeFile('resources/data/past-speakers.json',JSON.stringify(profiles,null,2)+'\n');

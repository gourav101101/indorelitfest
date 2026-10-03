import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root='D:/ILF - Content for Website/Selected Photos';
const output='research/speaker-photo-review-2026-09-30';
await fs.mkdir(output+'/thumbnails',{recursive:true});
async function walk(dir){const entries=await fs.readdir(dir,{withFileTypes:true});const nested=await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]));return nested.flat();}
function captions(exif){
 if(!exif)return {};
 try{
 const b=exif.subarray(exif.toString('ascii',0,4)==='Exif'?6:0),le=b.toString('ascii',0,2)==='II';
 const u16=o=>le?b.readUInt16LE(o):b.readUInt16BE(o),u32=o=>le?b.readUInt32LE(o):b.readUInt32BE(o);
 const offset=u32(4),count=u16(offset),result={};
 for(let i=0;i<count;i++){const p=offset+2+i*12,tag=u16(p),size=u32(p+4),names={270:'description',315:'artist',40091:'title',40092:'comment',40094:'keywords',40095:'subject'};if(!names[tag])continue;const start=size<=4?p+8:u32(p+8);result[names[tag]]=b.subarray(start,start+size).toString(tag>=40091?'utf16le':'utf8').replaceAll('\0','').trim();}
 return result;
 }catch{return {};}
}
const files=(await walk(root)).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
const rows=[];
for(let i=0;i<files.length;i++){
 const source=files[i],id=String(i+1).padStart(3,'0');
 try{const meta=await sharp(source).metadata();await sharp(source).rotate().resize(420,300,{fit:'inside',withoutEnlargement:true}).webp({quality:72}).toFile(output+'/thumbnails/'+id+'.webp');rows.push({id,file:path.relative(root,source).replaceAll('\\','/'),width:meta.width,height:meta.height,captions:captions(meta.exif)});}catch(e){rows.push({id,file:path.relative(root,source),error:e.message});}
}
await fs.writeFile(output+'/photo-metadata.json',JSON.stringify(rows,null,2));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const html='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ILF supplied photo review</title><style>body{font:16px system-ui;background:#fffaf1;color:#173b70;margin:24px}header{max-width:900px}input{padding:12px;width:min(85%,550px)}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;margin-top:25px}figure{margin:0;background:white;padding:12px;border:1px solid #dfcba5;border-radius:10px}img{width:100%;height:230px;object-fit:contain}figcaption{overflow-wrap:anywhere}small{display:block;color:#655d50;margin-top:8px}[hidden]{display:none}</style><header><h1>Supplied festival photographs</h1><p>'+rows.length+' images. Search by filename or folder. No speaker identity or attendance year has been inferred from appearance or camera dates. Edition folder names are shown exactly as supplied.</p><label>Find a file <input id="search" type="search" placeholder="e.g. 10th edition or LAGO1656"></label></header><main>'+rows.map(r=>'<figure data-file="'+esc(r.file.toLowerCase())+'"><a href="thumbnails/'+r.id+'.webp"><img loading="lazy" src="thumbnails/'+r.id+'.webp" alt="Supplied photo '+r.id+'"></a><figcaption><strong>'+r.id+'</strong> · '+esc(r.file)+'<small>'+r.width+' × '+r.height+'</small></figcaption></figure>').join('')+'</main><script>document.getElementById("search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll("figure").forEach(f=>f.hidden=!f.dataset.file.includes(q))})</script></html>';
await fs.writeFile(output+'/index.html',html);
console.log(JSON.stringify({images:rows.length,errors:rows.filter(r=>r.error).length,withCaptions:rows.filter(r=>Object.values(r.captions||{}).some(Boolean))},null,2));

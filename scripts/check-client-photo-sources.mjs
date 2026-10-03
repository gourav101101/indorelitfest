import fs from 'node:fs/promises';import path from 'node:path';import crypto from 'node:crypto';import {pathToFileURL} from 'node:url';
const dir='research/speaker-photo-review-2026-09-30',root='D:/ILF - Content for Website/Selected Photos';
const rows=JSON.parse(await fs.readFile(dir+'/photo-metadata.json','utf8'));
const legacy=JSON.parse(await fs.readFile('resources/data/legacy.json','utf8')).speakers;
const pdf=JSON.parse(await fs.readFile('resources/data/speakers-2024.json','utf8')).speakers;
const known=[];
for(const s of [...legacy,...pdf]){const file='public/'+s.image.replace(/^\//,'');try{const bytes=await fs.readFile(file);known.push({slug:s.slug,name:s.name,source:file,size:bytes.length,hash:crypto.createHash('sha256').update(bytes).digest('hex')});}catch(error){if(error.code!=='ENOENT')throw error;}}
const matches=[];
for(const r of rows){const file=path.join(root,r.file),stat=await fs.stat(file),candidates=known.filter(k=>k.size===stat.size);if(!candidates.length)continue;const hash=crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');for(const k of candidates)if(k.hash===hash)matches.push({file:r.file,name:k.name,slug:k.slug,evidence:'Exact original-file SHA-256 match',source:k.source});}
await fs.writeFile(dir+'/exact-source-matches.json',JSON.stringify(matches,null,2));
let html=await fs.readFile(dir+'/index.html','utf8');
for(const r of rows)html=html.replace('href="thumbnails/'+r.id+'.webp"','href="'+pathToFileURL(path.join(root,r.file)).href+'"');
html=html.replace('Search by filename or folder.','Search by filename or folder. Click a photograph to open its full-resolution original.');
await fs.writeFile(dir+'/index.html',html);
console.log(JSON.stringify({reviewed:rows.length,knownOriginals:known.length,exactMatches:matches,descriptiveCaptions:rows.filter(r=>Object.entries(r.captions||{}).some(([k,v])=>k!=='artist'&&v)).map(r=>({file:r.file,captions:r.captions}))}));

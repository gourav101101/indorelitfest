import {build} from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
// Release metadata file handles before replacing cached images on Windows.
sharp.cache(false);
async function optimize(dir){
 for(const entry of await fs.readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())await optimize(file);
  else if(/\.(jpe?g|png)$/i.test(file)){
   const output=file.replace(/\.(jpe?g|png)$/i,'.webp');
   const cached = await fs.stat(output).catch(()=>false);
   const wideArtwork = /hero|divider/.test(file);
   const width = wideArtwork ? 2400 : 1000;
   if(cached && cached.mtimeMs >= (await fs.stat(file)).mtimeMs){
    const source = await sharp(file).metadata();
    const current = await sharp(output).metadata();
    if(current.width >= Math.min(source.width,width))continue;
   }
   await sharp(file).rotate().resize({width,withoutEnlargement:true}).webp({quality:wideArtwork?92:83}).toFile(output);
  }
 }
}
await optimize('public/images');
await optimize('public/legacy/images');
await build();

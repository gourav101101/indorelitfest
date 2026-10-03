import fs from 'node:fs/promises';
import sharp from 'sharp';
const dir='research/speaker-photo-review-2026-09-30';
const files=(await fs.readdir(dir+'/thumbnails')).filter(x=>x.endsWith('.webp')).sort();
for(let start=0;start<files.length;start+=50){const set=files.slice(start,start+50),layers=[];for(let i=0;i<set.length;i++){layers.push({input:await sharp(dir+'/thumbnails/'+set[i]).resize(200,135,{fit:'contain',background:'#fff'}).toBuffer(),left:i%5*200,top:Math.floor(i/5)*160});layers.push({input:Buffer.from('<svg width="200" height="25"><text x="8" y="18" font-size="16">'+set[i].replace('.webp','')+'</text></svg>'),left:i%5*200,top:Math.floor(i/5)*160+135});}await sharp({create:{width:1000,height:Math.ceil(set.length/5)*160,channels:3,background:'#fff'}}).composite(layers).jpeg({quality:85}).toFile(dir+'/sheet-'+(start+1)+'.jpg');}
console.log(files.length);

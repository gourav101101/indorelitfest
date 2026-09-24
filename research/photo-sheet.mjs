import sharp from 'sharp';
import fs from 'node:fs/promises';
const files=['images/slideshow-main/1.jpg','images/slideshow-main/2.jpg','images/slideshow-main/3.jpg','images/slideshow-main/4.jpg','images/slideshow-main/5.jpg','images/slideshow-main/6.jpg','images/archive/1.jpg','images/archive/2.jpg','images/dayone/dayone2.jpeg','images/daythree/daythree13.jpeg','images/Rahgir.jpeg','images/Divya-Prakash-Dubey.jpeg'];
const layers=[];for(let i=0;i<files.length;i++){try{const input=await sharp('public/legacy/'+files[i]).resize(300,190,{fit:'cover'}).png().toBuffer();layers.push({input,left:(i%4)*300,top:Math.floor(i/4)*220});console.log(i,files[i]);}catch(e){console.log(e.message);}}
await sharp({create:{width:1200,height:660,channels:3,background:'#eee'}}).composite(layers).png().toFile('research/photo-sheet.png');

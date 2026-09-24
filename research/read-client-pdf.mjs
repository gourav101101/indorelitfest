import fs from 'node:fs/promises';
import {getDocument} from 'file:///D:/Fibro/workspace-support/tools/document-review-tools/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
const data=new Uint8Array(await fs.readFile('C:/Users/ADIN/Downloads/Website Redesign Doc (1).pdf'));
const pdf=await getDocument({data,useSystemFonts:true}).promise;
let output='';
for(let i=1;i<=pdf.numPages;i++){const p=await pdf.getPage(i);const c=await p.getTextContent();output+=`\n\n--- PAGE ${i} ---\n`+c.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join('');}
await fs.writeFile('research/client-brief.txt',output);console.log(output);

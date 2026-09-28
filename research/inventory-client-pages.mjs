import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000';
const xml=await(await fetch(base+'/sitemap.xml')).text();
const paths=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname))];
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&#039;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
const rows=[];
for(const path of [...paths,...Array.from({length:10},(_,i)=>'/gallery/'+(2015+i))]){
 const r=await fetch(base+path);const html=await r.text();
 rows.push({path,status:r.status,title:clean(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||''),browserTitle:clean(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||''),listed:paths.includes(path)});
}
const groups=[['Main and collection pages',r=>!/^\/speakers\/(?!archive(?:\/\d{4})?$)/.test(r.path)&&!/^\/journal\//.test(r.path)&&r.listed],['2025 speaker profiles',r=>/^\/speakers\/(?!archive|past)/.test(r.path)],['2024 speaker profiles',r=>/^\/speakers\/archive\/2024\//.test(r.path)],['Historical speaker introductions',r=>/^\/speakers\/past\//.test(r.path)],['Journal articles',r=>/^\/journal\//.test(r.path)],['Unlisted gallery placeholders',r=>!r.listed]];
let md='# Current website pages — 28 September 2026\n\n';
md+=`Verified against the local website: **${paths.length} sitemap-listed pages**, plus **10 directly reachable, unlisted gallery placeholders** for 2015–2024 (**${rows.length} content URLs** total). This counts edition-specific profiles separately, not unique people. Redirect aliases, PDF files, sitemap.xml and error pages are excluded.\n\n`;
md+='Links below open the local preview on this computer. They are not client-accessible staging links. A hosted staging URL is needed before forwarding working links to the client; the old live domain does not represent this redesign. Titles are the current visible page headings. These are existing pages, not a proposed final sitemap.\n\n';
for(const [name,predicate] of groups){const items=rows.filter(predicate);md+=`## ${name} (${items.length})\n\n| Title | Preview link | HTTP |\n| --- | --- | --- |\n`;for(const r of items)md+=`| ${r.title.replaceAll('|','\\|')} | [${r.path}](${base+r.path}) | ${r.status} |\n`;md+='\n';}
md+='## Archive and participation structure\n\n- `/speakers` announces the 2026 lineup; 2025 remains at `/speakers/archive/2025`.\n- All 50 prominent names link from `/speakers/archive`; 38 new historical introductions do not claim unverified attendance years.\n- `/gallery/archive` redirects permanently to `/gallery`.\n- Volunteer, internship, stall and Open Mic sections live within `/participate`.\n- Earlier gallery seasons remain explicit empty states until correctly identified photos are supplied.\n\n';
await fs.writeFile('docs/website-page-inventory-2026-09-28.md',md);
await fs.writeFile('research/website-page-inventory-2026-09-28.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify({listed:paths.length,total:rows.length,groups:groups.map(([name,p])=>[name,rows.filter(p).length]),errors:rows.filter(r=>r.status!==200)},null,2));

import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000';
const out='research/site-review';
await fs.mkdir(out,{recursive:true});
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const allPaths=[...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).concat(Array.from({length:10},(_,i)=>'/gallery/'+(2015+i))))];
const selected=process.argv.find(a=>a.startsWith('--paths='))?.slice(8).split(',');
const quick=process.argv.includes('--quick')||!!selected;
const paths=selected||(quick?['/about','/speakers','/participate','/journal/day-one','/speakers/rahgir','/visit']:allPaths);
const tab=await(await fetch('http://127.0.0.1:9445/json/new?about:blank',{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(new Error(method+' timed out')),30000);pending.set(n,d=>{clearTimeout(timer);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
const results=[];
for(const path of paths){
 const status=(await fetch(base+path).then(async r=>{await r.text();return r.status;}));
 const slug=path==='/'?'home':path.slice(1).replaceAll('/','--');
 const row={path,slug,status,views:[]};
 for(const width of [1440,390]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:960,deviceScaleFactor:1,mobile:width<700});
  await send('Page.navigate',{url:base+path});await pause(180);
  for(let i=0;i<100;i++){if(await run("document.readyState==='complete'&&document.fonts.status==='loaded'"))break;await pause(100);}
  await run("document.querySelectorAll('img').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto';true");
  for(let i=0;i<40;i++){if(await run("[...document.images].every(i=>i.complete)"))break;await pause(100);}
  const view=await run(`({width:innerWidth,title:document.querySelector('h1')?.textContent.trim(),overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),header:!!document.querySelector('.ilf-header'),footer:!!document.querySelector('.ilf-footer'),h1Count:document.querySelectorAll('h1').length,height:document.documentElement.scrollHeight})`);
  row.title=view.title;row.views.push(view);
  const shot=await send('Page.captureScreenshot',{format:'jpeg',quality:65});
  await fs.writeFile(`${out}/${slug}-${width}.jpg`,Buffer.from(shot.data,'base64'));
  if(width===1440){
   // Scroll each page so reveal-on-scroll content is included in its overview.
   await run("(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,12));}scrollTo(0,0);return true})()");
   await pause(100);
   const full=await send('Page.captureScreenshot',{format:'jpeg',quality:58,captureBeyondViewport:true,clip:{x:0,y:0,width:1440,height:Math.min(view.height,16000),scale:.7}});
   await fs.writeFile(`${out}/${slug}-overview.jpg`,Buffer.from(full.data,'base64'));
   row.overviewCapped=view.height>16000;
  }
 }
 results.push(row);
 console.log(row.path,row.status,row.views.some(v=>v.overflow||v.broken.length||v.h1Count!==1)?'CHECK':'OK');
}
const failures=results.filter(r=>r.status!==200||r.views.some(v=>v.overflow||v.broken.length||!v.header||!v.footer||v.h1Count!==1));
await fs.writeFile(`${out}/${quick?'quick':'checks'}.json`,JSON.stringify({results,errors,failures:failures.length},null,2));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!quick){
 const cards=results.map(r=>`<article data-search="${escape(r.title+' '+r.path)}"><a class="preview" href="${r.slug}-overview.jpg"><img loading="lazy" src="${r.slug}-1440.jpg" alt="Desktop preview of ${escape(r.title)}"></a><div><small>${escape(r.path)}</small><h2>${escape(r.title)}</h2><p><a href="${base+r.path}">Open page ↗</a><a href="${r.slug}-390.jpg">Phone preview</a><a href="${r.slug}-overview.jpg">${r.overviewCapped?'Extended':'Full-page'} preview</a></p></div></article>`).join('');
 await fs.writeFile(`${out}/index.html`,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Indore Literature Festival · Page review</title><style>*{box-sizing:border-box}body{margin:0;background:#fffdf8;color:#173b70;font:16px/1.6 system-ui}header{padding:48px max(24px,5vw);background:#173b70;color:#fffdf8}h1{font:42px Georgia;margin:0 0 18px}header p{max-width:850px}label{display:block}input{display:block;width:min(650px,100%);padding:14px;margin-top:10px;border:1px solid #dfbf87;border-radius:6px;font:inherit}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px;padding:36px 5vw}article{border:1px solid #dfbf87;border-radius:12px;overflow:hidden;background:#fff6e6}article img{display:block;width:100%;aspect-ratio:1.5;object-fit:cover;object-position:top}article>div{padding:22px}h2{font:25px/1.25 Georgia;margin:10px 0 20px}small{overflow-wrap:anywhere}a{color:#a73729}p{display:flex;flex-wrap:wrap;gap:15px}a:focus-visible,input:focus-visible{outline:3px solid #d59824;outline-offset:4px}[hidden]{display:none}</style><header><h1>Every chapter of the festival.</h1><p>${results.length} public pages, with desktop, phone and page overview previews. Includes all speaker biographies, journal articles, and gallery archive states. The website retains the homepage’s quieter navbar.</p><p>Checks: ${failures.length} pages flagged · ${errors.length} browser exceptions. Previews captured at 1440px and 390px.</p><label>Find a page<input type="search" placeholder="Try speakers, Malwa, gallery or a person's name"></label><span id="count" role="status">${results.length} pages</span></header><main>${cards}</main><script>document.querySelector('input').addEventListener('input',e=>{let n=0;document.querySelectorAll('article').forEach(a=>{a.hidden=!a.dataset.search.toLowerCase().includes(e.target.value.toLowerCase());if(!a.hidden)n++});document.querySelector('#count').textContent=n+' pages'})</script></html>`);
}
console.log('Reviewed',results.length,'pages; flagged',failures.length,'; browser errors',errors.length);
await send('Page.close');ws.close();process.exitCode=failures.length||errors.length?1:0;

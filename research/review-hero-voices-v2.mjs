import fs from 'node:fs/promises';
const base='http://127.0.0.1:8000';
const out='research/hero-voices-v2-2026-10-02';
await fs.mkdir(out,{recursive:true});
const tab=await(await fetch('http://127.0.0.1:9446/json/new?about:blank',{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(new Error(method+' timed out')),30000);pending.set(n,d=>{clearTimeout(timer);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
const paths=process.argv.includes('--home-only') ? ['/'] : ['/speakers/archive','/speakers/archive?year=2020&q=Uday','/speakers/archive/2015','/speakers/archive/2024','/speakers/uday','/speakers/past/gyan-chaturvedi','/'];
const results=[];
for(const path of paths){
 for(const width of [1920,1440,1280,768,390,320]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:960,deviceScaleFactor:1,mobile:width<700});
  await send('Page.navigate',{url:base+path});await pause(200);
  for(let i=0;i<100;i++){if(await run("document.readyState==='complete'&&document.fonts.status==='loaded'"))break;await pause(100);}
  await run("document.querySelectorAll('img').forEach(i=>i.loading='eager');document.documentElement.style.scrollBehavior='auto';true");
  for(let i=0;i<50;i++){if(await run("[...document.images].every(i=>i.complete)"))break;await pause(100);}
  const view=await run(`({width:innerWidth,title:document.querySelector('h1')?.textContent.trim(),overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),cardCount:document.querySelectorAll('.speaker-card').length,years:[...document.querySelectorAll('.profile-year-links strong')].map(e=>e.textContent),header:!!document.querySelector('.ilf-header'),footer:!!document.querySelector('.ilf-footer'),h1Count:document.querySelectorAll('h1').length})`);
  let selector=path==='/'?'.ilf-hero':path.includes('?')?'.speaker-grid':path.includes('/speakers/uday')||path.includes('/past/')?'.profile-appearances':'.speaker-grid';
  await run(`(()=>{const el=document.querySelector('${selector}');if(el)scrollTo(0,el.getBoundingClientRect().top+scrollY-150);return true})()`);
  await pause(200);
  const screenshot=await send('Page.captureScreenshot',{format:'jpeg',quality:80});
  const slug=(path==='/'?'home':path.slice(1)).replace(/[^a-z0-9]+/gi,'-');
  await fs.writeFile(out+'/'+slug+'-'+width+'.jpg',Buffer.from(screenshot.data,'base64'));
  results.push({path,...view});
  console.log(path,width,view.overflow||view.broken.length?'CHECK':'OK');
 }
}
await fs.writeFile(out+(process.argv.includes('--home-only')?'/home-checks.json':'/checks.json'),JSON.stringify({results,errors},null,2));
await send('Page.close');ws.close();
process.exitCode=results.some(r=>r.overflow||r.broken.length||r.h1Count!==1)||errors.length?1:0;

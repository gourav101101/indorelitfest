import fs from 'node:fs/promises';
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('jaipurliteraturefestival.org'));
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(pending.has(d.id)){pending.get(d.id)(d.result);pending.delete(d.id);}});
const send=(method,params={})=>new Promise(resolve=>{const n=++id;pending.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
await send('Page.bringToFront');
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
const audit=await run(`({text:document.body.innerText,canvases:document.querySelectorAll('canvas').length,animations:document.getAnimations().map(a=>({element:a.effect?.target?.tagName,animation:a.animationName,duration:a.effect?.getTiming().duration})),scripts:[...document.scripts].map(s=>s.src),scrollers:[...document.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+300&&e.clientHeight>300).slice(0,4).map(e=>({tag:e.tagName,class:e.className,height:e.scrollHeight}))})`);
await fs.writeFile('research/jaipur-motion-review.json',JSON.stringify(audit,null,2));
await run(`window.referenceScroller=[...document.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+300&&e.clientHeight>300);true`);
for(const [name,top] of [['middle',1400],['experience',2900]]){
 await run(`window.referenceScroller?.scrollTo(0,${top});true`);
 await new Promise(r=>setTimeout(r,1200));
 const shot=await send('Page.captureScreenshot',{format:'png'});
 await fs.writeFile('research/screenshots/jaipur-current-'+name+'.png',Buffer.from(shot.data,'base64'));
}
console.log(JSON.stringify({canvases:audit.canvases,animations:audit.animations,scrollers:audit.scrollers,text:audit.text.slice(0,1400)}));ws.close();

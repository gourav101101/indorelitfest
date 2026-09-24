import fs from 'node:fs/promises';
const [name='indore-desktop',url='http://127.0.0.1:8008',width='1440',height='1000']=process.argv.slice(2);
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('127.0.0.1:8008'))||tabs.find(t=>t.type==='page');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timeout=setTimeout(()=>{ws.close();reject(new Error('Browser timeout: '+method));},25000);pending.set(n,d=>{clearTimeout(timeout);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
await send('Page.bringToFront');
await send('Page.enable');await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:Number(width),height:Number(height),deviceScaleFactor:1,mobile:Number(width)<600});
await send('Page.navigate',{url});await new Promise(r=>setTimeout(r,1800));
// Use host-side polling: browser timers may be throttled in background Edge tabs.
for(let attempt=0;attempt<8;attempt++){
 if(await evaluate("document.fonts.status==='loaded'"))break;
 await new Promise(r=>setTimeout(r,300));
}
await evaluate("document.documentElement.style.scrollBehavior='auto'");
await evaluate("document.querySelectorAll('img[loading]').forEach(i=>i.loading='eager');true");
for(let attempt=0;attempt<40;attempt++){
 if(await evaluate("[...document.images].filter(i=>i.getAttribute('src')).every(i=>i.complete)"))break;
 await new Promise(r=>setTimeout(r,200));
}

const check=(name,pass)=>{console.log(name+': '+pass);if(!pass)process.exitCode=1};
await evaluate("localStorage.setItem('ilf-motion-paused','false');document.documentElement.classList.add('motion-enabled');window.scrollTo(0,0);true");
await new Promise(r=>setTimeout(r,10500));
check('Automatic change',await evaluate("document.querySelector('[data-hero-scene=\"1\"]').classList.contains('is-current')"));
await evaluate("document.querySelector('[data-hero-select=\"2\"]').click();true");await new Promise(r=>setTimeout(r,2200));
check('Manual selection',await evaluate("document.querySelector('[data-hero-scene=\"2\"]').classList.contains('is-current')"));
await fs.writeFile('research/screenshots/hero-mandu-preview.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
await evaluate("document.documentElement.classList.remove('motion-enabled');true");await new Promise(r=>setTimeout(r,9500));
check('Pause holds scene',await evaluate("document.querySelector('[data-hero-scene=\"2\"]').classList.contains('is-current')"));
check('Hero copy fixed',await evaluate("document.querySelectorAll('#ilf-title').length===1"));
check('No overflow',await evaluate('document.documentElement.scrollWidth<=innerWidth'));
ws.close();

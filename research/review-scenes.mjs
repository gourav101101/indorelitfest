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
for(let y=0;y<await evaluate('document.documentElement.scrollHeight');y+=800){await evaluate(`window.scrollTo(0,${y});true`);await new Promise(r=>setTimeout(r,100));}
await new Promise(r=>setTimeout(r,800));await evaluate('window.scrollTo(0,0)');
if(process.env.REVIEW_ACTION){console.log(await evaluate(process.env.REVIEW_ACTION));}
await fs.mkdir('research/screenshots',{recursive:true});
for(const section of ['festival','experiences','registration','podcasts']){await evaluate("document.getElementById('"+section+"').scrollIntoView();true");await new Promise(r=>setTimeout(r,500));const result=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('research/screenshots/scene-'+section+'-'+width+'.png',Buffer.from(result.data,'base64'));console.log(await evaluate("({id:'"+section+"',height:document.getElementById('"+section+"').offsetHeight,overflow:document.documentElement.scrollWidth>innerWidth})"));}
console.log(JSON.stringify({page:await evaluate(`({title:document.title,url:location.href,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:document.querySelector('h1')?.innerText,missingImages:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src),links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href'))})`),errors}));
ws.close();

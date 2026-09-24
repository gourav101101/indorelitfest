import fs from 'node:fs/promises';
const tabs = await (await fetch('http://localhost:9444/json/list')).json();
const tab = tabs.find(t => t.url.includes('jaipurliteraturefestival.org'));
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, {once:true}));
let id = 0; const pending = new Map();
ws.addEventListener('message', e => {const d=JSON.parse(e.data); if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send = (method,params={}) => new Promise((resolve,reject)=>{const n=++id;pending.set(n,d=>d.error?reject(d.error):resolve(d.result));ws.send(JSON.stringify({id:n,method,params}));});
const evaluate = async expression => (await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
const [name='home',url='',mobile=''] = process.argv.slice(2);
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride',{width:mobile?390:1440,height:mobile?844:1000,deviceScaleFactor:1,mobile:!!mobile});
if(url){await send('Page.navigate',{url}); await new Promise(r=>setTimeout(r,6500));}
if(process.env.BROWSER_ACTION){console.log(await evaluate(process.env.BROWSER_ACTION));await new Promise(r=>setTimeout(r,2000));}
await evaluate('window.scrollTo(0,0)');
await new Promise(r=>setTimeout(r,1000));
await fs.mkdir('research/screenshots',{recursive:true});
const data = await evaluate(`({title:document.title,url:location.href,text:document.body.innerText,links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText,url:a.href})),buttons:[...document.querySelectorAll('button')].map(b=>b.innerText)})`);
await fs.writeFile(`research/${name}.json`,JSON.stringify(data,null,2));
const scrollHeight = await evaluate(`(()=>{window.auditScroller=[...document.querySelectorAll('*')].find(e=>e.scrollHeight>e.clientHeight+200 && e.clientHeight>200)||document.scrollingElement;return window.auditScroller.scrollHeight})()`);
for(let pos=0,index=0;pos<scrollHeight;pos+=(mobile?744:900),index++){
await evaluate(`window.auditScroller.scrollTo(0,${pos})`);await new Promise(r=>setTimeout(r,450));
const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile(`research/screenshots/${name}${index?'-section-'+index:''}.png`,Buffer.from(shot.data,'base64'));
}
await evaluate('window.auditScroller.scrollTo(0,0)');
console.log(JSON.stringify(data));
ws.close();

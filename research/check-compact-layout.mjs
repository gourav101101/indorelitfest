import fs from 'node:fs/promises';
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('127.0.0.1:8008'));
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),checks=[],errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(new Error(method+' timed out')),20000);pending.set(n,d=>{clearTimeout(timer);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const check=(name,passed,detail)=>{checks.push({name,passed:!!passed,detail});if(!passed)console.error('FAIL',name,detail);};
async function navigate(width,height,path='/'){
 await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});
 await send('Page.navigate',{url:'http://127.0.0.1:8008'+path});await pause(600);
 for(let i=0;i<40;i++){if(await run("document.readyState==='complete'&&document.fonts.status==='loaded'"))break;await pause(100);}
 await run("document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('img').forEach(i=>i.loading='eager');true");
 for(let i=0;i<40;i++){if(await run("[...document.images].filter(i=>i.getAttribute('src')).every(i=>i.complete)"))break;await pause(100);}
}
async function screenshot(name){await pause(1200);const s=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('research/screenshots/'+name+'.png',Buffer.from(s.data,'base64'));}
async function key(key,code,n){await send('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:n,...(key==='Enter'?{text:'\r'}:{})});await send('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:n});await pause(200);}

await send('Page.enable');await send('Runtime.enable');await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
await navigate(1440,900);await run("localStorage.removeItem('ilf-motion-paused')");
for(const [width,height] of [[1920,930],[1440,900],[1366,768],[390,844]]){
 await navigate(width,height);
 for(const id of ['podcasts','attendees','news-updates','voices','journal']){
  await run("document.getElementById('"+id+"').scrollIntoView();true");await pause(1200);
  const size=await run("({height:document.getElementById('"+id+"').offsetHeight,available:innerHeight-document.querySelector('.site-header').offsetHeight})");
  if(width>1000)check(id+' fits '+width,size.height<=size.available+2,size);
  if(id==='podcasts')await screenshot('ilf-compact-listen-'+width);
 }
 check('No overflow '+width,await run("document.documentElement.scrollWidth<=innerWidth"));
}
await navigate(1440,900);
check('Divider image loads',await run("document.querySelector('.ilf-scene-wildlife').naturalWidth>0"));
await run("document.querySelector('.ilf-scene-wildlife').scrollIntoView({block:'center'});true");await screenshot('ilf-wildlife-divider');
check('Button has no corner ornament',await run("getComputedStyle(document.querySelector('.ilf-button'),'::after').content==='none'"));
await run("document.querySelector('.motion-toggle').click();true");
check('Button has no looping animation',await run("getComputedStyle(document.querySelector('.ilf-button'),'::after').animationName==='none'"));
await fs.writeFile('research/compact-layout-checks.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks));ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

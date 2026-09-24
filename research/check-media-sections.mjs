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
for(const width of [1440,390]){
 await navigate(width,1000);
 check('Media links use nine specific recordings '+width,await run("document.querySelectorAll('#podcasts a[href*=\"watch?v=\"],#watch-sessions a[href*=\"watch?v=\"]').length===9"));
 check('Media images loaded '+width,await run("[...document.querySelectorAll('.ilf-media-section img')].every(i=>i.complete&&i.naturalWidth>0)"));
 check('No horizontal page overflow '+width,await run("document.documentElement.scrollWidth<=innerWidth"));
 for(const id of ['podcasts','watch-sessions','attendees','news-updates']){
  await run("document.getElementById('"+id+"').scrollIntoView();true");await screenshot('ilf-media-'+id+'-'+width);
 }
 check('Attendee source and summary label visible '+width,await run("document.querySelector('#attendees').textContent.includes('not verbatim quotations')&&document.querySelector('#attendees a').href.includes('agniban.com')"));
 check('News has announcement and three sourced stories '+width,await run("document.querySelectorAll('.ilf-news-grid article').length===4"));
}
check('No JavaScript exceptions',errors.length===0,errors);
await navigate(1440,1000);await run("document.getElementById('watch-sessions').scrollIntoView();true");
await fs.writeFile('research/media-section-checks.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks));ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

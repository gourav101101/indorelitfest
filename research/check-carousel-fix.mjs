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
await navigate(1440,1000);
await screenshot('ilf-fixed-hero');
await run("document.querySelector('.ilf-carousel').scrollIntoView({block:'center'});true");await pause(1400);
await screenshot('ilf-fixed-carousel');
const pos=await run("(()=>{const r=document.querySelector('.ilf-experience-card.is-active img').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:pos.x,y:pos.y});
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:pos.x,y:pos.y,button:'left',clickCount:1});
await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:pos.x-100,y:pos.y,button:'left',buttons:1});
await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:pos.x-100,y:pos.y,button:'left',clickCount:1});await pause(900);
check('Mouse drag selects second experience without navigation',await run("document.querySelector('[data-ilf-status]').textContent.includes('2 / 3')&&location.pathname==='/'"));
await screenshot('ilf-fixed-carousel-dragged');
await navigate(390,844);
await run("document.querySelector('.ilf-carousel').scrollIntoView({block:'center'});true");await pause(1400);
await screenshot('ilf-fixed-carousel-mobile');
check('Mobile frame and controls fit',await run("document.documentElement.scrollWidth<=innerWidth&&[...document.querySelectorAll('.ilf-carousel-controls button')].every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth})"));
await navigate(1440,1000);
check('Dropdown uses visible SVG chevron',await run("document.querySelectorAll('.ilf-nav-chevron').length===2"));
check('Hero rounded stroke fits SVG top',await run("document.querySelector('.ilf-hero-arch').getAttribute('stroke-linejoin')==='round'"));
await fs.writeFile('research/carousel-fix-checks.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks));ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

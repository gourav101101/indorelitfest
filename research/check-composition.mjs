import fs from 'node:fs/promises';
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('127.0.0.1:8008'));
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),checks=[],errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(new Error(method+' timed out')),20000);pending.set(n,d=>{clearTimeout(timer);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value;};
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function check(name,passed,detail){checks.push({name,passed:!!passed,detail});if(!passed)console.error('FAIL',name,JSON.stringify(detail));}
async function navigate(width,height){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});await send('Page.navigate',{url:'http://127.0.0.1:8008/'});await pause(700);for(let n=0;n<30;n++){if(await run("document.readyState==='complete'&&document.fonts.status==='loaded'"))break;await pause(100);}await run("document.documentElement.style.scrollBehavior='auto';document.querySelectorAll('img').forEach(i=>i.loading='eager');true");for(let n=0;n<30;n++){if(await run("[...document.images].every(i=>i.complete)"))break;await pause(100);}}
async function shot(name){await pause(500);const r=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('research/screenshots/'+name+'.png',Buffer.from(r.data,'base64'));}
await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});await send('Page.enable');await send('Runtime.enable');
for(const [width,height] of [[1920,930],[1366,768],[1536,864],[1280,720],[1920,1080],[390,844],[360,740]]){
 await navigate(width,height);
 const data=await run("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,navFont:getComputedStyle(document.querySelector('#navigation>a')).fontSize,available:innerHeight-document.querySelector('.site-header').offsetHeight,scenes:[...document.querySelectorAll('[data-home-scene]')].map(e=>({id:e.id,height:e.getBoundingClientRect().height})),broken:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src)})");
 check('No horizontal overflow or broken images '+width+'x'+height,data.scrollWidth<=data.width&&!data.broken.length,data);
 if(width>1180){
  check('Readable navigation '+width+'px',parseFloat(data.navFont)>=16,data.navFont);
  check('Every chapter fits available desktop height '+width+'x'+height,data.scenes.every(s=>s.height<=data.available+2),{available:data.available,scenes:data.scenes});
  const hero=await run("({copy:document.querySelector('.opening-copy').getBoundingClientRect().right,art:document.querySelector('.opening-art').getBoundingClientRect().left,bottom:document.querySelector('.opening-bottom').getBoundingClientRect().bottom,height:innerHeight})");
  check('Hero text and art do not overlap '+width+'px',hero.copy<=hero.art&&hero.bottom<=hero.height+2,hero);
  const alternatePanels=await run("(()=>{const results=[];for(const selector of ['[data-experience-tabs]','[data-chapter-tabs]']){const section=document.querySelector(selector);for(const tab of section.querySelectorAll('[role=tab]')){tab.click();results.push({tab:tab.id,height:section.getBoundingClientRect().height});}section.querySelector('[role=tab]').click();}return results;})()");
  check('All tab selections fit desktop '+width+'x'+height,alternatePanels.every(p=>p.height<=data.available+2),alternatePanels);
 }
 if(width===1920&&height===930){
  await shot('indore-composition-hero-1920');
  for(const scene of data.scenes.slice(1)){
   await run(`document.getElementById('${scene.id}').scrollIntoView({block:'start'});true`);await pause(800);
   const pos=await run(`({top:document.getElementById('${scene.id}').getBoundingClientRect().top,bottom:document.getElementById('${scene.id}').getBoundingClientRect().bottom,header:document.querySelector('.site-header').offsetHeight,active:document.querySelector('.scene-navigation [aria-current]')?.hash})`);
   check('Chapter '+scene.id+' aligns below header',Math.abs(pos.top-pos.header)<3&&pos.bottom<=height+3&&pos.active==='#'+scene.id,pos);
   await shot('indore-composition-'+scene.id);
  }
 }
 if(width===1366)await shot('indore-composition-hero-laptop');
 if(width===390){await shot('indore-composition-hero-mobile');await run("document.querySelector('.menu-toggle').click()");check('Mobile navigation opens',await run("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'"));await shot('indore-composition-mobile-menu');}
}
await navigate(1440,900);
check('Malwa content removed from homepage; separate link retained',await run("!document.querySelector('main a[href$=\"/malwa\"]') && !!document.querySelector('#navigation>a[href$=\"/malwa\"]')"));
await run("document.querySelector('#experiences').scrollIntoView({block:'start'});true");await pause(500);
await run("document.querySelector('#experience-tab-2').click();document.querySelector('#experience-tab-2').focus()");
check('Experience selection reveals associated panel',await run("!document.querySelector('#experience-panel-2').hidden&&document.querySelector('#experience-panel-0').hidden"));
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});
for(let n=0;n<20;n++){if(await run("document.activeElement.id==='experience-tab-3'"))break;await pause(100);}
check('Vertical tabs support keyboard navigation',await run("document.activeElement.id==='experience-tab-3'&&!document.querySelector('#experience-panel-3').hidden"),await run("({focus:document.activeElement.id,selected:document.querySelector('.experience-choices [aria-selected=true]')?.id})"));
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
for(let n=0;n<20;n++){if(await run("!document.documentElement.classList.contains('motion-enabled')"))break;await pause(100);}
check('Reduced motion disables scroll snapping and decorative motion',await run("getComputedStyle(document.documentElement).scrollSnapType==='none'&&!document.documentElement.classList.contains('motion-enabled')"),await run("({snap:getComputedStyle(document.documentElement).scrollSnapType,motion:document.documentElement.className,pref:matchMedia('(prefers-reduced-motion: reduce)').matches})"));
await send('Emulation.setEmulatedMedia',{features:[]});
check('No JavaScript exceptions',errors.length===0,errors);
await navigate(1920,930);await shot('indore-composition-final');
await fs.writeFile('research/composition-checks.json',JSON.stringify(checks,null,2));console.log(JSON.stringify({total:checks.length,passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed)},null,2));ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

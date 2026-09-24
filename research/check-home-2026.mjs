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
await send('Emulation.setEmulatedMedia',{features:[]});
for(const [width,height] of [[1920,930],[1440,1000],[1280,720],[1024,768],[768,1024],[390,844],[360,740],[320,740]]){
 await navigate(width,height);
 const geometry=await run("({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src),title:document.querySelector('h1').getBoundingClientRect().toJSON(),cta:document.querySelector('.ilf-hero-content .ilf-button').getBoundingClientRect().toJSON()})");
 check('No overflow or missing images at '+width,geometry.scroll<=width&&!geometry.broken.length,geometry);
 check('Hero headline and registration fit at '+width,geometry.title.left>=0&&geometry.title.right<=width&&geometry.cta.left>=0&&geometry.cta.right<=width);
 if(width>=1280)check('Desktop navigation fits '+width,await run("[...document.querySelectorAll('#navigation>a,#navigation>details')].every(e=>e.getBoundingClientRect().right<=innerWidth)"));
 if([1920,1440,390,320].includes(width))await screenshot('ilf-2026-hero-'+width);
 if(width===1440||width===390){
  for(const anchor of ['festival','experiences','registration','voices','books','music','memories','visit-indore','journal']){
   await run("document.getElementById('"+anchor+"').scrollIntoView();true");await pause(300);await screenshot('ilf-2026-'+anchor+'-'+width);
  }
 }
 if(width<1181){
  await run("window.scrollTo(0,0);document.querySelector('.menu-toggle').click();true");await pause(200);
  check('Mobile/tablet navigation opens '+width,await run("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'&&getComputedStyle(document.querySelector('#navigation')).display!=='none'&&document.documentElement.scrollWidth<=innerWidth"));
  if(width===390)await screenshot('ilf-2026-menu-mobile');
  await key('Escape','Escape',27);
  check('Escape closes navigation '+width,await run("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'"));
 }
}
await navigate(1440,1000);
const expected=['https://forms.gle/by5xS5RTGjEJfMBFA','https://forms.gle/htJKDyAMbKi6erHh9','https://forms.gle/SH2gXWhEKokRSwEA6','https://forms.gle/BkTuSAir9gymZU9P6','https://forms.gle/UTP3dukT4reDac867'];
const published=await run("[...document.querySelectorAll('#registration a')].map(a=>a.href)");
check('All five supplied forms on homepage',expected.every(url=>published.includes(url)),published);
check('Hero publishes confirmed date and venue',await run("document.querySelector('.ilf-hero-date').textContent.includes('27–29 November 2026')&&document.querySelector('.ilf-hero-venue').textContent.includes('Daly College, Indore')"));
check('Malwa remains a separate navigation destination',await run("!!document.querySelector('#navigation a[href$=\"/malwa\"]')&&!document.querySelector('main a[href$=\"/malwa\"]')"));
check('Expanded about copy',await run("document.querySelector('.ilf-prose').textContent.trim().split(/\\s+/).length>180"));
check('No invented new poster or future speaker lineup',await run("!document.querySelector('.ilf-poster')&&document.querySelector('#voices').textContent.includes('2025 edition')&&document.querySelector('#voices').textContent.includes('2026 lineup')"));
check('No placeholder homepage links',await run("[...document.querySelectorAll('main a')].every(a=>a.getAttribute('href')&&a.getAttribute('href')!=='#')"));
check('New editorial and visitor sections present',await run("['books','music','memories','visit-indore'].every(id=>!!document.getElementById(id))"));
await run("document.getElementById('memories').scrollIntoView();true");await pause(1600);
check('Scroll reveals memory photographs',await run("[...document.querySelectorAll('.ilf-memory-ribbon button')].every(e=>getComputedStyle(e).opacity==='1')"));
await run("document.querySelector('.ilf-memory-ribbon button').click();true");
check('Memory photo opens in working lightbox',await run("document.querySelector('#photo-dialog').open&&document.querySelector('#photo-dialog img').src.includes('dayone2')"));
await key('Escape','Escape',27);
check('Memory viewer closes with Escape',await run("!document.querySelector('#photo-dialog').open"));
check('Reading progress follows document scroll',await run("Number(document.querySelector('.ilf-reading-progress').style.getPropertyValue('--reading-progress'))>0"));
await run("document.querySelector('.ilf-nav-menu summary').click();true");await pause(150);
check('Festival dropdown opens',await run("document.querySelector('.ilf-nav-menu').open"));
await run("document.querySelector('.ilf-nav-menu summary').focus();true");await key('Escape','Escape',27);
check('Escape closes dropdown and retains focus',await run("!document.querySelector('.ilf-nav-menu').open&&document.activeElement.matches('.ilf-nav-menu summary')"));
await run("document.querySelector('.ilf-carousel').scrollIntoView({block:'center'});document.querySelector('[data-ilf-next]').focus();true");await pause(300);
await key('Enter','Enter',13);
check('Next experience works',await run("document.querySelector('[data-ilf-status]').textContent.includes('2 / 3')"));
await key('ArrowRight','ArrowRight',39);
check('Keyboard advances experience',await run("document.querySelector('[data-ilf-status]').textContent.includes('3 / 3')"));
await key('ArrowRight','ArrowRight',39);
check('Experience wraps to first slide',await run("document.querySelector('[data-ilf-status]').textContent.includes('1 / 3')"));
await key('End','End',35);
check('End key selects final experience',await run("document.querySelector('[data-ilf-status]').textContent.includes('3 / 3')"));
check('Inactive slides excluded from keyboard sequence',await run("[...document.querySelectorAll('[data-ilf-slide]:not(.is-active) a')].every(a=>a.tabIndex===-1)"));
await run("localStorage.removeItem('ilf-motion-paused')");await navigate(1440,1000);
await run("document.querySelector('.motion-toggle').click();true");
check('Decorative motion can pause',await run("!document.documentElement.classList.contains('motion-enabled')"));
check('Pause reveals all animated content',await run("[...document.querySelectorAll('.ilf-motion-target')].every(e=>getComputedStyle(e).opacity==='1')"));
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
for(let i=0;i<25;i++){if(await run("document.querySelector('.motion-toggle').hidden"))break;await pause(100);}
check('System reduced motion respected',await run("document.querySelector('.motion-toggle').hidden&&!document.documentElement.classList.contains('motion-enabled')"));
await send('Emulation.setEmulatedMedia',{features:[]});
await run("localStorage.removeItem('ilf-motion-paused')");
await send('Emulation.setScriptExecutionDisabled',{value:true});await navigate(390,844);
check('Without JavaScript all experiences and forms are available',await run("document.querySelectorAll('[data-ilf-slide]').length===3&&[...document.querySelectorAll('[data-ilf-slide]')].every(e=>getComputedStyle(e).display!=='none'&&e.getAttribute('aria-hidden')!=='true')&&document.querySelectorAll('#registration a').length===6"));
await send('Emulation.setScriptExecutionDisabled',{value:false});await navigate(1440,1000,'/participate');
check('Participation page uses all updated form links',expected.every(url=>published.includes(url))&&await run("[...document.querySelectorAll('.participation-card a')].filter(a=>a.href.includes('forms.gle')).length===5"));
await navigate(1440,1000);
await screenshot('ilf-2026-final');
check('No JavaScript exceptions',errors.length===0,errors);
await fs.writeFile('research/home-2026-checks.json',JSON.stringify({checks,errors},null,2));
console.log(JSON.stringify({passed:checks.filter(c=>c.passed).length,total:checks.length,failures:checks.filter(c=>!c.passed)},null,2));
ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

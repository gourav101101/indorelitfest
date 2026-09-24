import fs from 'node:fs/promises';
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('127.0.0.1:8008'));
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),checks=[],errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>reject(new Error(method+' timed out')),20000);pending.set(n,d=>{clearTimeout(timer);d.error?reject(d.error):resolve(d.result);});ws.send(JSON.stringify({id:n,method,params}));});
const run=async expression=>{const data=await send('Runtime.evaluate',{expression,returnByValue:true});if(data.exceptionDetails)throw new Error(data.exceptionDetails.text+': '+expression);return data.result.value;};
const delay=ms=>new Promise(r=>setTimeout(r,ms));
function check(name,passed,detail){checks.push({name,passed:!!passed,detail});if(!passed)console.error('FAIL',name,detail);}
async function navigate(path,width=1440){await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<700});await send('Page.navigate',{url:'http://127.0.0.1:8008'+path});await delay(700);for(let n=0;n<30;n++){if(await run("document.readyState==='complete' && document.fonts.status==='loaded'"))break;await delay(100);}}
async function key(key,code,keyCode){await send('Input.dispatchKeyEvent',{type:'keyDown',key,code,windowsVirtualKeyCode:keyCode});await send('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:keyCode});await delay(150);}
async function screenshot(name,selector){if(selector){await run(`document.documentElement.style.scrollBehavior='auto';document.querySelector('${selector}').scrollIntoView({block:'center'});true`);}await delay(800);const shot=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('research/screenshots/'+name+'.png',Buffer.from(shot.data,'base64'));}
await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});await send('Page.enable');await send('Runtime.enable');
await navigate('/');
await run("localStorage.removeItem('ilf-motion-paused')");await navigate('/');
check('Official logo and no announcement strip',await run("document.querySelector('.official-brand img').naturalWidth===160 && !document.querySelector('.announcement')"));
check('Eight composed homepage chapters present',await run("document.querySelectorAll('[data-home-scene]').length===8"));
await run("document.querySelector('.explore-menu summary').click()");
check('Explore menu opens with four new destinations',await run("document.querySelector('.explore-menu').open && ['experiences','visit','community','media'].every(p=>document.querySelector('.explore-panel a[href$=\"/'+p+'\"]'))"));
await screenshot('indore-redesign-explore-menu');
await key('Escape','Escape',27);
check('Escape closes Explore and restores focus',await run("!document.querySelector('.explore-menu').open && document.activeElement.matches('.explore-menu summary')"));
await run("document.querySelector('#chapter-tab-1').click();document.querySelector('#chapter-tab-1').focus()");
check('Day 2 tab selects its own diary',await run("document.querySelector('#chapter-0').hidden && !document.querySelector('#chapter-1').hidden && document.querySelector('#chapter-1 a').href.endsWith('/journal/day-two')"));
await key('ArrowRight','ArrowRight',39);
check('Keyboard moves to Day 3',await run("document.activeElement.id==='chapter-tab-2' && !document.querySelector('#chapter-2').hidden"));
await screenshot('indore-redesign-chapters','.chapter-stage');
await run("document.querySelector('.motion-toggle').click()");
check('Motion can be paused',await run("!document.documentElement.classList.contains('motion-enabled')"));
await navigate('/');check('Motion preference persists',await run("!document.documentElement.classList.contains('motion-enabled')"));
await run("document.querySelector('.motion-toggle').click()");
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
for(let n=0;n<20;n++){if(await run("document.querySelector('.motion-toggle').hidden"))break;await delay(100);}
check('System reduced motion respected',await run("!document.documentElement.classList.contains('motion-enabled') && document.querySelector('.motion-toggle').hidden"),await run("({preference:matchMedia('(prefers-reduced-motion: reduce)').matches,root:document.documentElement.className,buttonHidden:document.querySelector('.motion-toggle').hidden})"));
check('Reduced motion does not hide content',await run("[...document.querySelectorAll('[data-reveal]')].every(e=>getComputedStyle(e).opacity==='1')"));
await send('Emulation.setEmulatedMedia',{features:[]});
await navigate('/',390);await run("document.querySelector('.menu-toggle').click();document.querySelector('.explore-menu summary').click()");
check('Mobile Explore menu stays inside viewport',await run("document.querySelector('.explore-menu').open && document.documentElement.scrollWidth<=innerWidth && document.querySelector('#navigation').scrollHeight>=document.querySelector('#navigation').clientHeight"));
await screenshot('indore-redesign-mobile-navigation');
for(const path of ['/experiences','/visit','/community','/media']){
 for(const width of [390,1440]){
  await navigate(path,width);
  await run("document.querySelectorAll('img').forEach(i=>i.loading='eager')");
  for(let n=0;n<30;n++){if(await run("[...document.images].every(i=>i.complete)"))break;await delay(100);}
  const data=await run("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.querySelector('h1')?.textContent,broken:[...document.images].filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.src)})");
  check(path+' at '+width+'px',data.scrollWidth<=data.width&&!!data.title&&!data.broken.length,data);
  if(width===1440)await screenshot('indore-redesign-'+path.slice(1));
 }
}
await send('Emulation.setScriptExecutionDisabled',{value:true});await navigate('/');
check('Without JS all festival days remain readable',await run("[...document.querySelectorAll('.chapter-panel')].every(e=>getComputedStyle(e).display!=='none')"));
await send('Emulation.setScriptExecutionDisabled',{value:false});await navigate('/');
const performance=await run("({navigation:performance.getEntriesByType('navigation')[0]?.duration,resources:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script'||r.name.includes('/build/')).map(r=>({url:r.name.split('/').pop(),bytes:r.decodedBodySize})),domElements:document.querySelectorAll('*').length})");
check('No JavaScript exceptions',errors.length===0,errors);
await screenshot('indore-festival-redesign-final');
await fs.writeFile('research/festival-redesign-checks.json',JSON.stringify({checks,performance},null,2));
console.log(JSON.stringify({checks,performance},null,2));ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;

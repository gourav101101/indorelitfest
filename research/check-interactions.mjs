import fs from 'node:fs/promises';
const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.url.includes('127.0.0.1:8008'));
const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails.text);if(pending.has(d.id)){pending.get(d.id)(d);pending.delete(d.id);}});
const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,d=>d.error?reject(d.error):resolve(d.result));ws.send(JSON.stringify({id:n,method,params}));});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result.value;
const checks=[];function check(name,passed,detail){checks.push({name,passed,detail});if(!passed)console.error('FAILED',name,detail);}
async function navigate(path,width=1440){await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<600});await send('Page.navigate',{url:'http://127.0.0.1:8008'+path});await new Promise(r=>setTimeout(r,700));for(let n=0;n<12;n++){if(await evaluate("document.fonts.status==='loaded'"))break;await new Promise(r=>setTimeout(r,150));}}
async function screenshot(name){const s=await send('Page.captureScreenshot',{format:'png'});await fs.writeFile('research/screenshots/'+name+'.png',Buffer.from(s.data,'base64'));}
await send('Page.bringToFront');await send('Emulation.setFocusEmulationEnabled',{enabled:true});await send('Page.enable');await send('Runtime.enable');
await navigate('/',390);
await evaluate("document.querySelector('.menu-toggle').click()");
check('Mobile menu opens',await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true' && document.querySelector('#navigation').getBoundingClientRect().height>100"));
await screenshot('indore-mobile-menu');
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await new Promise(r=>setTimeout(r,200));
check('Escape closes menu and restores focus',await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false' && document.activeElement===document.querySelector('.menu-toggle')"));
await navigate('/speakers');
await evaluate("document.querySelector('[data-filter]').value='Rahgir';document.querySelector('[data-filter]').dispatchEvent(new Event('input'))");
check('Speaker search finds the correct profile',await evaluate("document.querySelectorAll('.speaker-card:not([hidden])').length===1 && document.querySelector('.speaker-card:not([hidden])').textContent.includes('Rahgir')"));
await screenshot('indore-speaker-search');
await evaluate("document.querySelector('[data-filter]').value='zzzzzz';document.querySelector('[data-filter]').dispatchEvent(new Event('input'))");
check('Search has an honest empty state',await evaluate("!document.querySelector('.empty-results').hidden && document.querySelectorAll('.speaker-card:not([hidden])').length===0"));
await navigate('/journal',390);
await evaluate("document.querySelector('[data-collection-search]').value='Day 2';document.querySelector('[data-collection-search]').dispatchEvent(new Event('input'))");
check('Journal search works',await evaluate("document.querySelectorAll('.article-card:not([hidden])').length===1"));
await navigate('/');
await evaluate("document.querySelector('[data-lightbox]').click()");
check('Photo opens in native modal',await evaluate("document.querySelector('#photo-dialog').open"));
await screenshot('indore-photo-lightbox');
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await new Promise(r=>setTimeout(r,200));
check('Photo closes and focus returns',await evaluate("!document.querySelector('#photo-dialog').open && document.activeElement.hasAttribute('data-lightbox')"));
for(const [path,width] of [['/',360],['/',768],['/speakers',390],['/gallery',390],['/journal',1440],['/journal/day-one',390],['/participate',390],['/contact',390],['/malwa',390],['/schedule',390]]){
await navigate(path,width);
const result=await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:!!document.querySelector('h1'),blankTargets:document.querySelectorAll('a[target="_blank"]').length})`);
check(path+' at '+width+'px',result.scrollWidth<=result.width&&result.h1&&result.blankTargets===0,result);
}

await navigate('/gallery/2025',390);
check('Gallery initially shows 24 photos',await evaluate("document.querySelectorAll('.gallery-item:not([hidden])').length===24"));
await evaluate("document.querySelector('[data-category-filter=daytwo]').click()");
check('Day filter isolates day two',await evaluate("[...document.querySelectorAll('.gallery-item:not([hidden])')].every(i=>i.dataset.category==='daytwo')"));
await evaluate("document.querySelector('.gallery-item:not([hidden])').click();document.querySelector('.photo-next').click()");
check('Next photo updates counter',await evaluate("document.querySelector('[data-photo-count]').textContent.startsWith('2 /')"));
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});await new Promise(r=>setTimeout(r,200));
check('Left arrow navigates photos',await evaluate("document.querySelector('[data-photo-count]').textContent.startsWith('1 /')"));
await evaluate("document.querySelector('.dialog-close').click()");
await navigate('/speakers/rahgir',390);
check('English biography is default',await evaluate("!document.querySelector('#bio-en').hidden && document.querySelector('#bio-hi').hidden"));
await evaluate("document.querySelector('#bio-hi-tab').click()");
check('Hindi biography switch works',await evaluate("document.querySelector('#bio-en').hidden && !document.querySelector('#bio-hi').hidden && document.querySelector('#bio-hi').textContent.length>100"));
await screenshot('indore-hindi-profile');
await navigate('/journal');
await evaluate("document.querySelector('[data-category-filter=Conversations]').click()");
check('Journal categories work',await evaluate("document.querySelectorAll('.article-card:not([hidden])').length>0 && [...document.querySelectorAll('.article-card:not([hidden])')].every(i=>i.dataset.category==='Conversations')"));
await evaluate("document.querySelector('[data-category-filter=all]').click();document.querySelector('[data-load-more]').click()");
check('More stories reveals all 16 articles',await evaluate("document.querySelectorAll('.article-card:not([hidden])').length===16"));
await navigate('/faq',390);
await evaluate("document.querySelector('summary').click()");
check('FAQ opens with useful answer',await evaluate("document.querySelector('details').open"));
await navigate('/contact',390);
check('Enquiry requires message and name',await evaluate("!document.querySelector('[data-enquiry]').checkValidity()"));

check('No JavaScript exceptions',errors.length===0,errors);
await fs.writeFile('research/browser-checks.json',JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks,null,2));
await navigate('/');await screenshot('indore-desktop-final');
ws.close();if(checks.some(c=>!c.passed))process.exitCode=1;


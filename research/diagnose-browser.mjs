const tabs=await(await fetch('http://localhost:9444/json/list')).json();
const ws=new WebSocket(tabs.find(t=>t.url.includes('127.0.0.1')).webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
ws.send(JSON.stringify({id:2,method:'Page.bringToFront'}));
ws.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{expression:'JSON.stringify({ready:document.readyState,height:document.documentElement.scrollHeight,y:scrollY,fonts:document.fonts.status,images:document.images.length,complete:[...document.images].filter(i=>i.complete).length})',returnByValue:true}}));
await new Promise(r=>ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id===1){console.log(d);r();}}));ws.close();

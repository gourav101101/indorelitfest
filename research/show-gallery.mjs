const tabs=await (await fetch('http://localhost:9444/json/list')).json();
const tab=tabs.find(t=>t.type==='page');
const ws=new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
ws.send(JSON.stringify({id:1,method:'Target.createTarget',params:{url:'file:///D:/indorelitfest/research/reference-gallery.html'}}));
await new Promise(r=>ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id===1){console.log(JSON.stringify(d));r();}}));
ws.close();

import fs from 'node:fs/promises';
const listings=JSON.parse(await fs.readFile('research/journal-youtube-2026-09-30/channel-videos.json','utf8'));
const map={
'day-one':['KQFuA_pYpP0','a_ACyZ7uFJw','H9JIlsv1Iu8'],
'day-two':['meuTjWU9gZA','0y0bByiIWPY','-j3sYJ1us04'],
'day-three':['13vjrVe2xSc','LKdLSV3DvIs','pu27xuANtLY'],
'sharmistha-mukherjee':['LKdLSV3DvIs','Ns40t-WlkdA','3myI2fRG-ro'],
'ramayan-dhar-dwivedi':['6giDzeLthYE','H9JIlsv1Iu8','eFPz9FpsV1Q'],
'writing-toolkit':['TkvNwGNckHY','_fr2T_wYF1s'],
'one-nation-one-election':['0y0bByiIWPY','MU1ji-y6yCs','i7dyXGmAKWU'],
'mera-rachna-dharm':['UGxNYsxTXL8','xjM1RCr9PD4'],
'uday-mahurkar':['d2NvP9G7P_4','NPc5G3iuGxU','47esp--LTZM'],
'ambi-parameswaran':['stVxJbszGzs','FtIGjSAORa8','g-RIiZjuWIY'],
'rahagir':['bw8UKjXwRNM','pu27xuANtLY'],
'new-age-writing':['-j3sYJ1us04','0aUCO-BYtew','4CiHzOgHWaM'],
'budding-authors':['13vjrVe2xSc','He4JDwyPMG0'],
'vinay_blog':['KQFuA_pYpP0','2MolMEQVDBw','mTpWKZkh4Zc'],
'vikas_blog':['meuTjWU9gZA','BKtyCSbhlqk','n2S3Gftvnt4'],
'kavita_blog':['Q04XMULypcA','TP2byDYIxpE','mtjY4-rIv_c']
};
const ids=[...new Set(Object.values(map).flat())];const metadata={};const evidence=[];
await fs.mkdir('public/images/journal-videos',{recursive:true});
for(let i=0;i<ids.length;i+=4){
 await Promise.all(ids.slice(i,i+4).map(async id=>{
  const entry=listings.find(v=>new URL(v.url).searchParams.get('v')===id);
  if(!entry)throw Error('Video absent from official channel: '+id);
  const lines=entry.text.split('\n');
  const video={id,url:'https://www.youtube.com/watch?v='+id,title:lines[1],duration:lines[0],thumbnail:'images/journal-videos/'+id+'.jpg'};
  const r=await fetch('https://i.ytimg.com/vi/'+id+'/hqdefault.jpg',{signal:AbortSignal.timeout(30000)});
  if(!r.ok)throw Error('Thumbnail unavailable: '+id);
  await fs.writeFile('public/'+video.thumbnail,Buffer.from(await r.arrayBuffer()));
  let status;
  try{const o=await fetch('https://www.youtube.com/oembed?url='+encodeURIComponent(video.url)+'&format=json',{signal:AbortSignal.timeout(20000)});status=o.status;if(o.ok){const info=await o.json();video.title=info.title;video.channel=info.author_name;video.channel_url=info.author_url;}}
  catch(error){status=error.message}
  evidence.push({id,oembed_status:status,listing:entry});
  metadata[id]=video;
 }));
 console.log(Math.min(i+4,ids.length)+'/'+ids.length);
}
const result={};
for(const [slug,videoIds] of Object.entries(map)){
 const diary=slug.startsWith('day-'),related=slug==='ramayan-dhar-dwivedi';
 result[slug]={
  match:related?'related-performances':diary?'diary-session-excerpts':'session-excerpts',
  heading:related?'More from Ramayan Dhar Dwivedi':diary?'Watch moments from this day':'Watch the conversation',
  description:related?'Related poetry performances from the festival archive. These are not the full discussion described above.':diary?'Selected recordings of sessions mentioned in this diary, from the official festival channel.':'Continue the story with session excerpts from the official festival YouTube channel.',
  videos:videoIds.map(id=>metadata[id])
 };
}
await fs.writeFile('resources/data/journal-videos.json',JSON.stringify(result,null,2)+'\n');
await fs.writeFile('research/journal-youtube-2026-09-30/verification.json',JSON.stringify(evidence,null,2)+'\n');
console.log('Mapped',Object.keys(result).length,'articles to',ids.length,'recordings. oEmbed failures:',evidence.filter(e=>e.oembed_status!==200).map(e=>[e.id,e.oembed_status]));
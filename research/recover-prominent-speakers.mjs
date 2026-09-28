import fs from 'node:fs/promises';
const titles=['Ruskin Bond','Narendra Kohli','Javed Akhtar','Shabana Azmi','Amish Tripathi','Devdutt Pattanaik','Ashwin Sanghi','Piyush Mishra','Anupam Kher','Kabir Bedi','Annu Kapoor','Deepti Naval','Tarek Fatah','Kishwar Naheed','Taslima Nasrin','Vikram Sampath','Anand Ranganathan','J. Sai Deepak','Neelesh Misra','Mame Khan',"Neeraj Arya's Kabir Cafe",'Gopaldas Neeraj','Raghuveer Chaudhari','Malini Awasthi','Chetan Bhagat','Sonam Wangchuk','Gitanjali J. Angmo','Abid Surti','Kumar Vishwas','Bhawana Somaaya','Anshu Gupta','Arun Kamal','Chitra Mudgal','Mamta Kalia','Rajiv Dogra','Naresh Saxena','Gautam Chikermane','Philippa Kaye'];
const dir='research/client-changes-2026-09-28';await fs.mkdir(dir,{recursive:true});
const get=async url=>{const r=await fetch(url,{headers:{'User-Agent':'ILFContentReview/1.0'},signal:AbortSignal.timeout(25000)});if(!r.ok)throw new Error(`${r.status}`);return r.json();};
const results=[];
for(const title of titles){try{
 const en=await get('https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',prop:'extracts|langlinks|pageimages|info',inprop:'url',exintro:'1',explaintext:'1',lllang:'hi',piprop:'thumbnail',pithumbsize:'700',redirects:'1',format:'json',titles:title}));
 const page=Object.values(en.query.pages)[0];if(!page.extract||page.pageid===undefined)throw new Error('No biography');
 const hiTitle=page.langlinks?.[0]?.['*'];let hi=null;
 if(hiTitle){const response=await get('https://hi.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',prop:'extracts|info',inprop:'url',exintro:'1',explaintext:'1',format:'json',titles:hiTitle}));hi=Object.values(response.query.pages)[0];}
 const slug=title.toLowerCase().replaceAll('.','').replaceAll("'",'').replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
 results.push({requested:title,name:page.title,slug,english:page.extract,hindi:hi?.extract||'',englishSource:page.fullurl,hindiSource:hi?.fullurl||null,thumbnail:page.thumbnail?.source||null});console.log(title,'en',page.extract.length,'hi',hi?.extract?.length||0);
 }catch(e){results.push({requested:title,error:e.message});console.log(title,e.message);}}
await fs.writeFile(dir+'/public-speaker-sources.json',JSON.stringify(results,null,2));

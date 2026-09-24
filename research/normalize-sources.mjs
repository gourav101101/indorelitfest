import fs from 'node:fs/promises';
async function clean(dir) {
 for(const entry of await fs.readdir(dir,{withFileTypes:true})) {
  const file=dir+'/'+entry.name;
  if(entry.isDirectory())await clean(file);
  else if(/\.(php|css|js)$/.test(file)) {
   const text=await fs.readFile(file,'utf8');
   const next=text.replace(/^\uFEFF/,'').replace(/@endif@endforeach/g,'@endif\n@endforeach');
   if(next!==text)await fs.writeFile(file,next);
  }
 }
}
await clean('resources');

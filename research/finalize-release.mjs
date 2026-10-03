import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve('deployment/releases/indorelitfest-2026-10-02T06-12-48-479Z');
for(const name of await fs.readdir(path.join(root,'bootstrap/cache'))){
 if(name.endsWith('.php'))await fs.unlink(path.join(root,'bootstrap/cache',name));
}
for(const doc of ['hostinger-deployment.md','handover-2026-10-02.md'])await fs.copyFile('docs/'+doc,path.join(root,'docs',doc));
const installed=JSON.parse(await fs.readFile(path.join(root,'vendor/composer/installed.json'),'utf8'));
if(installed.dev!==false||installed['dev-package-names'].length)throw new Error('Development packages in release');
await fs.writeFile(path.join(root,'RELEASE-NOTES.txt'),[
'Prepared 2 October 2026 with built assets and 77 production Composer dependencies.',
'Local platform checks and Laravel route loading passed.',
'No live deployment has been performed. Configure .env, APP_KEY, HTTPS domain and document root on the host.',
'Follow docs/hostinger-deployment.md. Do not upload the full application into public_html.',
'Only public/ belongs in the web document root. Preserve the existing APP_KEY for redeployments.',
'Run php artisan package:discover, then the documented cache commands on the target server.',
'Run composer check-platform-reqs --no-dev and php deployment/check.php on the target host.',
'Local .env, research, node_modules, database files and runtime caches are excluded.',
].join('\n')+'\n');
const files=[];
async function scan(relative=''){
 for(const entry of await fs.readdir(path.join(root,relative),{withFileTypes:true})){
  const name=relative?relative+'/'+entry.name:entry.name;
  if(entry.isSymbolicLink())throw new Error('Unexpected link '+name);
  if(entry.isDirectory())await scan(name);
  else if(name!=='release-manifest.json'){
   if(name==='.env'||name==='public/hot'||name.startsWith('research/')||name.startsWith('node_modules/')||/^bootstrap\/cache\/.*\.php$/.test(name))throw new Error('Excluded path in release '+name);
   const bytes=await fs.readFile(path.join(root,name));
   files.push({path:name,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
  }
 }
}
await scan();
const manifest={created:new Date().toISOString(),productionDependenciesIncluded:true,productionPackages:installed.packages.length,files};
await fs.writeFile(path.join(root,'release-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({root,files:files.length,productionPackages:installed.packages.length,bytes:files.reduce((sum,f)=>sum+f.bytes,0)}));

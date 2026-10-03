import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = path.join(root, 'deployment', 'releases');
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const destination = path.join(base, 'indorelitfest-' + stamp);
const files = [];
const allowed = ['app', 'bootstrap', 'config', 'public', 'resources', 'routes', 'artisan', 'composer.json', 'composer.lock', 'deployment/check.php', 'deployment/index.php', 'deployment/.env.hostinger.example', 'docs/hostinger-deployment.md'];
const excluded = relative => relative.startsWith('bootstrap/cache/') || relative === 'public/hot' || /(^|\/)\.env($|\.)/.test(relative) && relative !== 'deployment/.env.hostinger.example';
await fs.access(path.join(root, 'public/build/manifest.json'));
await fs.mkdir(destination, {recursive: true});
async function copy(relative) {
    if (excluded(relative)) return;
    const source = path.join(root, relative);
    const stat = await fs.lstat(source);
    if (stat.isSymbolicLink()) throw new Error('Review symbolic link before packaging: ' + relative);
    if (stat.isDirectory()) {
        for (const entry of await fs.readdir(source)) await copy(relative + '/' + entry);
    } else if (stat.isFile()) {
        const target = path.join(destination, relative);
        await fs.mkdir(path.dirname(target), {recursive: true});
        await fs.copyFile(source, target);
        files.push({path: relative, bytes: stat.size});
    }
}
for (const relative of allowed) await copy(relative);
for (const directory of ['bootstrap/cache', 'storage/app/private', 'storage/app/public', 'storage/framework/cache/data', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs']) {
    await fs.mkdir(path.join(destination, directory), {recursive: true});
    await fs.writeFile(path.join(destination, directory, '.gitignore'), '*\n!.gitignore\n');
}
await fs.writeFile(path.join(destination, 'RELEASE-NOTES.txt'), [
    'Source and built-asset release; production Composer dependencies must be installed before upload or on the host.',
    'No vendor, local .env, tests, research, node_modules, database files or local runtime caches are included.',
    'From this release directory: composer install --no-dev --optimize-autoloader',
    'Then: composer check-platform-reqs --no-dev',
    'Follow docs/hostinger-deployment.md for .env, document root, key and server-side cache setup.',
    'Never upload the whole application into public_html. Only public/ belongs in the web root.',
    'No deployment has been performed.',
].join('\n') + '\n');
await fs.writeFile(path.join(destination, 'release-manifest.json'), JSON.stringify({created: new Date().toISOString(),productionDependenciesIncluded: false,files}, null, 2) + '\n');
console.log(JSON.stringify({destination,files:files.length,bytes:files.reduce((total,file)=>total+file.bytes,0),productionDependenciesIncluded:false},null,2));

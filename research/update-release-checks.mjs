import fs from 'node:fs';
let check=fs.readFileSync('deployment/check.php','utf8');
check=check.replace("['legacy.json', 'speakers-2024.json']",JSON.stringify(fs.readdirSync('resources/data').filter(f=>f.endsWith('.json'))).replaceAll('"',"'"));
check=check.replace("$check(is_file(resource_path('data/'.$file)), 'Content data: '.$file);",`$dataPath = resource_path('data/'.$file);
        $valid = is_file($dataPath);
        if ($valid) {
            json_decode(file_get_contents($dataPath), true);
            $valid = json_last_error() === JSON_ERROR_NONE;
        }
        $check($valid, 'Content data exists and is valid JSON: '.$file);`);
fs.writeFileSync('deployment/check.php',check);
let ignore=fs.readFileSync('.gitignore','utf8');
if(!ignore.includes('/deployment/releases/'))fs.writeFileSync('.gitignore',ignore+'\n/deployment/releases/\n');
let docs=fs.readFileSync('docs/hostinger-deployment.md','utf8');
const section='\n## Prepared release copy\n\nRun `node scripts/prepare-release.mjs` after a successful build. It creates a new timestamped copy under `deployment/releases/` with an allowlist of application files and built public assets, plus empty runtime directories and a file manifest. It excludes the local environment, development dependencies, research, database files and runtime caches. The copy includes **no vendor directory**: run the production Composer install shown above inside that copy (or on the target host) before serving it. The script never changes an existing release or deploys anything.\n';
if(!docs.includes('## Prepared release copy'))fs.writeFileSync('docs/hostinger-deployment.md',docs+section);

import fs from 'node:fs';
const file='app/Support/SpeakerDirectory.php';
let php=fs.readFileSync(file,'utf8');
const marker="        // These are already labelled, client-supplied portraits used on the homepage.";
const overlay=`        // Researched introductions fill gaps without replacing client biographies or identities.
        $introductions = json_decode(file_get_contents(resource_path('data/speaker-biographies.json')), true, 512, JSON_THROW_ON_ERROR);
        foreach ($introductions as $slug => $introduction) {
            if (isset($records[$slug]) && empty($records[$slug]['paragraphs'])) {
                foreach (['paragraphs', 'hindi', 'source', 'source_credit'] as $field) {
                    $records[$slug][$field] = $introduction[$field];
                }
                if (empty($records[$slug]['role'])) $records[$slug]['role'] = $introduction['role'];
            }
        }
`;
if(!php.includes('speaker-biographies.json'))php=php.replace(marker,overlay+marker);
fs.writeFileSync(file,php);
const lintFile='scripts/check-client-photo-sources.mjs';
fs.writeFileSync(lintFile,fs.readFileSync(lintFile,'utf8').replace('catch{}','catch(error){if(error.code!==\'ENOENT\')throw error;}'));
const config=fs.readFileSync('config/festival.php','utf8');
const keys=['REGISTRATION','OPEN_MIC','STALL','VOLUNTEER','INTERNSHIP'];
let env=fs.readFileSync('deployment/.env.hostinger.example','utf8');
for(const key of keys){
 const match=config.match(new RegExp("env\\('FESTIVAL_"+key+"_URL'\\) \\?: '([^']+)'"));
 if(!match)throw new Error('Missing form '+key);
 env=env.replace(new RegExp('^FESTIVAL_'+key+'_URL=.*$','m'),'FESTIVAL_'+key+'_URL='+match[1]);
}
if(!env.includes('FESTIVAL_JOURNEY_YOUTUBE='))env=env.replace('FESTIVAL_FILM=','FESTIVAL_JOURNEY_YOUTUBE=https://www.youtube.com/watch?v=aPCUji_k5BQ\nFESTIVAL_FILM=');
fs.writeFileSync('deployment/.env.hostinger.example',env);
for(const doc of ['docs/client-changes-status-2026-09-28.md','docs/client-content-applied-2026-09-29.md','docs/client-message-remaining-2026-09-28.md']){
 let text=fs.readFileSync(doc,'utf8');
 const note='> Update, 2 October 2026: Open Mic is confirmed working by the user. Speaker photographs, name confirmations, missing gallery files and future 2026 announcements are deferred at the user’s request. See [current handover](handover-2026-10-02.md); older outstanding items below are historical.\n\n';
 if(!text.includes('Update, 2 October 2026:'))text=note+text;
 fs.writeFileSync(doc,text);
}
let deploy=fs.readFileSync('docs/hostinger-deployment.md','utf8');
deploy=deploy.replace('- `FESTIVAL_FILM=media/11-years-film.mp4` after copying the actual MP4 into the public media directory','- `FESTIVAL_JOURNEY_YOUTUBE=https://www.youtube.com/watch?v=aPCUji_k5BQ` for the supplied journey film. Leave `FESTIVAL_FILM` empty unless a separate, hosted MP4 is intentionally supplied.');
fs.writeFileSync('docs/hostinger-deployment.md',deploy);
console.log('Integrated',Object.keys(JSON.parse(fs.readFileSync('resources/data/speaker-biographies.json','utf8'))).length,'bilingual introductions; updated deployment form defaults and handover pointers.');

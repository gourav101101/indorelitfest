import fs from 'node:fs/promises';
const replacements = {
 'resources/views/frontend/partials/header.blade.php': [['Rooted in Indore. Inspired by Malwa. Open to the world.','Indore Literature Festival · A celebration of words and ideas'],['Discover Malwa','Discover Indore']],
 'resources/views/frontend/partials/footer.blade.php': [['Discover Malwa','Discover Indore']],
 'resources/views/frontend/layouts/app.blade.php': [['the spirit of Malwa','the spirit of Indore']],
 'app/Http/Controllers/Frontend/FestivalController.php': [['the spirit of Malwa','the spirit of Indore'],['Rooted in Malwa. Open to the world.','Indore. A city full of stories.']],
 'resources/views/frontend/pages/home.blade.php': [
 ['books, readers and Malwa-inspired architecture','books, readers and architecture inspired by Indore and its region'],
 ['poetry and Malwa','poetry and Indore'],['THE SPIRIT OF MALWA','THE SPIRIT OF INDORE'],['Rooted in Malwa.','Rooted in Indore.'],
 ['OUR ROOTS RUN DEEP','OUR CITY. OUR INSPIRATION.'],['A little Malwa.<br><em>A whole lot of soul.</em>','A city called Indore.<br><em>A heart full of stories.</em>'],
 ['मालवा की मिट्टी, कहानियों की खुशबू।','इंदौर की गलियाँ, कहानियों की दुनिया।'],
 ['In our streets, our music and the way we welcome you, there is a story waiting to be told. Discover the region that gives our festival its spirit.','In our streets, our conversations and the way we welcome you, there is a story waiting to be told. Get to know Indore, the city our festival calls home.'],
 ['<div class="place-tags"><span>Indore</span><span>Ujjain</span><span>Mandu</span><span>Dewas</span></div>','<div class="place-tags"><span>Our city</span><span>Our stories</span><span>Our people</span></div>'],
 ['Discover our Malwa','Discover Indore']],
 'resources/views/frontend/pages/malwa.blade.php': [
 ['An invitation to explore the places, voices and traditions that give our festival its character.','Get to know Indore, our festival’s home, and discover a little of the region around it.'],
 ['मालवा की मिट्टी, कहानियों की खुशबू।','इंदौर की गलियाँ, कहानियों की दुनिया।'],
 ['Indore sits on the southern edge of the Malwa plateau. It is our festival’s home: a city of heritage, conversation and a generous welcome.','Indore is our festival’s home: a city of heritage, conversation and a generous welcome. Its streets and stories are at the heart of our celebration.'],
 ['Beyond the city lies a region to explore at your own pace.','Beyond Indore, the surrounding Malwa region offers places to explore at your own pace.']]
};
for(const [file, pairs] of Object.entries(replacements)) {
 let text=await fs.readFile(file,'utf8');
 for(const [from,to] of pairs) { if(!text.includes(from))throw new Error('Missing text in '+file+': '+from); text=text.replaceAll(from,to); }
 await fs.writeFile(file,text);
}

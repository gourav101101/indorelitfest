<?php
namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FestivalController
{
    private function data(): array
    {
        $data=json_decode(file_get_contents(resource_path('data/legacy.json')), true, 512, JSON_THROW_ON_ERROR);
        $editorial=require resource_path('data/editorial.php');
        foreach($data['speakers'] as &$speaker){
            $speaker['role']=$editorial['roles'][$speaker['slug']] ?? $speaker['role'];
            $speaker['hindi']=$speaker['hindi'] ?? [];
            if($speaker['slug']==='shalini-modi') {
                $speaker['hindi']=array_values(array_filter($speaker['paragraphs'],fn($p)=>preg_match('/[\x{0900}-\x{097F}]/u',$p)));
                $speaker['paragraphs']=array_values(array_filter($speaker['paragraphs'],fn($p)=>!preg_match('/[\x{0900}-\x{097F}]/u',$p)));
            }
            // The malformed old page nests a Divya Mathur paragraph inside this profile.
            if($speaker['slug']==='vivek-chaturvedi')$speaker['paragraphs']=array_values(array_filter($speaker['paragraphs'],fn($p)=>!str_starts_with($p,'Ms. Divya Mathur')));
        }
        unset($speaker);
        foreach($data['articles'] as &$article){
            $article['title']=preg_replace('/[\s–-]+$/u','',$article['title']);
            $article['minutes']=max(1,(int)ceil(count(preg_split('/\s+/u',implode(' ',$article['paragraphs'])))/180));
            $article['excerpt']=Str::limit($article['paragraphs'][0] ?? '',145);
            $article['speaker_slugs']=$editorial['article_speakers'][$article['slug']] ?? [];
            $article['language']=preg_match('/[\x{0900}-\x{097F}]/u',implode(' ',$article['paragraphs'])) ? 'hi' : 'en';
            if($article['language']==='hi')$article['title']=str_replace(['Day 1','Day 2','Day 3'],['पहला दिन','दूसरा दिन','तीसरा दिन'],$article['title']);
            $article['image_alt']='Illustration for the festival journal';
            foreach($data['speakers'] as $person) if(in_array($person['slug'],$article['speaker_slugs'])) { $article['image']=$person['image']; $article['image_alt']=$person['name'].' — featured festival speaker'; break; }
        }
        unset($article);
        $data['faq']=$editorial['faq'];
        $past=json_decode(file_get_contents(resource_path('data/speakers-2024.json')),true)['speakers'];
        $data['featuredSpeakers']=array_merge(array_values(array_filter($past,fn($s)=>in_array($s['slug'],['manoj-muntashir-shukla','neelima-dalmia-adhar']))),array_values(array_filter($data['speakers'],fn($s)=>in_array($s['slug'],['vivek-ranjan-agnihotri','sharmistha-mukherjee','rahgir']))));
        return $data;
    }
    private function render(string $page, array $data = []) {
        return view('frontend.pages.'.$page, array_merge($this->data(), $data, ['page'=>$page]));
    }
    public function home() { return $this->render('home', ['title'=>'12th Edition · 27–29 November 2026','description'=>'Join the 12th Indore Literature Festival, 27–29 November 2026 at Daly College, Indore. Register for three days of literature, stories, poetry, art and ideas.','socialImage'=>'images/rajwada-daly-hero-2026.webp']); }
    public function speakers() { return $this->render('speakers-upcoming', ['title'=>'2026 Speakers']); }
    private function pastSpeakers(): array {
        return json_decode(file_get_contents(resource_path('data/past-speakers.json')),true,512,JSON_THROW_ON_ERROR);
    }
    public function pastSpeaker(string $slug) {
        $all=$this->pastSpeakers();
        $index=collect($all)->search(fn($s)=>$s['slug']===$slug);
        abort_if($index===false,404);
        $speaker=$all[$index];
        return $this->render('speaker',['speaker'=>$speaker,'historicalProfile'=>true,'title'=>$speaker['name'],'description'=>Str::limit($speaker['paragraphs'][0],155),'socialImage'=>$speaker['image'] ?: 'images/indore-literature-festival-badge.png','related'=>[],'nextSpeaker'=>$all[($index+1)%count($all)],'previousSpeaker'=>$all[($index+count($all)-1)%count($all)]]);
    }
    private function speakersForYear(int $year): array {
        if($year===2025) return $this->data()['speakers'];
        return json_decode(file_get_contents(resource_path('data/speakers-2024.json')), true, 512, JSON_THROW_ON_ERROR)['speakers'];
    }
    public function archive() { return $this->render('speaker-archive', ['title'=>'Speaker archives','yearCounts'=>[2025=>count($this->speakersForYear(2025)),2024=>count($this->speakersForYear(2024))]]); }
    public function speakerYear(string $year) {
        return $this->render('speakers', ['title'=>$year.' Speakers','archiveYear'=>(int)$year,'speakers'=>$this->speakersForYear((int)$year)]);
    }
    public function archiveSpeaker(string $year, string $slug) {
        if($year==='2025') {
            abort_unless(collect($this->speakersForYear(2025))->contains('slug',$slug),404);
            return redirect()->route('speaker',$slug,301);
        }
        $all=$this->speakersForYear((int)$year);
        $index=collect($all)->search(fn($s)=>$s['slug']===$slug);
        abort_if($index===false,404);
        $speaker=$all[$index];
        return $this->render('speaker',['speaker'=>$speaker,'archiveYear'=>(int)$year,'title'=>$speaker['name'],'description'=>Str::limit($speaker['paragraphs'][0],155),'socialImage'=>$speaker['image'],'related'=>[],'nextSpeaker'=>$all[($index+1)%count($all)],'previousSpeaker'=>$all[($index+count($all)-1)%count($all)]]);
    }
    public function speaker(string $slug) {
        $speaker=collect($this->data()['speakers'])->firstWhere('slug',$slug);
        abort_unless($speaker,404);
        $index=collect($this->data()['speakers'])->search(fn($s)=>$s['slug']===$slug);
        $all=$this->data()['speakers'];
        $related=collect($this->data()['articles'])->filter(fn($a)=>in_array($slug,$a['speaker_slugs']))->values()->all();
        return $this->render('speaker', ['speaker'=>$speaker,'title'=>$speaker['name'],'description'=>Str::limit($speaker['paragraphs'][0] ?? '',155),'socialImage'=>$speaker['image'],'related'=>$related,'nextSpeaker'=>$all[($index+1)%count($all)],'previousSpeaker'=>$all[($index+count($all)-1)%count($all)]]);
    }
    public function journal() { return $this->render('journal', ['title'=>'The festival journal']); }
    public function article(string $slug) {
        $article=collect($this->data()['articles'])->firstWhere('slug',$slug);
        abort_unless($article,404);
        $related=collect($this->data()['articles'])->where('slug','!=',$slug)->sortByDesc(fn($a)=>$a['category']===$article['category'])->take(3)->values()->all();
        $people=collect($this->data()['speakers'])->whereIn('slug',$article['speaker_slugs'])->values()->all();
        return $this->render('article', ['article'=>$article,'title'=>$article['title'],'description'=>Str::limit($article['paragraphs'][0] ?? '',155),'socialImage'=>$article['image'],'related'=>$related,'people'=>$people]);
    }
    public function gallery() { return $this->render('gallery', ['title'=>'A festival of memories']); }
    public function season(string $season) {
        if($season==='archive') return redirect()->route('gallery',[],301);
        abort_unless($season==='archive' || in_array($season,array_map('strval',range(2015,2025))),404);
        $photos=[];
        if($season==='2025') {
            $photos=json_decode(file_get_contents(resource_path('data/gallery-2025.json')),true,512,JSON_THROW_ON_ERROR);
        } elseif($season==='archive') {
            $files=glob(public_path('legacy/images/archive/*.jpg'));natsort($files);
            foreach($files as $file)$photos[]=['path'=>'/legacy/images/archive/'.basename($file),'day'=>'Past editions','category'=>'archive'];
        }
        return $this->render('season',['title'=>$season==='archive'?'From our archives':'Season '.($season-2014).' · '.$season,'season'=>$season,'photos'=>$photos]);
    }
    public function page(Request $request, string $page) {
        $titles=['about'=>'Literature. A legacy we share.','schedule'=>'Make room for a good story','malwa'=>'Discover Malwa & beyond.','contact'=>'Every conversation begins with hello','participate'=>'There’s a place for you here','film'=>'Eleven years. Countless stories.','faq'=>'A little help before you join us'];
        $titles += ['experiences'=>'One festival. A world to step into.','visit'=>'Your next stop: Indore.','community'=>'Great stories need good people.','media'=>'Stories worth sharing.'];
        return $this->render($page,['title'=>$titles[$page]]);
    }
    public function sitemap() {
        $paths=['/','/about','/speakers','/speakers/archive','/schedule','/journal','/gallery','/gallery/2025','/malwa','/contact','/participate','/film','/faq'];
        $paths=array_merge($paths,['/experiences','/visit','/community','/media']);
        foreach($this->data()['speakers'] as $s)$paths[]='/speakers/'.$s['slug'];
        foreach([2024,2025] as $year)$paths[]='/speakers/archive/'.$year;
        foreach($this->speakersForYear(2024) as $s)$paths[]='/speakers/archive/2024/'.$s['slug'];
        foreach($this->pastSpeakers() as $s)$paths[]='/speakers/past/'.$s['slug'];
        foreach($this->data()['articles'] as $a)$paths[]='/journal/'.$a['slug'];
        $xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach($paths as $path)$xml.='<url><loc>'.htmlspecialchars(url($path),ENT_XML1).'</loc></url>';
        return response($xml.'</urlset>',200)->header('Content-Type','application/xml');
    }
}

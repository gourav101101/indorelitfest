<?php
namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FestivalController
{
    private function data(): array
    {
        $data=json_decode(file_get_contents(resource_path('data/legacy.json')), true, 512, JSON_THROW_ON_ERROR);
        $data['articles']=json_decode(file_get_contents(resource_path('data/journal.json')), true, 512, JSON_THROW_ON_ERROR);
        $editorial=require resource_path('data/editorial.php');
        $data['speakers']=array_map(fn($person)=>$this->speakerDirectory()->find($person['slug']),$data['speakers']);
        foreach($data['articles'] as &$article){
            $article=\App\Support\JournalArticle::forDisplay($article);
            $article['minutes']=max(1,(int)ceil(count(preg_split('/\s+/u',implode(' ',$article['paragraphs'])))/180));
            $article['excerpt']=Str::limit($article['paragraphs'][0] ?? '',145);
            $article['speaker_slugs']=$editorial['article_speakers'][$article['slug']] ?? [];
            $article['language']=preg_match('/[\x{0900}-\x{097F}]/u',implode(' ',$article['paragraphs'])) ? 'hi' : 'en';
        }
        unset($article);
        $data['faq']=$editorial['faq'];

        $selection=json_decode(file_get_contents(resource_path('data/home-speaker-selection.json')),true);
        $data['featuredSpeakers']=[];
        foreach($selection['homepage'] as $choice){
            $person=collect($this->pastSpeakers())->firstWhere('slug',$choice['slug']);
            $data['featuredSpeakers'][]=array_merge($person,$choice,['profile_url'=>$person['profile_url']]);
        }
        $data['rotatingSpeakers']=$selection['rotating'];
        return $data;
    }
    private function render(string $page, array $data = []) {
        return view('frontend.pages.'.$page, array_merge($this->data(), $data, ['page'=>$page]));
    }
    public function home() { return $this->render('home', ['title'=>'12th Edition · 27–29 November 2026','description'=>'Join the 12th Indore Literature Festival, 27–29 November 2026 at Daly College, Indore. Register for three days of literature, stories, poetry, art and ideas.','socialImage'=>'images/rajwada-daly-hero-2026.webp']); }
    public function speakers() { return $this->render('speakers-upcoming', ['title'=>'2026 Speakers']); }
    private ?\App\Support\SpeakerDirectory $speakerRecords = null;
    private function speakerDirectory(): \App\Support\SpeakerDirectory {
        return $this->speakerRecords ??= new \App\Support\SpeakerDirectory();
    }
    private function pastSpeakers(): array {
        return array_values($this->speakerDirectory()->all());
    }
    private function speakersForYear(int $year): array {
        return $this->speakerDirectory()->forYear($year);
    }
    public function archive(Request $request) {
        $records=$this->speakerDirectory()->confirmed();
        $yearCounts=$this->speakerDirectory()->yearCounts();
        $query=trim((string)$request->query('q',''));
        $year=(string)$request->query('year','');
        // Preserve the former earlier-voices link by opening the complete directory.
        if($year==='earlier') return redirect()->route('speakers.archive',array_filter(['q'=>$query]),301);
        abort_unless($year==='' || in_array($year,array_map('strval',range(2015,2025)),true),404);
        $filtered=array_values(array_filter($records,fn($speaker)=>
            ($year==='' || in_array((int)$year,$speaker['years'],true))
            && ($query==='' || str_contains($speaker['search_text'],mb_strtolower($query)))
        ));
        $showAll=$request->query('view')==='all';
        $perPage=$showAll ? max(1,count($filtered)) : 24;
        $page=max(1,min((int)$request->query('page',1),max(1,(int)ceil(count($filtered)/$perPage))));
        $directory=new \Illuminate\Pagination\LengthAwarePaginator(array_slice($filtered,($page-1)*$perPage,$perPage),count($filtered),$perPage,$page,[
            'path'=>route('speakers.archive'),
            'query'=>array_filter(['q'=>$query,'year'=>$year,'view'=>$showAll ? 'all' : null],fn($v)=>$v!==null && $v!==''),
            'fragment'=>'archive-directory',
        ]);
        return $this->render('speaker-archive', ['title'=>'Speaker archives','yearCounts'=>$yearCounts,'directory'=>$directory,'archiveQuery'=>$query,'selectedYear'=>$year,'showAll'=>$showAll,'totalProfiles'=>count($records)]);
    }
    public function speakerYear(string $year) {
        abort_unless(in_array((int)$year,range(2015,2025),true),404);
        return $this->render('speakers', ['title'=>$year.' Speakers','archiveYear'=>(int)$year,'speakers'=>$this->speakersForYear((int)$year)]);
    }
    private function speakerProfile(array $speaker, ?int $archiveYear=null) {
        $all=$this->speakerDirectory()->confirmed();
        $index=collect($all)->search(fn($person)=>$person['slug']===$speaker['slug']);
        if($index===false) { $all[]=$speaker; $index=count($all)-1; }
        $slugs=array_unique(array_merge([$speaker['slug']],$speaker['slug_aliases']));
        $related=collect($this->data()['articles'])->filter(fn($article)=>count(array_intersect($slugs,$article['speaker_slugs']))>0)->values()->all();
        $view=['speaker'=>$speaker,'historicalProfile'=>$speaker['biography_year']===null,'title'=>$speaker['name'],
            'description'=>Str::limit($speaker['paragraphs'][0] ?? $speaker['name'].' at Indore Literature Festival.',155),
            'socialImage'=>$speaker['image'] ?: 'images/indore-literature-festival-badge.png',
            'canonicalUrl'=>$speaker['profile_url'],'related'=>$related,
            'nextSpeaker'=>$all[($index+1)%count($all)],'previousSpeaker'=>$all[($index+count($all)-1)%count($all)]];
        if($archiveYear!==null) $view['archiveYear']=$archiveYear;
        return $this->render('speaker',$view);
    }
    public function pastSpeaker(string $slug) {
        $speaker=$this->speakerDirectory()->find($slug);
        abort_unless($speaker,404);
        return $this->speakerProfile($speaker);
    }
    public function archiveSpeaker(string $year, string $slug) {
        $speaker=$this->speakerDirectory()->find($slug);
        abort_unless($speaker,404);
        $listed=in_array((int)$year,$speaker['years'],true);
        // Keep original brochure/profile links working, even when omitted from the new list.
        $oldCollection=(int)$year===2024
            ? json_decode(file_get_contents(resource_path('data/speakers-2024.json')),true)['speakers']
            : ((int)$year===2025 ? json_decode(file_get_contents(resource_path('data/legacy.json')),true)['speakers'] : []);
        $oldLink=collect($oldCollection)->contains('slug',$slug);
        abort_unless($listed || $oldLink,404);
        if($year==='2025') return redirect($speaker['profile_url'],301);
        return $this->speakerProfile($speaker,(int)$year);
    }
    public function speaker(string $slug) {
        $speaker=$this->speakerDirectory()->find($slug);
        abort_unless($speaker,404);
        return $this->speakerProfile($speaker);
    }
    public function journal() { return $this->render('journal', ['title'=>'The festival journal']); }
    public function article(string $slug) {
        $article=collect($this->data()['articles'])->firstWhere('slug',$slug);
        abort_unless($article,404);
        $related=collect($this->data()['articles'])->where('slug','!=',$slug)->sortByDesc(fn($a)=>$a['category']===$article['category'])->take(3)->values()->all();
        $people=collect($article['speaker_slugs'])->map(fn($slug)=>$this->speakerDirectory()->find($slug))->filter()->unique('slug')->values()->all();
        return $this->render('article', ['article'=>$article,'articleVideos'=>json_decode(file_get_contents(resource_path('data/journal-videos.json')),true)[$slug] ?? null,'title'=>$article['title'],'description'=>Str::limit($article['paragraphs'][0] ?? '',155),'socialImage'=>$article['image'],'related'=>$related,'people'=>$people]);
    }
    private function galleryCollections(): array {
        return json_decode(file_get_contents(resource_path('data/gallery-collections.json')),true,512,JSON_THROW_ON_ERROR);
    }
    public function gallery() { return $this->render('gallery', ['title'=>'A festival of memories','collections'=>$this->galleryCollections()]); }
    public function season(string $season) {
        if($season==='archive') return redirect()->route('gallery',[],301);
        $collection=collect($this->galleryCollections())->firstWhere('slug',$season);
        abort_unless($collection,404);
        return $this->render('season',['title'=>$collection['title'],'season'=>$season,'photos'=>$collection['photos']]);
    }
    public function page(Request $request, string $page) {
        $titles=['about'=>'Literature. A legacy we share.','schedule'=>'Make room for a good story','malwa'=>'Discover Malwa & beyond.','contact'=>'Every conversation begins with hello','participate'=>'There’s a place for you here','film'=>'Eleven years. Countless stories.','faq'=>'A little help before you join us'];
        $titles += ['experiences'=>'One festival. A world to step into.','visit'=>'Your next stop: Indore.','community'=>'Great stories need good people.','media'=>'Stories worth sharing.'];
        return $this->render($page,['title'=>$titles[$page]]);
    }
    public function participation(string $slug) {
        $parts=json_decode(file_get_contents(resource_path('data/participation.json')),true,512,JSON_THROW_ON_ERROR);
        $part=collect($parts)->firstWhere('slug',$slug);
        abort_unless($part,404);
        return $this->render('participation-detail',['title'=>$part['title'],'part'=>$part,'parts'=>$parts,'description'=>Str::limit($part['copy'],155)]);
    }
    public function sitemap() {
        $paths=['/participate/volunteer','/participate/internship','/participate/stall-booking','/participate/open-mic','/','/about','/speakers','/speakers/archive','/schedule','/journal','/gallery','/gallery/2025','/malwa','/contact','/participate','/film','/faq'];
        $paths=array_merge($paths,['/experiences','/visit','/community','/media']);
        foreach($this->galleryCollections() as $collection)if($collection['slug']!=='2025')$paths[]='/gallery/'.$collection['slug'];
        foreach(range(2015,2025) as $year)$paths[]='/speakers/archive/'.$year;
        foreach($this->speakerDirectory()->all() as $person)$paths[]=$person['profile_path'];
        foreach($this->data()['articles'] as $a)$paths[]='/journal/'.$a['slug'];
        $xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach($paths as $path)$xml.='<url><loc>'.htmlspecialchars(url($path),ENT_XML1).'</loc></url>';
        return response($xml.'</urlset>',200)->header('Content-Type','application/xml');
    }
}

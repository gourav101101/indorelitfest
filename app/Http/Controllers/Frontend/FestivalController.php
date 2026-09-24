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
            // The malformed old page nests a Divya Mathur paragraph inside this profile.
            if($speaker['slug']==='vivek-chaturvedi')$speaker['paragraphs']=array_values(array_filter($speaker['paragraphs'],fn($p)=>!str_starts_with($p,'Ms. Divya Mathur')));
        }
        unset($speaker);
        foreach($data['articles'] as &$article){
            $article['title']=preg_replace('/[\s–-]+$/u','',$article['title']);
            $article['minutes']=max(1,(int)ceil(count(preg_split('/\s+/u',implode(' ',$article['paragraphs'])))/180));
            $article['excerpt']=Str::limit($article['paragraphs'][0] ?? '',145);
            $article['speaker_slugs']=$editorial['article_speakers'][$article['slug']] ?? [];
        }
        unset($article);
        $data['faq']=$editorial['faq'];
        return $data;
    }
    private function render(string $page, array $data = []) {
        return view('frontend.pages.'.$page, array_merge($this->data(), $data, ['page'=>$page]));
    }
    public function home() { return $this->render('home', ['title'=>'12th Edition · 27–29 November 2026','description'=>'Join the 12th Indore Literature Festival, 27–29 November 2026 at Daly College, Indore. Register for three days of literature, stories, poetry, art and ideas.','socialImage'=>'images/indore-festival-hero-2026.png']); }
    public function speakers() { return $this->render('speakers', ['title'=>'The voices of our festival']); }
    public function archive() { return $this->render('speaker-archive', ['title'=>'Speaker archives']); }
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
        abort_unless($season==='archive' || in_array($season,array_map('strval',range(2015,2025))),404);
        $photos=[];
        if($season==='2025') {
            foreach(['dayone'=>'Day 1','daytwo'=>'Day 2','daythree'=>'Day 3'] as $day=>$label){
                $files=glob(public_path('legacy/images/'.$day.'/*'));natsort($files);
                foreach($files as $file)if(preg_match('/\.(jpe?g|png)$/i',$file))$photos[]=['path'=>'/legacy/images/'.$day.'/'.basename($file),'day'=>$label,'category'=>$day];
            }
        } elseif($season==='archive') {
            $files=glob(public_path('legacy/images/archive/*.jpg'));natsort($files);
            foreach($files as $file)$photos[]=['path'=>'/legacy/images/archive/'.basename($file),'day'=>'Past editions','category'=>'archive'];
        }
        return $this->render('season',['title'=>$season==='archive'?'From our archives':'Season '.($season-2014).' · '.$season,'season'=>$season,'photos'=>$photos]);
    }
    public function page(Request $request, string $page) {
        $titles=['about'=>'A city. A story. A shared love.','schedule'=>'Make room for a good story','malwa'=>'Indore. A city full of stories.','contact'=>'Every conversation begins with hello','participate'=>'There’s a place for you here','film'=>'Eleven years. Countless stories.','faq'=>'A little help before you join us'];
        $titles += ['experiences'=>'One festival. A world to step into.','visit'=>'Your next stop: Indore.','community'=>'Great stories need good people.','media'=>'Stories worth sharing.'];
        return $this->render($page,['title'=>$titles[$page]]);
    }
    public function sitemap() {
        $paths=['/','/about','/speakers','/speakers/archive','/schedule','/journal','/gallery','/gallery/2025','/gallery/archive','/malwa','/contact','/participate','/film','/faq'];
        $paths=array_merge($paths,['/experiences','/visit','/community','/media']);
        foreach($this->data()['speakers'] as $s)$paths[]='/speakers/'.$s['slug'];
        foreach($this->data()['articles'] as $a)$paths[]='/journal/'.$a['slug'];
        $xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        foreach($paths as $path)$xml.='<url><loc>'.htmlspecialchars(url($path),ENT_XML1).'</loc></url>';
        return response($xml.'</urlset>',200)->header('Content-Type','application/xml');
    }
}

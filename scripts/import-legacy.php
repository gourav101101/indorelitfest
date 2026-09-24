<?php
function loadSource(string $name): DOMXPath {
    $html = file_get_contents(__DIR__.'/../research/legacy/'.$name.'.html');
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML('<?xml encoding="utf-8" ?>'.$html);
    return new DOMXPath($dom);
}
function textNode(?DOMNode $node): string { return $node ? trim(preg_replace('/\s+/u', ' ', $node->textContent)) : ''; }
function cls(string $name): string { return "contains(concat(' ', normalize-space(@class), ' '), ' $name ')"; }
function paragraphs(DOMXPath $xp, DOMNode $parent, string $query='.//p'): array {
    $out=[];
    foreach ($xp->query($query, $parent) as $p) {
        $html=$p->ownerDocument->saveHTML($p);
        foreach(preg_split('/(?:<br\s*\/?>\s*){2,}/i',$html) as $block){
            $text=trim(preg_replace('/\s+/u',' ',html_entity_decode(strip_tags($block),ENT_QUOTES|ENT_HTML5,'UTF-8')));
            if(mb_strlen($text)>12)$out[]=$text;
        }
    }
    return $out;
}
$xp=loadSource('speakers');$speakers=[];
foreach($xp->query('//article['.cls('ilf-person').']') as $person){
    $name=textNode($xp->query('.//*['.cls('ilf-name').']',$person)->item(0));
    $image=$xp->query('.//img['.cls('ilf-photo').']',$person)->item(0);
    $slug=trim(strtolower(preg_replace('/[^a-zA-Z0-9]+/','-',$image ? pathinfo($image->getAttribute('src'),PATHINFO_FILENAME):$name)),'-');
    if($slug==='1')$slug='vivek-ranjan-agnihotri';
    $clip=$xp->query('.//video[@src]',$person)->item(0);
    $speakers[]=['slug'=>$slug,'name'=>$name,'role'=>textNode($xp->query('.//*['.cls('ilf-role').']',$person)->item(0)),'image'=>$image?'/legacy/'.$image->getAttribute('src'):null,'paragraphs'=>paragraphs($xp,$person,'.//p['.cls('ilf-content').']'),'hindi'=>paragraphs($xp,$person,'.//p['.cls('ilf-hindi').']'),'programme_note'=>textNode($xp->query('.//p['.cls('ilf-quote').']',$person)->item(0)),'clip'=>$clip?$clip->getAttribute('src'):null,'year'=>2025];
}
$xp=loadSource('about');$about=[];
foreach($xp->query('//*['.cls('about-text').']//h1') as $heading){
    $p=$heading->nextSibling;while($p && $p->nodeName!=='p')$p=$p->nextSibling;
    $about[]=['title'=>textNode($heading),'text'=>textNode($p)];
}
$xp=loadSource('blog');$articles=[];
foreach($xp->query('//section['.cls('about-ilf').']//a[contains(@href,".php")]') as $link){
    $slug=pathinfo($link->getAttribute('href'),PATHINFO_FILENAME);
    if(!file_exists(__DIR__.'/../research/legacy/'.$slug.'.html'))continue;
    $parent=$link->parentNode;
    $title=textNode($xp->query('.//h2|.//h3',$parent)->item(0));
    $ap=loadSource($slug);
    $section=$ap->query('//section['.cls('about-ilf').']')->item(0);
    if(!$section)continue;
    $body=paragraphs($ap,$section);
    $heading=textNode($ap->query('.//h1|.//h2',$section)->item(0));
    $art=match($slug){'day-two','ramayan-dhar-dwivedi','rahagir','kavita_blog','mera-rachna-dharm'=>'poetry-art','day-three','sharmistha-mukherjee','one-nation-one-election','uday-mahurkar','vinay_blog','vikas_blog'=>'conversation-art',default=>'journal-art'};
    $articles[$slug]=['slug'=>$slug,'title'=>$heading?:$title,'paragraphs'=>$body,'year'=>2025,'category'=>str_starts_with($slug,'day-')?'Festival diary':'Conversations','image'=>'/images/'.$art.'.webp'];
}
$data=['speakers'=>$speakers,'about'=>$about,'articles'=>array_values($articles)];
file_put_contents(__DIR__.'/../resources/data/legacy.json',json_encode($data,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
echo count($speakers).' speakers, '.count($about).' about sections, '.count($articles)." articles imported.\n";
foreach($articles as $a)echo $a['slug'].' | '.$a['title'].' | '.count($a['paragraphs'])." paragraphs\n";

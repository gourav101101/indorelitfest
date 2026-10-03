<?php
$root=__DIR__.'/../research/journal-recovery-2026-09-30/';
libxml_use_internal_errors(true);
function page($path){$d=new DOMDocument();$d->loadHTML('<?xml encoding="utf-8" ?>'.file_get_contents($path));return new DOMXPath($d);}
function clean($s){return trim(preg_replace('/\s+/u',' ',html_entity_decode($s,ENT_QUOTES|ENT_HTML5,'UTF-8')));}
function cls($s){return "contains(concat(' ',normalize-space(@class),' '),' $s ')";}
$index=page($root.'blog.html');
$css=file_get_contents($root.'main.css');$articles=[];
foreach(json_decode(file_get_contents($root.'slugs.json'),true) as $slug){
 $xp=page($root.$slug.'.html');$section=$xp->query('//section['.cls('about-ilf').']')->item(0);
 if(!$section)throw new RuntimeException("Missing body: $slug");
 $heading=$xp->query('.//h1|.//h2',$section)->item(0);
 $title=clean($heading->textContent);$paragraphs=[];$blocks=[];
 foreach($xp->query('.//p|.//h2|.//h3|.//h4|.//li',$section) as $node){
  if($node===$heading)continue;
  $html=$node->ownerDocument->saveHTML($node);
  foreach(preg_split('/(?:<br\s*\/?>\s*){2,}/i',$html) as $part){
   $text=clean(strip_tags(preg_replace('/<br\s*\/?>/i',"\n",$part)));
   if($text==='')continue;
   $paragraphs[]=$text;$blocks[]=['type'=>in_array($node->nodeName,['h2','h3','h4'])?'heading':'paragraph','text'=>$text];
  }
 }
 $sources=[];
 foreach($xp->query('//section['.cls('about-ilf').' or '.cls('about-photo-top').' or '.cls('about-photo-bottom').' or '.cls('about-photo-bottom2').']//img[@src]') as $img){
  $src=$img->getAttribute('src');if($src!=='')$sources[]=['url'=>'https://indorelitfest.in/'.ltrim($src,'/'),'kind'=>'article-photo'];
 }
 foreach($xp->query('//section['.cls('about-photo-bottom').']//*[@class]') as $el){
  foreach(preg_split('/\s+/',$el->getAttribute('class')) as $class){
   if(preg_match('/^about-photo-[0-9]+$/',$class) && preg_match('/\.'.preg_quote($class,'/').'\s*\{[^}]*url\([\'"]?([^\'")]+)[\'"]?\)/s',$css,$m)){
    $sources[]=['url'=>'https://indorelitfest.in/'.preg_replace('#^\.\./#','',$m[1]),'kind'=>'shared-archive-background'];
   }
  }
 }
 $unique=[];foreach($sources as $src)$unique[$src['url']]=$src;
 if(!$unique||!$paragraphs)throw new RuntimeException("Empty recovery: $slug");
 $articles[]=['slug'=>$slug,'title'=>$title,'paragraphs'=>$paragraphs,'blocks'=>$blocks,'year'=>2025,'category'=>str_starts_with($slug,'day-')?'Festival diary':'Conversations','source_url'=>'https://indorelitfest.in/'.$slug.'.php','photo_sources'=>array_values($unique)];
 echo "$slug: ".count($paragraphs)." paragraphs, ".count($unique)." photos\n";
}
file_put_contents($root.'articles.json',json_encode($articles,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT));
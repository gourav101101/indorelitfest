<?php
namespace Tests\Feature;
use Tests\TestCase;
class JournalRecoveryTest extends TestCase
{
    public function test_journal_preserves_source_text_and_photos(): void
    {
        $articles=json_decode(file_get_contents(resource_path('data/journal.json')),true);
        $slugs=json_decode(file_get_contents(base_path('research/journal-recovery-2026-09-30/slugs.json')),true);
        $this->assertSame($slugs,array_column($articles,'slug'));
        $journal=$this->get('/journal')->assertOk();
        foreach($articles as $article){
            $journal->assertSee(ltrim($article['thumbnail'],'/'),false);
            $display=\App\Support\JournalArticle::forDisplay($article);
            $response=$this->get('/journal/'.$article['slug'])->assertOk()->assertSee($display['title']);
            foreach($display['paragraphs'] as $paragraph)$response->assertSee($paragraph);
            foreach($article['photos'] as $photo){
                foreach(['image','thumbnail','original'] as $key)$this->assertFileExists(public_path(ltrim($photo[$key],'/')));
                $response->assertSee(ltrim($photo['image'],'/'),false)->assertSee(ltrim($photo['original'],'/'),false);
            }
            $this->assertStringNotContainsString('Illustration for the festival journal',$response->getContent());
            $dom=new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML('<?xml encoding="utf-8" ?>'.file_get_contents(base_path('research/journal-recovery-2026-09-30/'.$article['slug'].'.html')));
            $xp=new \DOMXPath($dom);
            $body=$xp->query('//section[contains(concat(" ",normalize-space(@class)," ")," about-ilf ")]')->item(0);
            $compact=fn($text)=>preg_replace('/\s+/u','',$text);
            $this->assertSame($compact($body->textContent),$compact($article['title'].implode('',$article['paragraphs'])),$article['slug'].' source text differs');
        }
    }

    public function test_repeated_opening_titles_do_not_become_body_text_or_previews(): void
    {
        foreach(['kavita_blog','new-age-writing','budding-authors','sharmistha-mukherjee','rahagir'] as $slug){
            $response=$this->get('/journal/'.$slug)->assertOk();
            $article=$response->viewData('article');
            $this->assertNotSame($article['title'],$article['paragraphs'][0]);
            $this->assertGreaterThan(60,mb_strlen($article['excerpt']));
            $this->assertDoesNotMatchRegularExpression('/[\x{2013}\x{2014}-]$/u',$article['title']);
            $dom=new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML('<?xml encoding="utf-8" ?>'.$response->getContent());
            $xp=new \DOMXPath($dom);
            foreach($xp->query('//*[@data-reading-body]/p') as $p){
                $this->assertNotSame($article['title'],trim($p->textContent));
            }
        }
    }
}
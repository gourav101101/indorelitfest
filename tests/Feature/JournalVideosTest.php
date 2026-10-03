<?php
namespace Tests\Feature;
use Tests\TestCase;
class JournalVideosTest extends TestCase
{
    public function test_every_article_has_verified_video_links_before_photos_and_related_stories(): void
    {
        $mapping=json_decode(file_get_contents(resource_path('data/journal-videos.json')),true);
        $articles=json_decode(file_get_contents(resource_path('data/journal.json')),true);
        $verified=collect(json_decode(file_get_contents(base_path('research/journal-youtube-2026-09-30/verification.json')),true))->keyBy('id');
        $this->assertSame(array_column($articles,'slug'),array_keys($mapping));
        foreach($mapping as $slug=>$section){
            $response=$this->get('/journal/'.$slug)->assertOk();
            $html=$response->getContent();
            $this->assertLessThan(strpos($html,'ONE GOOD STORY LEADS TO ANOTHER'),strpos($html,'id="article-watch-title"'));
            $this->assertLessThan(strpos($html,'class="container article-photo-section"'),strpos($html,'id="article-watch-title"'));
            foreach($section['videos'] as $video){
                $this->assertSame(200,$verified[$video['id']]['oembed_status']);
                $this->assertSame('https://www.youtube.com/@indorelitfest',$video['channel_url']);
                $this->assertFileExists(public_path($video['thumbnail']));
                $response->assertSee($video['url'])->assertSee($video['title'])->assertSee($video['duration']);
            }
        }
        $this->get('/journal/ramayan-dhar-dwivedi')->assertSee('These are not the full discussion described above.');
        $this->get('/journal/day-one')->assertSee('Selected recordings of sessions mentioned in this diary');
    }
}
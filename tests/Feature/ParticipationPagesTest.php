<?php
namespace Tests\Feature;
use Tests\TestCase;
class ParticipationPagesTest extends TestCase
{
    public function test_dedicated_pages_show_client_copy_and_correct_forms(): void
    {
        $parts=json_decode(file_get_contents(resource_path('data/participation.json')),true);
        $home=$this->get('/')->assertOk();
        $sitemap=$this->get('/sitemap.xml')->assertOk();
        foreach($parts as $part){
            $path='/participate/'.$part['slug'];
            $page=$this->get($path)->assertOk()->assertSee($part['title'])->assertSee(config('festival.forms.'.$part['form'].'.url'));
            foreach(explode("\n\n",$part['copy']) as $paragraph)$page->assertSee($paragraph);
            $home->assertSee($path,false);
            $sitemap->assertSee($path,false);
        }
        $this->get('/participate/unknown')->assertNotFound();
        $this->get('/participate')->assertOk()->assertSee('id="volunteers"',false);
    }
}

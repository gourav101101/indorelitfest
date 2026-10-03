<?php
namespace Tests\Feature;
use Tests\TestCase;
class ClientGalleryTest extends TestCase
{
    public function test_client_collections_preserve_ranges_and_have_working_photos(): void
    {
        $collections=json_decode(file_get_contents(resource_path('data/gallery-collections.json')),true);
        $this->assertCount(14,$collections);
        $this->assertSame(283,array_sum(array_map(fn($c)=>count($c['photos']),$collections)));
        foreach($collections as $collection){
            $this->get('/gallery/'.$collection['slug'])->assertOk()->assertSee($collection['title']);
            $this->get('/gallery')->assertSee('/gallery/'.$collection['slug'],false);
            $this->get('/sitemap.xml')->assertSee('/gallery/'.$collection['slug'],false);
            foreach($collection['photos'] as $photo){
                $this->assertFileExists(public_path(ltrim($photo['path'],'/')));
                $this->assertFileExists(public_path(ltrim($photo['thumbnail'],'/')));
                if(isset($collection['range'])){
                    $this->assertGreaterThanOrEqual($collection['range'][0],$photo['serial']);
                    $this->assertLessThanOrEqual($collection['range'][1],$photo['serial']);
                }
            }
        }
        $this->get('/gallery/2015')->assertDontSee('14–16 NOVEMBER 2025');
        $this->get('/gallery/2025')->assertSee('139 photographs')->assertDontSee('Filter photographs by day');
        $this->get('/participate')->assertSee('/images/gallery-client/2024/158.webp',false);
    }
    public function test_exact_client_speaker_selections_and_links_are_used(): void
    {
        $selection=json_decode(file_get_contents(resource_path('data/home-speaker-selection.json')),true);
        $this->assertCount(7,$selection['homepage']);$this->assertCount(4,$selection['rotating']);
        $home=$this->get('/')->assertOk();
        foreach($selection['homepage'] as $person){$home->assertSee($person['name'])->assertSee('/speakers/past/'.$person['slug'],false);$this->assertFileExists(public_path(ltrim($person['image'],'/')));}
        $home->assertDontSee('Meet our festival voices')->assertDontSee('ilf-legacy-voice');
        foreach($selection['rotating'] as $person)$home->assertSee($person['name']);
        $home->assertSee('four-speaker-watercolor-2026.webp',false);
    }
}

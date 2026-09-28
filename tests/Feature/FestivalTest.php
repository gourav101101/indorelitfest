<?php
namespace Tests\Feature;
use Tests\TestCase;
class FestivalTest extends TestCase
{
    public function test_yearly_speaker_archives_use_profiles_instead_of_pdfs(): void
    {
        $this->get('/speakers/archive')->assertOk()->assertSee('2015 Speakers')->assertSee('2024 Speakers')->assertSee('Profiles coming soon')->assertDontSee('.pdf',false);
        $this->get('/speakers/archive/2024')->assertOk()->assertSee('23 voices to discover')->assertSee('2024 Speakers')->assertDontSee('.pdf',false);
        $this->get('/speakers/archive/2025')->assertOk()->assertSee('36 voices to discover');
        $data=json_decode(file_get_contents(resource_path('data/speakers-2024.json')),true);
        $this->assertCount(23,$data['speakers']);
        foreach($data['speakers'] as $speaker){
            $this->assertFileExists(public_path(ltrim($speaker['image'],'/')));
            $this->assertNotEmpty($speaker['paragraphs']);
            $this->get('/speakers/archive/2024/'.$speaker['slug'])->assertOk()->assertSee($speaker['name'])->assertSee('THE 2024 COLLECTION')->assertSee('/speakers/archive/2024',false)->assertDontSee('THE 2025 PROGRAMME')->assertDontSee('.pdf',false);
        }
        $this->get('/speakers/archive/2024/manoj-muntashir-shukla')->assertSee('/speakers/archive/2024/naveen-krishna-rai',false)->assertSee('/speakers/archive/2024/priya-malik',false);
        $this->get('/speakers/archive/2025/rahgir')->assertRedirect('/speakers/rahgir');
        foreach(['/speakers/archive/2015','/speakers/archive/2099','/speakers/archive/2024/unknown','/speakers/archive/2024/rahgir'] as $path)$this->get($path)->assertNotFound();
        $this->get('/sitemap.xml')->assertSee('/speakers/archive/2024/priya-malik',false);
    }
    public function test_public_pages_render_without_a_database(): void
    {
        foreach(['/', '/about', '/speakers', '/speakers/archive', '/schedule', '/journal', '/gallery', '/gallery/2025', '/gallery/2015', '/malwa', '/participate', '/contact', '/film', '/faq', '/experiences', '/visit', '/community', '/media'] as $path){
            $this->get($path)->assertOk()->assertSee('Indore Literature Festival');
        }
    }
    public function test_imported_content_has_working_detail_pages(): void
    {
        $data=json_decode(file_get_contents(resource_path('data/legacy.json')),true);
        foreach($data['speakers'] as $speaker)$this->get('/speakers/'.$speaker['slug'])->assertOk()->assertSee($speaker['name']);
        foreach($data['articles'] as $article)$this->get('/journal/'.$article['slug'])->assertOk()->assertSee(str_replace(['Day 1','Day 2','Day 3'],['पहला दिन','दूसरा दिन','तीसरा दिन'],preg_replace('/[\s–-]+$/u','',$article['title'])));
    }
    public function test_confirmed_2026_details_and_forms_are_published_without_relabelling_archives(): void
    {
        $urls=array_column(config('festival.forms'),'url');
        foreach(['/', '/participate'] as $path){
            $response=$this->get($path)->assertOk()->assertSee('27–29 November 2026')->assertDontSee('ANNOUNCEMENT AWAITED');
            foreach($urls as $url)$response->assertSee($url);
        }
        $this->get('/')->assertSee('Daly College, Indore')->assertSee('12TH EDITION')->assertSee('A legacy of remarkable voices')->assertDontSee('Dates to be announced.')->assertDontSee('11 Years of ILF');
        $this->get('/schedule')->assertSee('2025 ARCHIVE')->assertSee('application/pdf',false);
    }
    public function test_announcement_poster_is_optional_and_uses_the_configured_asset(): void
    {
        config(['festival.poster'=>null]);
        $this->get('/')->assertDontSee('class="ilf-poster',false);
        config(['festival.poster'=>'images/client-12th-edition.png']);
        $this->get('/')->assertSee('images/client-12th-edition.png')->assertSee('12th edition announcement');
    }
    public function test_unknown_resources_return_a_real_404(): void
    {
        foreach(['/missing','/speakers/unknown','/journal/unknown','/gallery/2099'] as $path)$this->get($path)->assertNotFound()->assertSee('This story took');
    }
    public function test_legacy_links_redirect_and_sitemap_is_valid(): void
    {
        $this->get('/blog.php')->assertRedirect('/journal')->assertStatus(301);
        $response=$this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type','application/xml');
        $xml=simplexml_load_string($response->getContent());
        $this->assertGreaterThan(50,count($xml->url));
    }
    public function test_all_speaker_portraits_exist(): void
    {
        $data=json_decode(file_get_contents(resource_path('data/legacy.json')),true);
        foreach($data['speakers'] as $speaker)$this->assertFileExists(public_path(ltrim($speaker['image'],'/')));
    }
    public function test_client_changes_preserve_edition_boundaries_and_gallery_order(): void
    {
        $this->get('/speakers')->assertOk()->assertSee('The Speaker List of 2026 will be out soon')->assertDontSee('36 voices to discover');
        $this->get('/gallery/archive')->assertRedirect('/gallery')->assertStatus(301);
        $this->get('/sitemap.xml')->assertDontSee('/gallery/archive',false);
        $this->get('/participate')->assertSee('id="volunteers"',false)->assertSee('id="internships"',false)->assertSee('id="stalls"',false)->assertSee('id="open-mic"',false)->assertSee('Copy form link');
        $this->get('/schedule')->assertSee('data-flipbook',false)->assertSee('page-7.webp');
        $photos=json_decode(file_get_contents(resource_path('data/gallery-2025.json')),true);
        $html=$this->get('/gallery/2025')->assertOk()->getContent();
        $last=-1;
        foreach($photos as $photo){$position=strpos($html,'data-lightbox="'.asset(preg_replace('/\.(jpeg|jpg|png)$/i','.webp',ltrim($photo['path'],'/'))).'"');$this->assertNotFalse($position);$this->assertGreaterThan($last,$position);$last=$position;}
        foreach(json_decode(file_get_contents(resource_path('data/speakers-2024.json')),true)['speakers'] as $speaker){$this->assertNotEmpty($speaker['hindi']);$this->assertNotEmpty($speaker['paragraphs']);}
    }
    public function test_prominent_voices_have_valid_bilingual_profiles_without_invented_years(): void
    {
        $links=json_decode(file_get_contents(resource_path('data/prominent-speaker-links.json')),true);
        $this->assertCount(50,$links);
        $this->assertCount(50,array_unique(array_column($links,'path')));
        foreach($links as $person)$this->get($person['path'])->assertOk()->assertSee('bio-hi-tab');
        $this->get('/speakers/past/ruskin-bond')->assertSee('OUR PAST SPEAKERS')->assertSee('Biography source')->assertDontSee('2025 EDITION')->assertDontSee('.pdf',false);
        $this->get('/speakers/past/unknown')->assertNotFound();
        $this->get('/speakers/shalini-modi')->assertSee('bio-hi-tab')->assertSee('/speakers/archive/2025');
    }
}

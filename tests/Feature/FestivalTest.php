<?php
namespace Tests\Feature;
use Tests\TestCase;
class FestivalTest extends TestCase
{
    public function test_public_pages_render_without_a_database(): void
    {
        foreach(['/', '/about', '/speakers', '/speakers/archive', '/schedule', '/journal', '/gallery', '/gallery/2025', '/gallery/2015', '/gallery/archive', '/malwa', '/participate', '/contact', '/film', '/faq', '/experiences', '/visit', '/community', '/media'] as $path){
            $this->get($path)->assertOk()->assertSee('Indore Literature Festival');
        }
    }
    public function test_imported_content_has_working_detail_pages(): void
    {
        $data=json_decode(file_get_contents(resource_path('data/legacy.json')),true);
        foreach($data['speakers'] as $speaker)$this->get('/speakers/'.$speaker['slug'])->assertOk()->assertSee($speaker['name']);
        foreach($data['articles'] as $article)$this->get('/journal/'.$article['slug'])->assertOk()->assertSee(preg_replace('/[\s–-]+$/u','',$article['title']));
    }
    public function test_confirmed_2026_details_and_forms_are_published_without_relabelling_archives(): void
    {
        $urls=['https://forms.gle/by5xS5RTGjEJfMBFA','https://forms.gle/htJKDyAMbKi6erHh9','https://forms.gle/SH2gXWhEKokRSwEA6','https://forms.gle/BkTuSAir9gymZU9P6','https://forms.gle/UTP3dukT4reDac867'];
        foreach(['/', '/participate'] as $path){
            $response=$this->get($path)->assertOk()->assertSee('27–29 November 2026')->assertDontSee('ANNOUNCEMENT AWAITED');
            foreach($urls as $url)$response->assertSee($url);
        }
        $this->get('/')->assertSee('Daly College, Indore')->assertSee('12TH EDITION')->assertSee('From our 2025 edition')->assertDontSee('Dates to be announced.')->assertDontSee('11 Years of ILF');
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
}

<?php
namespace Tests\Feature;

use App\Support\SpeakerDirectory;
use Tests\TestCase;

class SpeakerDirectoryTest extends TestCase
{
    public function test_all_profiles_are_reachable_without_page_duplicates(): void
    {
        $first=$this->get('/speakers/archive')->assertOk()->viewData('directory');
        $this->assertSame(144,$first->total());
        $paths=[]; $slugs=[];
        foreach(range(1,$first->lastPage()) as $page){
            $directory=$this->get('/speakers/archive?page='.$page)->assertOk()->viewData('directory');
            foreach($directory as $person){
                $this->assertNotContains($person['profile_url'],$paths);
                $this->assertNotContains($person['slug'],$slugs);
                $paths[]=$person['profile_url']; $slugs[]=$person['slug'];
            }
        }
        $all=$this->get('/speakers/archive?view=all')->assertOk()->viewData('directory');
        $this->assertCount(144,$all);
        $this->assertSame($paths,array_column($all->items(),'profile_url'));
        foreach($all as $person){
            $response=$this->get($person['profile_path'])->assertOk()->assertSee($person['name']);
            $this->assertSame($person['years'],$response->viewData('speaker')['years']);
            $response->assertSee('href="'.$person['profile_url'].'"',false);
            foreach($person['years'] as $year)$response->assertSee('href="'.route('speakers.year',$year).'"',false);
            if($person['image'])$this->assertFileExists(public_path(ltrim($person['image'],'/')));
            else $response->assertSee('past-voice-monogram')->assertDontSee('<img src=""',false);
        }
    }

    public function test_all_eleven_seasons_match_the_client_roster(): void
    {
        $counts=[2015=>21,2016=>12,2017=>13,2018=>8,2019=>18,2020=>14,2021=>23,2022=>14,2023=>14,2024=>18,2025=>33];
        $records=new SpeakerDirectory();
        $this->assertSame($counts,$records->yearCounts());
        $this->assertSame(188,array_sum($counts));
        foreach($records->attendance()['seasons'] as $season){
            $year=$season['year'];
            $expected=array_column($season['speakers'],'slug');
            $this->assertCount($counts[$year],array_unique($expected));
            $collection=$this->get('/speakers/archive/'.$year)->assertOk()->assertSee($counts[$year].' voices to discover');
            $this->assertSame($expected,array_column($collection->viewData('speakers'),'slug'));
            $filtered=$this->get('/speakers/archive?year='.$year.'&view=all')->assertOk()->viewData('directory');
            $this->assertEqualsCanonicalizing($expected,array_column($filtered->items(),'slug'));
            foreach($filtered as $person)$this->assertContains($year,$person['years']);
        }
        $this->get('/speakers/archive')->assertDontSee('Profiles coming soon')->assertDontSee('year unconfirmed');
        $this->get('/speakers')->assertSee('The Speaker List of 2026 will be out soon');
    }

    public function test_repeat_speakers_share_years_and_one_profile(): void
    {
        $records=new SpeakerDirectory();
        foreach([
            'uday'=>[2017,2020,2021,2025],
            'mamta-kalia'=>[2015,2018,2021],
            'tarek-fatah'=>[2015,2016,2019],
            'manoj-muntashir-shukla'=>[2015,2016,2017,2024],
            'neelotpal-mrinal'=>[2017,2019,2020,2021,2024],
            'manoj-rajan-tripathi'=>[2021,2024,2025],
            'laxmi-narayan-tripathi'=>[2015,2019,2024],
            'aman-akshar'=>[2024,2025],
        ] as $slug=>$years)$this->assertSame($years,$records->find($slug)['years']);
        $this->assertSame($records->find('manoj-rajan-tripathi'),$records->find('manoj-ranjan-tripathi'));
        $this->get('/speakers/manoj-ranjan-tripathi')->assertOk()->assertSee('Manoj Rajan Tripathi')->assertSee('3 editions');
        $this->get('/speakers/archive/2024/manoj-rajan-tripathi')->assertOk()->assertSee('3 editions');
        $this->get('/speakers/archive?q=Manoj%20Rajan&view=all')->assertOk()->assertSee('1–1 of 1 profiles');
        $this->get('/speakers/archive?q=Aman%20Axar&year=2025')->assertOk()->assertSee('Aman Axar');
        $this->get('/speakers/archive?q=Psychoshayar')->assertOk()->assertSee('Abhi Munde');
        // Similar names remain separate without an identity confirmation.
        $this->assertSame([2016],$records->find('amish-tripathi')['years']);
        $this->assertSame([2020],$records->find('amishy-tripathi')['years']);
        $this->assertSame([2020],$records->find('manisha-kulshreshth')['years']);
        $this->assertSame([2023],$records->find('manish-kulshreshth')['years']);
    }

    public function test_cards_include_years_and_filters_keep_their_state(): void
    {
        $response=$this->get('/speakers/archive?q=Uday&year=2020')->assertOk();
        $dom=new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML('<?xml encoding="utf-8" ?>'.$response->getContent());
        $xp=new \DOMXPath($dom);
        $this->assertSame(1,$xp->query('//a[contains(concat(" ",normalize-space(@class)," ")," speaker-card ")]')->length);
        $years=[];
        foreach($xp->query('//span[@class="speaker-year"]') as $year)$years[]=(int)$year->textContent;
        $this->assertSame([2017,2020,2021,2025],$years);
        $this->assertSame('2020',$xp->query('//span[@class="speaker-year"][@data-selected="true"]')->item(0)->textContent);
        $this->get('/speakers/archive?year=2025&page=2')->assertOk()->assertSee('25–33 of 33 profiles')->assertSee('year=2025',false);
        $this->get('/speakers/archive?q=zzzznoresult')->assertOk()->assertSee('No profiles found');
        $this->get('/speakers/archive?year=2099')->assertNotFound();
        $this->get('/speakers/archive/2099')->assertNotFound();
        $this->get('/speakers/archive/2024/rahgir')->assertNotFound();
        $this->get('/speakers/archive?year=earlier')->assertRedirect('/speakers/archive');
    }

    public function test_existing_archived_profiles_and_biographies_are_preserved(): void
    {
        $records=new SpeakerDirectory();
        $collections=[
            ['path'=>'/speakers/', 'people'=>json_decode(file_get_contents(resource_path('data/legacy.json')),true)['speakers']],
            ['path'=>'/speakers/archive/2024/', 'people'=>json_decode(file_get_contents(resource_path('data/speakers-2024.json')),true)['speakers']],
            ['path'=>'/speakers/past/', 'people'=>json_decode(file_get_contents(resource_path('data/past-speakers.json')),true)],
        ];
        foreach($collections as $collection)foreach($collection['people'] as $old){
            $person=$records->find($old['slug']);
            $response=$this->get($collection['path'].$old['slug'])->assertOk()->assertSee($person['name']);
            $this->assertNotEmpty($response->viewData('speaker')['paragraphs']);
            if($old['image'])$this->assertNotEmpty($person['image']);
        }
        $this->assertSame([],$records->find('amrut-deshmukh')['years']);
        $this->assertSame([],$records->find('kishwar-naheed')['years']);
        $this->get('/speakers/archive?year=2024&view=all')->assertDontSee('Amrut Deshmukh');
        $this->get('/sitemap.xml')->assertSee('/speakers/archive/2015',false)->assertSee('/speakers/past/ram-madhav',false);
    }
}

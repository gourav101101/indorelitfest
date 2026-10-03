<?php
namespace Tests\Feature;

use App\Support\SpeakerDirectory;
use Tests\TestCase;

class SpeakerBiographyTest extends TestCase
{
    public function test_researched_introductions_are_bilingual_and_attributed_on_profiles(): void
    {
        $introductions = json_decode(file_get_contents(resource_path('data/speaker-biographies.json')), true, 512, JSON_THROW_ON_ERROR);
        $directory = new SpeakerDirectory();
        foreach ($introductions as $slug => $introduction) {
            $person = $directory->find($slug);
            $this->assertNotNull($person, $slug);
            $this->assertSame($introduction['paragraphs'], $person['paragraphs'], $slug);
            $this->assertSame($introduction['hindi'], $person['hindi'], $slug);
            $this->assertMatchesRegularExpression('/[\\x{0900}-\\x{097F}]/u', implode(' ', $person['hindi']));
            $this->assertStringStartsWith('https://', $person['source']);
            $this->get($person['profile_path'])->assertOk()
                ->assertSee($introduction['paragraphs'][0])
                ->assertSee($introduction['hindi'][0])
                ->assertSee($introduction['source'])
                ->assertSee('Biography source');
        }
        // An uncertain identity must not inherit the biography of the similarly named person.
        $this->assertEmpty($directory->find('amishy-tripathi')['paragraphs']);
        $this->assertEmpty($directory->find('manish-kulshreshth')['paragraphs']);
        $this->assertSame([2020], $directory->find('manisha-kulshreshth')['years']);
        $this->assertSame([2023], $directory->find('manish-kulshreshth')['years']);
    }
}

<?php
namespace App\Support;

final class SpeakerDirectory
{
    private ?array $records = null;
    private ?array $attendance = null;

    public function attendance(): array
    {
        return $this->attendance ??= json_decode(file_get_contents(resource_path('data/speaker-attendance.json')), true, 512, JSON_THROW_ON_ERROR);
    }

    public function all(): array
    {
        if ($this->records !== null) return $this->records;
        $roster = $this->attendance();
        $aliases = [];
        foreach ($roster['identities'] as $slug => $identity) {
            foreach ($identity['legacy_slugs'] ?? [] as $alias) $aliases[$alias] = $slug;
        }
        $past = json_decode(file_get_contents(resource_path('data/past-speakers.json')), true, 512, JSON_THROW_ON_ERROR);
        $brochure = json_decode(file_get_contents(resource_path('data/speakers-2024.json')), true, 512, JSON_THROW_ON_ERROR)['speakers'];
        $legacy = json_decode(file_get_contents(resource_path('data/legacy.json')), true, 512, JSON_THROW_ON_ERROR)['speakers'];
        $editorial = require resource_path('data/editorial.php');
        $records = [];
        // Prefer the latest existing biography, while retaining aliases and older routes.
        foreach ([['people'=>$past, 'kind'=>'past'], ['people'=>$brochure, 'kind'=>'2024'], ['people'=>$legacy, 'kind'=>'2025']] as $collection) {
            foreach ($collection['people'] as $person) {
                $originalSlug = $person['slug'];
                $slug = $aliases[$originalSlug] ?? $originalSlug;
                $previous = $records[$slug] ?? [];
                $person['slug'] = $slug;
                $person['aliases'] = array_values(array_unique(array_merge($previous['aliases'] ?? [], [$person['name'], $originalSlug])));
                $person['slug_aliases'] = array_values(array_unique(array_merge($previous['slug_aliases'] ?? [], [$originalSlug], $roster['identities'][$slug]['legacy_slugs'] ?? [])));
                $person['hindi'] = $person['hindi'] ?? [];
                $person['role'] = $editorial['roles'][$originalSlug] ?? $person['role'] ?? '';
                $person['years'] = [];
                $person['biography_year'] = $collection['kind'] === 'past' ? null : (int)$collection['kind'];
                $person['profile_path'] = match ($collection['kind']) {
                    '2025' => '/speakers/'.$slug,
                    '2024' => '/speakers/archive/2024/'.$slug,
                    default => '/speakers/past/'.$slug,
                };
                if ($slug === 'shalini-modi') {
                    $person['hindi'] = array_values(array_filter($person['paragraphs'], fn($p)=>preg_match('/[\\x{0900}-\\x{097F}]/u',$p)));
                    $person['paragraphs'] = array_values(array_filter($person['paragraphs'], fn($p)=>!preg_match('/[\\x{0900}-\\x{097F}]/u',$p)));
                }
                if ($slug === 'vivek-chaturvedi') $person['paragraphs'] = array_values(array_filter($person['paragraphs'], fn($p)=>!str_starts_with($p,'Ms. Divya Mathur')));
                $records[$slug] = $person;
            }
        }
        foreach ($roster['identities'] as $slug => $identity) {
            $records[$slug] ??= ['slug'=>$slug, 'role'=>'', 'image'=>null, 'paragraphs'=>[], 'hindi'=>[], 'aliases'=>[], 'slug_aliases'=>[], 'years'=>[], 'biography_year'=>null, 'profile_path'=>'/speakers/past/'.$slug];
            $records[$slug]['name'] = $identity['name'];
            $records[$slug]['aliases'] = array_values(array_unique(array_merge($records[$slug]['aliases'], $identity['aliases'] ?? [])));
        }
        foreach ($roster['seasons'] as $season) {
            foreach ($season['speakers'] as $entry) {
                $records[$entry['slug']]['years'][] = $season['year'];
                $records[$entry['slug']]['aliases'][] = $entry['name'];
            }
        }
        // Researched introductions fill gaps without replacing client biographies or identities.
        $introductions = json_decode(file_get_contents(resource_path('data/speaker-biographies.json')), true, 512, JSON_THROW_ON_ERROR);
        foreach ($introductions as $slug => $introduction) {
            if (isset($records[$slug]) && empty($records[$slug]['paragraphs'])) {
                foreach (['paragraphs', 'hindi', 'source', 'source_credit'] as $field) {
                    $records[$slug][$field] = $introduction[$field];
                }
                if (empty($records[$slug]['role'])) $records[$slug]['role'] = $introduction['role'];
            }
        }
        // These are already labelled, client-supplied portraits used on the homepage.
        $selection = json_decode(file_get_contents(resource_path('data/home-speaker-selection.json')), true, 512, JSON_THROW_ON_ERROR);
        foreach ($selection['homepage'] as $choice) {
            if (isset($records[$choice['slug']])) $records[$choice['slug']]['image'] = $choice['image'];
        }
        foreach ($records as &$person) {
            $person['years'] = array_values(array_unique($person['years']));
            sort($person['years']);
            $person['year'] = $person['years'] ? max($person['years']) : null;
            $person['aliases'] = array_values(array_unique($person['aliases']));
            $person['profile_url'] = url($person['profile_path']);
            $person['search_text'] = mb_strtolower(implode(' ', array_merge([$person['name'], $person['slug'], $person['role']], $person['aliases'], $person['hindi'], $person['years'])));
        }
        unset($person);
        return $this->records = $records;
    }

    public function confirmed(): array
    {
        $people = array_values(array_filter($this->all(), fn($person)=>count($person['years']) > 0));
        usort($people, fn($a,$b)=>(max($b['years']) <=> max($a['years'])) ?: strcasecmp($a['name'],$b['name']));
        return $people;
    }

    public function find(string $slug): ?array
    {
        $people = $this->all();
        if (isset($people[$slug])) return $people[$slug];
        foreach ($people as $person) if (in_array($slug, $person['slug_aliases'], true)) return $person;
        return null;
    }

    public function forYear(int $year): array
    {
        $all = $this->all();
        foreach ($this->attendance()['seasons'] as $season) {
            if ($season['year'] === $year) return array_map(fn($entry)=>$all[$entry['slug']], $season['speakers']);
        }
        return [];
    }

    public function yearCounts(): array
    {
        $counts = [];
        foreach ($this->attendance()['seasons'] as $season) $counts[$season['year']] = count($season['speakers']);
        return $counts;
    }
}

<?php
namespace App\Support;

final class JournalArticle
{
    /** Keep the imported source intact; clean only redundant presentation text. */
    public static function forDisplay(array $article): array
    {
        $label = static fn(string $text): string => trim(preg_replace('/[\s\x{2013}\x{2014}-]+$/u', '', $text));
        $article['title'] = $label($article['title']);
        $blocks = $article['blocks'];
        while ($blocks) {
            $first = $label($blocks[0]['text']);
            $isTitle = $first === $article['title'];
            // The Rahgir source repeats just the name before its subtitle.
            $isName = $article['slug'] === 'rahagir' && $first === explode(' – ', $article['title'])[0];
            if (!$isTitle && !$isName) break;
            array_shift($blocks);
        }
        $clean = [];
        foreach ($blocks as $block) {
            if ($clean && end($clean)['text'] === $block['text']) continue;
            $clean[] = $block;
        }
        $article['blocks'] = $clean;
        $article['paragraphs'] = array_column($clean, 'text');
        return $article;
    }
}
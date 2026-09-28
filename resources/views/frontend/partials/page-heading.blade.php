@php
    $chapterArt = in_array($page ?? '', ['malwa', 'visit']) ? 'mandu-hero-scene-v2.webp' : 'rajwada-daly-hero-2026.webp';
@endphp
<section class="page-heading chapter-hero">
    <nav class="chapter-breadcrumb container" aria-label="Breadcrumb"><a href="{{ route('home') }}">Home</a><span aria-hidden="true">/</span><span aria-current="page">{{ $label ?? $title }}</span></nav>
    <svg class="chapter-canopy" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 520C140 520 196 449 216 346C230 272 203 206 279 190C317 183 339 194 362 211C340 145 388 103 438 118C476 130 502 132 526 147C508 97 551 57 596 72C651 90 699 58 720 24C741 58 789 90 844 72C889 57 932 97 914 147C938 132 964 130 1002 118C1052 103 1100 145 1078 211C1101 194 1123 183 1161 190C1237 206 1210 272 1224 346C1244 449 1300 520 1460 520V560H-20Z" fill="#fffdf8" stroke="#d8735c" stroke-width="18"/><path d="M-20 520C140 520 196 449 216 346C230 272 203 206 279 190C317 183 339 194 362 211C340 145 388 103 438 118C476 130 502 132 526 147C508 97 551 57 596 72C651 90 699 58 720 24C741 58 789 90 844 72C889 57 932 97 914 147C938 132 964 130 1002 118C1052 103 1100 145 1078 211C1101 194 1123 183 1161 190C1237 206 1210 272 1224 346C1244 449 1300 520 1460 520" fill="none" stroke="#f6bc32" stroke-width="7"/></svg>
    <div class="chapter-copy">
        <p class="eyebrow">{{ $kicker ?? 'INDORE LITERATURE FESTIVAL' }}</p>
        <h1>{{ $title }}</h1>
        @isset($intro)<p class="intro">{{ $intro }}</p>@endisset
        <span class="chapter-flourish" aria-hidden="true">✦</span>
    </div>
    <div class="chapter-art" aria-hidden="true"><img class="chapter-art-left" src="{{ asset('images/'.$chapterArt) }}" width="2172" height="724" alt=""><img class="chapter-art-right" src="{{ asset('images/'.$chapterArt) }}" width="2172" height="724" alt=""></div>
</section>

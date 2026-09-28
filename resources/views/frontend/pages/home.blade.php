@extends('frontend.layouts.app')
@section('content')
@php
    $registration = $festival['forms'][0]['url'];
@endphp
<div class="ilf-home">
    @include('frontend.partials.ilf-ornaments')
    <section class="ilf-hero" aria-labelledby="ilf-title">
        <div class="ilf-hero-sky" aria-hidden="true">
            <img class="ilf-hero-people is-current" data-hero-scene="0" src="{{ $image('images/rajwada-daly-hero-2026.webp') }}" alt="" width="2171" height="724" fetchpriority="high">
            <svg class="ilf-hero-mark ilf-hero-mark-book" viewBox="0 0 64 64" fill="none"><path d="M9 17q12-4 23 4 11-8 23-4v32q-12-4-23 4-11-8-23-4Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M32 21v32M15 25q6-1 11 3M15 33q6-1 11 3M38 28q5-4 11-3M38 36q5-4 11-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <svg class="ilf-hero-mark ilf-hero-mark-pen" viewBox="0 0 64 64" fill="none"><path d="m15 49 8-26L49 9l-6 28-28 12Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="m15 49 17-17M32 32l17-23" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="4" fill="currentColor"/></svg>
            
        </div>
        <svg class="ilf-hero-arch" viewBox="0 -16 1440 776" preserveAspectRatio="none" stroke-linejoin="round" aria-hidden="true"><path d="M-20 725 C160 720 344 666 407 550 C449 474 416 366 467 328 C494 309 518 314 539 324 C510 273 525 212 576 205 C602 201 620 211 635 224 C610 171 638 119 675 97 C702 79 716 49 720 30 C724 49 738 79 765 97 C802 119 830 171 805 224 C820 211 838 201 864 205 C915 212 930 273 901 324 C922 314 946 309 973 328 C1024 366 991 474 1033 550 C1096 666 1280 720 1460 725 L1460 800 L-20 800Z" fill="#fffdf8" stroke="#d8735c" stroke-width="30"/><path d="M-20 725 C160 720 344 666 407 550 C449 474 416 366 467 328 C494 309 518 314 539 324 C510 273 525 212 576 205 C602 201 620 211 635 224 C610 171 638 119 675 97 C702 79 716 49 720 30 C724 49 738 79 765 97 C802 119 830 171 805 224 C820 211 838 201 864 205 C915 212 930 273 901 324 C922 314 946 309 973 328 C1024 366 991 474 1033 550 C1096 666 1280 720 1460 725" fill="none" stroke="#f6bc32" stroke-width="13"/></svg>
        <div class="ilf-hero-content">
            <img class="ilf-hero-logo" src="{{ asset('images/indore-literature-festival-badge.png') }}" alt="Indore Literature Festival" width="160" height="160">
            <p class="ilf-edition-label">12TH EDITION</p>
            <p class="ilf-hero-date">{{ $festival['dates'] }}</p>
            <p class="ilf-hero-venue">{{ $festival['venue'] }}</p>
            <h1 id="ilf-title"><span>Let the legacy of</span>literature grow.</h1>
            <p class="ilf-hero-hindi" lang="hi">साहित्य, संस्कृति और संवाद का उत्सव</p>
            <div class="ilf-countdown" data-ilf-target="2026-11-27T00:00:00+05:30" aria-label="Countdown to the festival">
                <p class="ilf-countdown-label">The festival begins in</p>
                <div class="ilf-countdown-blocks">
                    <div class="ilf-countdown-block" data-unit="days"><span>--</span><small>Days</small></div>
                    <span class="ilf-countdown-sep" aria-hidden="true">:</span>
                    <div class="ilf-countdown-block" data-unit="hours"><span>--</span><small>Hours</small></div>
                    <span class="ilf-countdown-sep" aria-hidden="true">:</span>
                    <div class="ilf-countdown-block" data-unit="minutes"><span>--</span><small>Mins</small></div>
                    <span class="ilf-countdown-sep" aria-hidden="true">:</span>
                    <div class="ilf-countdown-block ilf-countdown-seconds" data-unit="seconds"><span>--</span><small>Secs</small></div>
                </div>
            </div>
            <a class="ilf-button" href="{{ $registration }}">Register to Attend <span aria-hidden="true">➜</span></a>
        </div>
    </section>

    @if($festival['poster'])
    <section class="ilf-poster ilf-wrap" aria-label="12th edition announcement"><img src="{{ asset($festival['poster']) }}" alt="12th Indore Literature Festival — 27–29 November 2026, Daly College, Indore" loading="lazy"></section>
    @endif

    @include('frontend.partials.ilf-explorer')

    <section id="festival" class="ilf-about ilf-section">
        <img class="ilf-rajwada-accent" src="{{ asset('images/rajwada-linework.svg') }}" width="260" height="350" alt="" aria-hidden="true" loading="lazy">
        <img class="ilf-food-ornament ilf-food-jalebi ilf-food-about" src="{{ asset('images/indore-jalebi-ornament.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
        <svg class="ilf-flower about-flower-one" aria-hidden="true"><use href="#ilf-flower"/></svg>
        <svg class="ilf-flower about-flower-two" aria-hidden="true"><use href="#ilf-flower"/></svg>
        @include('frontend.partials.ilf-heading',['overline'=>'About the','heading'=>'Festival'])
        <div class="ilf-prose">
            <h3>Eleven editions. An enduring literary legacy.</h3>
            <p>Since 2015, Indore Literature Festival has brought writers, poets, artists and readers together to celebrate literature and exchange ideas. From conversations and debates to poetry, storytelling, theatre and music, the festival makes room for different voices and new perspectives.</p>
            <p>Organised by the Indore Literary Program Organizing Society, ILF nurtures a love for art and literature, especially among young people. Join us for the <strong>12th edition at {{ $festival['venue'] }}, from {{ $festival['dates'] }}</strong>—three days of discovery, expression and shared stories.</p>
            <a class="ilf-text-link" href="{{ route('about') }}">More about our story <span aria-hidden="true">➜</span></a>
        </div>
        <a class="ilf-film-card ilf-wrap" href="{{ $festival['journey_youtube'] ?: $festival['youtube'] }}" aria-label="{{ $festival['journey_youtube'] ? 'Watch the eleven-year festival journey on YouTube' : 'Explore festival recordings on YouTube' }}">
            <img src="{{ $image('legacy/images/slideshow-main/6.jpg') }}" alt="An on-stage conversation from the Indore Literature Festival archive" width="1200" height="650" loading="lazy">
            <span class="ilf-film-shade"></span><span class="ilf-play" aria-hidden="true">▶</span>
            <span class="ilf-film-caption"><small>ELEVEN YEARS OF LITERATURE</small><strong>{{ $festival['journey_youtube'] ? 'Our journey. Our shared story.' : 'The conversations live on.' }}</strong><span>{{ $festival['journey_youtube'] ? 'Watch the journey film on YouTube ↗' : 'Explore the festival channel on YouTube ↗' }}</span></span>
        </a>
    </section>

    <div class="ilf-story-transition" aria-hidden="true">
        <svg viewBox="0 0 1600 180" preserveAspectRatio="none" focusable="false">
            <defs><pattern id="ilf-weave" width="32" height="20" patternUnits="userSpaceOnUse"><path d="m0 10 8-6 8 6-8 6Zm16 0 8-6 8 6-8 6Z" fill="none" stroke="#c59a58" stroke-width="1" opacity=".5"/></pattern></defs>
            <path d="M0 75C240 160 370 20 650 94S1140 148 1600 56V180H0Z" fill="#eee1c9"/>
            <path d="M0 75C240 160 370 20 650 94S1140 148 1600 56" fill="none" stroke="#c6aa76" stroke-width="2"/>
            <path d="M0 103C270 165 405 53 700 116S1230 130 1600 89V180H0Z" fill="#f5ead8"/>
            <path d="M0 103C270 165 405 53 700 116S1230 130 1600 89" fill="none" stroke="#73958a" stroke-width="3"/>
            <path d="M0 109C270 171 405 59 700 122S1230 136 1600 95L1600 111C1230 152 980 201 700 138S270 187 0 125Z" fill="url(#ilf-weave)"/>
        </svg>
    </div>
    <section id="registration" class="ilf-join ilf-section" aria-labelledby="join-heading">
        <img class="ilf-join-art" src="{{ $image('images/participation-real-collage.webp') }}" width="2400" height="800" alt="" aria-hidden="true" loading="lazy">
        <div class="ilf-heading"><h2 id="join-heading"><span>JOIN THE 12TH EDITION</span><strong>Be part of the festival</strong></h2></div>
        <p class="ilf-intro">Come as a reader. Share your voice. Help make it happen.</p>
        <div class="ilf-join-wrap ilf-wrap">
            <article class="ilf-attend-card">
                <div><h3>Attend the festival</h3><p>Three days of books, conversations and discovery.</p><p class="ilf-attend-details"><strong>{{ $festival['dates'] }}</strong><span>{{ $festival['venue'] }}</span></p></div>
                <a class="ilf-button" href="{{ $registration }}">Register to Attend <span aria-hidden="true">&#8594;</span></a>
            </article>
            <div class="ilf-join-options">
            @foreach(array_slice($festival['forms'],1) as $i=>$form)
                <article class="ilf-join-option">
                    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                    @if($i===0)<rect x="12" y="3" width="8" height="16" rx="4"/><path d="M8 14v2a8 8 0 0 0 16 0v-2M16 24v5m-5 0h10"/>
                    @elseif($i===1)<path d="M4 13 7 5h18l3 8M6 16v12h20V16M3 13q3 6 7 0 3 6 6 0 3 6 6 0 4 6 7 0M12 28v-9h8v9"/>
                    @elseif($i===2)<circle cx="16" cy="9" r="4"/><path d="M8 28v-6a8 8 0 0 1 16 0v6M5 7a3 3 0 0 0 0 6M27 7a3 3 0 0 1 0 6M3 24v-5q0-3 4-3m22 8v-5q0-3-4-3"/>
                    @else<path d="M3 7q7-3 13 2 6-5 13-2v19q-7-3-13 2-6-5-13-2ZM16 9v19M7 13h5m8 0h5M7 18h5m8 0h5"/>
                    @endif
                    </svg>
                    <h3>{{ ['Open Mic','Book a Stall','Volunteer','Internship'][$i] }}</h3>
                    <p>{{ ['Bring your poetry, stories or spoken word to the stage.','Introduce your books, products or creative work.','Welcome our community and support the festival team.','Learn behind the scenes and contribute to the festival.'][$i] }}</p>
                    <a class="ilf-text-link" href="{{ $form['url'] }}">{{ ['Apply for Open Mic','Enquire About a Stall','Become a Volunteer','Apply for an Internship'][$i] }} <span aria-hidden="true">&#8594;</span></a>
                </article>
            @endforeach
            </div>
        </div>
    </section>

    <section id="voices" class="ilf-voices ilf-section">
        <img class="ilf-food-ornament ilf-food-jalebi ilf-food-voices" src="{{ asset('images/indore-jalebi-ornament.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
        @include('frontend.partials.ilf-heading',['overline'=>'A legacy of remarkable voices','heading'=>'Festival voices'])
        <p class="ilf-intro">Since 2015, writers, poets, artists and thinkers have made this a meeting place for ideas. Revisit voices from across our editions, and look ahead to the next chapter.</p>
        <div class="ilf-speakers ilf-wrap">
            @foreach($featuredSpeakers as $speaker)
            <a href="{{ ($speaker['year'] ?? 2025) === 2024 ? route('speakers.archive.profile',[2024,$speaker['slug']]) : route('speaker',$speaker['slug']) }}" class="ilf-speaker"><div><img src="{{ $image($speaker['image']) }}" alt="{{ $speaker['name'] }}" width="360" height="420" loading="lazy" @if($speaker['slug']==='paritosh-tripathi') style="object-position:center top" @endif></div><small class="ilf-speaker-edition">{{ $speaker['year'] ?? 2025 }} EDITION</small><h3>{{ $speaker['name'] }}</h3><p>{{ $speaker['role'] }}</p></a>
            @endforeach
        </div><div class="voices-actions"><a class="ilf-button" href="{{ route('speakers.archive') }}">Our Past Speakers ➜</a><a class="ilf-text-link" href="{{ route('speakers') }}">2026 Speakers ↗</a></div>
    </section>

    @include('frontend.partials.ilf-discovery-sections')

    @include('frontend.partials.ilf-media-sections')

    <section id="journal" class="ilf-journal ilf-section">
        <img class="ilf-food-ornament ilf-food-poha ilf-food-journal" src="{{ asset('images/indore-poha-ornament-v2.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
        @include('frontend.partials.ilf-heading',['overline'=>'Stories beyond the stage','heading'=>'Festival journal'])
        <p class="ilf-intro">Return to the ideas, encounters and memorable conversations of the festival. Read our diaries and reflections, in the words and languages that make our literary community its own.</p>
        <div class="ilf-journal-grid ilf-wrap">@foreach(array_slice($articles,0,3) as $article)@include('frontend.partials.article-card')@endforeach</div>
        <a class="ilf-button" href="{{ route('journal') }}">Read More Stories <span aria-hidden="true">➜</span></a>
    </section>
    <section class="ilf-final-invite"><svg class="ilf-flower" aria-hidden="true"><use href="#ilf-flower"/></svg><div><p>THE 12TH INDORE LITERATURE FESTIVAL</p><h2>Let’s turn the next page. Together.</h2><span>{{ $festival['dates'] }} · {{ $festival['venue'] }}</span></div><a class="ilf-button" href="{{ $registration }}">Register to Attend <span aria-hidden="true">➜</span></a></section>
</div>
@endsection

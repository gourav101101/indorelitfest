@extends('frontend.layouts.app')
@section('content')
@php
    $collectionYear = $archiveYear ?? $speaker['year'];
    $directoryUrl = isset($archiveYear) ? route('speakers.year',$archiveYear) : route('speakers.archive');
@endphp
<div class="detail-chapter-bar"><div class="container"><a href="{{ $directoryUrl }}">&#8592; The festival voices</a><span>{{ isset($archiveYear) ? 'THE '.$archiveYear.' COLLECTION' : 'OUR PAST SPEAKERS' }}</span></div></div>
<section class="container section profile">
    <div class="profile-photo">
        @if($speaker['image'])
        <img src="{{ $image($speaker['image']) }}" alt="{{ $speaker['name'] }}" width="500" height="600">
        @isset($speaker['portrait'])<p class="biography-source">Portrait: {{ $speaker['portrait']['credit'] }} &middot; <a href="{{ $speaker['portrait']['source'] }}" target="_blank" rel="noopener">Wikimedia Commons</a> &middot; <a href="{{ $speaker['portrait']['license_url'] }}" target="_blank" rel="noopener">{{ $speaker['portrait']['license'] }}</a>. {{ $speaker['portrait']['changes'] }}</p>@endisset
        @else
        <div class="past-voice-monogram" aria-hidden="true">{{ collect(explode(' ',$speaker['name']))->filter()->map(fn($word)=>mb_substr($word,0,1))->take(2)->implode('') }}</div>
        @endif
        <span class="eyebrow">A VOICE FROM OUR FESTIVAL HISTORY</span>
        @if(in_array(2025,$speaker['years'],true) && !isset($archiveYear))
        <a class="profile-schedule" href="{{ route('schedule') }}"><span>THE 2025 PROGRAMME</span><strong>Find the conversations &#8599;</strong></a>
        @endif
    </div>
    <article>
        <h1>{{ $speaker['name'] }}</h1><p class="profile-role">{{ $speaker['role'] ?: 'Festival voice' }}</p>
        @if(count($speaker['years']))
        <section class="profile-appearances" aria-labelledby="appearance-heading">
            <div class="profile-appearances-heading"><h2 id="appearance-heading">At Indore Literature Festival</h2><span>{{ count($speaker['years']) }} {{ count($speaker['years'])===1 ? 'edition' : 'editions' }}</span></div>
            <div class="profile-year-links">
                @foreach($speaker['years'] as $appearanceYear)
                <a href="{{ route('speakers.year',$appearanceYear) }}" aria-label="Explore Season {{ $appearanceYear-2014 }}, {{ $appearanceYear }} speakers"><strong>{{ $appearanceYear }}</strong><span>Season {{ $appearanceYear-2014 }} &#8599;</span></a>
                @endforeach
            </div>
        </section>
        @endif
        @if(count($speaker['paragraphs']))
        <div class="short-rule"></div>
        @if($speaker['biography_year'])<p class="muted">Biography from the {{ $speaker['biography_year'] }} festival collection.</p>@endif
        @if(count($speaker['hindi']))
        <div class="language-tabs" role="tablist" aria-label="Biography language" data-language-tabs>
            <button id="bio-en-tab" role="tab" aria-selected="true" aria-controls="bio-en" data-panel="bio-en">English</button>
            <button id="bio-hi-tab" role="tab" aria-selected="false" aria-controls="bio-hi" data-panel="bio-hi" tabindex="-1" lang="hi">हिन्दी</button>
        </div>
        @endif
        <div id="bio-en" class="biography" @if(count($speaker['hindi'])) role="tabpanel" aria-labelledby="bio-en-tab" tabindex="0" @endif>
            @foreach($speaker['paragraphs'] as $paragraph)<p @if(preg_match('/[\x{0900}-\x{097F}]/u',$paragraph)) lang="hi" @endif>{{ $paragraph }}</p>@endforeach
        </div>
        @if(count($speaker['hindi']))
        <div id="bio-hi" class="biography" role="tabpanel" aria-labelledby="bio-hi-tab" tabindex="0" lang="hi">
            @foreach($speaker['hindi'] as $paragraph)<p>{{ $paragraph }}</p>@endforeach
        </div>
        @endif
        @endif
        @if(!empty($speaker['source']))
        <p class="biography-source"><a href="{{ $speaker['source'] }}" target="_blank" rel="noopener">Biography source &#8599;</a> &middot; {{ $speaker['source_credit'] ?? '' }} @if(str_contains($speaker['source'],'wikipedia.org'))<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">License</a>@endif</p>
        @endif
        <div class="profile-tools"><button class="text-link share-link" data-share="{{ $speaker['profile_url'] }}">Copy profile link <span aria-hidden="true">&#8599;</span></button><span data-share-status role="status"></span></div>
    </article>
</section>
@if(count($related))
<section class="container section related-section"><div class="section-heading"><div><p class="eyebrow">THE CONVERSATION CONTINUES</p><h2>From the <em>festival journal.</em></h2></div></div><div class="article-grid">@foreach($related as $article)@include('frontend.partials.article-card')@endforeach</div></section>
@endif
<nav class="container profile-pagination" aria-label="Explore more speakers"><a href="{{ $previousSpeaker['profile_url'] }}"><span>&#8592; PREVIOUS VOICE</span><strong>{{ $previousSpeaker['name'] }}</strong></a><a href="{{ $directoryUrl }}" class="all-speakers-link">All speakers</a><a href="{{ $nextSpeaker['profile_url'] }}"><span>NEXT VOICE &#8594;</span><strong>{{ $nextSpeaker['name'] }}</strong></a></nav>
@endsection

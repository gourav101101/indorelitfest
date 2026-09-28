@extends('frontend.layouts.app')
@section('content')
@php
    $collectionYear = $archiveYear ?? 2025;
    $historicalProfile = $historicalProfile ?? false;
    $directoryUrl = $historicalProfile ? route('speakers.archive') : route('speakers.year',$collectionYear);
    $profileUrl = fn($person) => $historicalProfile ? route('speakers.past.profile',$person['slug']) : (isset($archiveYear) ? route('speakers.archive.profile',[$archiveYear,$person['slug']]) : route('speaker',$person['slug']));
@endphp
<div class="detail-chapter-bar"><div class="container"><a href="{{ $directoryUrl }}">← The festival voices</a><span>{{ $historicalProfile ? 'OUR PAST SPEAKERS' : 'THE '.$collectionYear.' COLLECTION' }}</span></div></div>
<section class="container section profile">
    <div class="profile-photo">
        @if($speaker['image'])
        <img src="{{ $image($speaker['image']) }}" alt="{{ $speaker['name'] }}" width="500" height="600">
        @isset($speaker['portrait'])<p class="biography-source">Portrait: {{ $speaker['portrait']['credit'] }} · <a href="{{ $speaker['portrait']['source'] }}" target="_blank" rel="noopener">Wikimedia Commons</a> · <a href="{{ $speaker['portrait']['license_url'] }}" target="_blank" rel="noopener">{{ $speaker['portrait']['license'] }}</a>. {{ $speaker['portrait']['changes'] }}</p>@endisset
        @else
        <div class="past-voice-monogram" aria-hidden="true">{{ collect(explode(' ',$speaker['name']))->filter()->map(fn($word)=>mb_substr($word,0,1))->take(2)->implode('') }}</div>
        @endif
        <span class="eyebrow">{{ $historicalProfile ? 'A VOICE FROM OUR FESTIVAL HISTORY' : 'FESTIVAL VOICE · '.$collectionYear.' EDITION' }}</span>
        @unless(isset($archiveYear) || $historicalProfile)
        <a class="profile-schedule" href="{{ route('schedule') }}"><span>THE 2025 PROGRAMME</span><strong>Find the conversations ↗</strong></a>
        @endunless
    </div>
    <article>
        <h1>{{ $speaker['name'] }}</h1><p class="profile-role">{{ $speaker['role'] ?: 'A voice from our '.$collectionYear.' festival' }}</p>
        <div class="short-rule"></div>
        @isset($archiveYear)<p class="muted">Biography from the {{ $archiveYear }} festival collection.</p>@endisset
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
        @if($historicalProfile)
        <p class="biography-source"><a href="{{ $speaker['source'] }}" target="_blank" rel="noopener">Biography source ↗</a> · {{ $speaker['source_credit'] }} @if(str_contains($speaker['source'],'wikipedia.org'))<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">License</a>@endif</p>
        @endif
        <div class="profile-tools"><button class="text-link share-link" data-share="{{ url()->current() }}">Copy profile link <span aria-hidden="true">↗</span></button><span data-share-status role="status"></span></div>
    </article>
</section>
@if(count($related))
<section class="container section related-section"><div class="section-heading"><div><p class="eyebrow">THE CONVERSATION CONTINUES</p><h2>From the <em>festival journal.</em></h2></div></div><div class="article-grid">@foreach($related as $article)@include('frontend.partials.article-card')@endforeach</div></section>
@endif
<nav class="container profile-pagination" aria-label="Explore more speakers"><a href="{{ $profileUrl($previousSpeaker) }}"><span>← PREVIOUS VOICE</span><strong>{{ $previousSpeaker['name'] }}</strong></a><a href="{{ $directoryUrl }}" class="all-speakers-link">All speakers</a><a href="{{ $profileUrl($nextSpeaker) }}"><span>NEXT VOICE →</span><strong>{{ $nextSpeaker['name'] }}</strong></a></nav>
@endsection

@extends('frontend.layouts.app')
@section('content')
<section class="container section profile">
    <div class="profile-photo">
        <img src="{{ $image($speaker['image']) }}" alt="{{ $speaker['name'] }}" width="500" height="600">
        <span class="eyebrow">FESTIVAL VOICE · 2025 EDITION</span>
        <a class="profile-schedule" href="{{ route('schedule') }}"><span>THE 2025 PROGRAMME</span><strong>Find the conversations ↗</strong></a>
    </div>
    <article>
        <a class="text-link" href="{{ route('speakers') }}">← All speakers</a>
        <h1>{{ $speaker['name'] }}</h1><p class="profile-role">{{ $speaker['role'] ?: 'A voice from our 2025 festival' }}</p>
        <div class="short-rule"></div>
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
        <div class="profile-tools"><button class="text-link share-link" data-share="{{ url()->current() }}">Copy profile link <span aria-hidden="true">↗</span></button><span data-share-status role="status"></span></div>
    </article>
</section>
@if(count($related))
<section class="container section related-section"><div class="section-heading"><div><p class="eyebrow">THE CONVERSATION CONTINUES</p><h2>From the <em>festival journal.</em></h2></div></div><div class="article-grid">@foreach($related as $article)@include('frontend.partials.article-card')@endforeach</div></section>
@endif
<nav class="container profile-pagination" aria-label="Explore more speakers"><a href="{{ route('speaker',$previousSpeaker['slug']) }}"><span>← PREVIOUS VOICE</span><strong>{{ $previousSpeaker['name'] }}</strong></a><a href="{{ route('speakers') }}" class="all-speakers-link">All speakers</a><a href="{{ route('speaker',$nextSpeaker['slug']) }}"><span>NEXT VOICE →</span><strong>{{ $nextSpeaker['name'] }}</strong></a></nav>
@endsection

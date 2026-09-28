@extends('frontend.layouts.app')
@section('content')
<div class="detail-chapter-bar"><div class="container"><a href="{{ route('journal') }}">← The festival journal</a><span>STORIES THAT STAY WITH US</span></div></div>

<article class="article-detail">
    <div class="container article-title">
        <p class="eyebrow">{{ $article['category'] }} · 2025 EDITION · {{ $article['minutes'] }} MIN READ</p>
        <h1 lang="{{ $article['language'] }}">{{ $article['title'] }}</h1>
        <div class="article-byline"><span>Indore Literature Festival journal</span><span>{{ $article['language']==='hi' ? 'हिन्दी' : 'English' }}</span><button class="share-link" data-share="{{ url()->current() }}">Copy story link ↗</button><span data-share-status role="status"></span></div>
    </div>
    <figure class="story-cover"><img class="article-cover" src="{{ $image($article['image']) }}" alt="{{ $article['image_alt'] }}" width="1200" height="600"><figcaption>{{ $article['image_alt'] }}</figcaption></figure>
    <div class="container story-layout">
        <aside class="story-aside"><p class="eyebrow">FROM THE 2025 EDITION</p><p>A conversation worth<br>carrying with you.</p><a href="{{ route('schedule') }}">Explore the programme ↗</a>@foreach($people as $person)<a class="story-person" href="{{ route('speaker',$person['slug']) }}"><img src="{{ $image($person['image']) }}" alt="" width="56" height="56"><span>{{ $person['name'] }}<small>Meet the speaker ↗</small></span></a>@endforeach</aside>
        <div class="article-body" lang="{{ $article['language'] }}" data-reading-body>@foreach($article['paragraphs'] as $paragraph)<p>{{ $paragraph }}</p>@endforeach</div>
    </div>
</article>
<section class="container section related-section"><div class="section-heading"><div><p class="eyebrow">ONE GOOD STORY LEADS TO ANOTHER</p><h2>Keep <em>the pages turning.</em></h2></div><a class="text-link" href="{{ route('journal') }}">All stories ↗</a></div><div class="article-grid">@foreach($related as $article)@include('frontend.partials.article-card')@endforeach</div></section>
@endsection

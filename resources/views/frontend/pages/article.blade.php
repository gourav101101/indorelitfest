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
        <aside class="story-aside"><p class="eyebrow">FROM THE 2025 EDITION</p><p>A conversation worth<br>carrying with you.</p><a href="{{ route('schedule') }}">Explore the programme ↗</a>@foreach($people as $person)<a class="story-person" href="{{ route('speaker',$person['slug']) }}">@if($person['image'])<img src="{{ $image($person['image']) }}" alt="" width="56" height="56">@endif<span>{{ $person['name'] }}<small>Meet the speaker ↗</small></span></a>@endforeach</aside>
        <div class="article-body" lang="{{ $article['language'] }}" data-reading-body>@foreach($article['blocks'] as $block)@if($block['type']==='heading')<h2>{{ $block['text'] }}</h2>@else<p>{{ $block['text'] }}</p>@endif
@endforeach</div>
    </div>
@include('frontend.partials.article-videos')
<section class="container article-photo-section" aria-label="Photographs from this article">
 <div class="section-heading"><div><p class="eyebrow">FROM THE ORIGINAL FESTIVAL BLOG</p><h2>The story in photographs</h2></div><span>{{ count($article['photos']) }} photographs</span></div>
 <div class="article-photo-grid">
 @foreach($article['photos'] as $photo)
 <button type="button" data-lightbox="{{ asset(ltrim($photo['original'],'/')) }}" data-caption="{{ $photo['alt'] }}" aria-label="Enlarge photograph {{ $loop->iteration }} from this article">
 <img src="{{ $image($photo['image']) }}" alt="{{ $photo['alt'] }}" width="{{ $photo['width'] }}" height="{{ $photo['height'] }}" loading="lazy">
 <span>View photograph {{ $loop->iteration }} <b aria-hidden="true">&#8599;</b></span>
 </button>
 @endforeach
 </div>
</section>
</article>
<section class="container section related-section"><div class="section-heading"><div><p class="eyebrow">ONE GOOD STORY LEADS TO ANOTHER</p><h2>Keep <em>the pages turning.</em></h2></div><a class="text-link" href="{{ route('journal') }}">All stories ↗</a></div><div class="article-grid">@foreach($related as $article)@include('frontend.partials.article-card')@endforeach</div></section>
@endsection

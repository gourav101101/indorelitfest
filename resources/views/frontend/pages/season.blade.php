@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'THE MOMENTS THAT MADE US','intro'=>$season==='archive'?'Conversations, familiar faces and the joy of being together. A collection from past editions.':'A chapter from the Indore Literature Festival memory book.'])
<section class="container section" data-collection data-page-size="24" data-item=".gallery-item">
    <div class="filter-toolbar"><a class="text-link" href="{{ route('gallery') }}">← All editions</a>@if($season==='2025')<div class="filter-pills" aria-label="Filter photographs by day"><button aria-pressed="true" data-category-filter="all">All days</button><button aria-pressed="false" data-category-filter="dayone">Day 1</button><button aria-pressed="false" data-category-filter="daytwo">Day 2</button><button aria-pressed="false" data-category-filter="daythree">Day 3</button></div>@endif</div>
    @if(count($photos))
    <div class="gallery-summary"><p class="muted"><span data-collection-count>{{ count($photos) }} photographs</span> · Click to explore</p><span class="eyebrow">{{ $season==='archive'?'MEMORIES ACROSS THE YEARS':'14–16 NOVEMBER 2025' }}</span></div>
    <div class="gallery-grid curated-gallery">
        @foreach($photos as $i=>$photo)
        <button class="gallery-item" data-category="{{ $photo['category'] }}" data-lightbox="{{ $image($photo['path']) }}" data-caption="Indore Literature Festival · {{ $photo['day'] }}{{ $season==='2025'?' · 2025':'' }}" aria-label="Enlarge {{ $photo['day'] }} photograph {{ $i+1 }}"><img loading="lazy" src="{{ $image($photo['path']) }}" alt="Indore Literature Festival · {{ $photo['day'] }} · Photograph {{ $i+1 }}" width="600" height="450"><span class="photo-tile-label">{{ $photo['day'] }} <span aria-hidden="true">↗</span></span></button>
        @endforeach
    </div>
    <div class="load-more-wrap"><button class="button button-outline" data-load-more hidden>More moments <span aria-hidden="true">↓</span></button><span data-load-status role="status"></span></div>
    @if($season==='archive')<p class="archive-caption">This collection spans earlier editions. Individual years are shown only where they have been verified.</p>@endif
    @else
    <div class="empty-state"><span aria-hidden="true">✳</span><h2>The memories live on.<br><em>The collection is taking shape.</em></h2><p>This year’s photographs have not yet been catalogued separately. Explore the shared archive or our latest festival stories.</p><a class="button button-blue" href="{{ route('season','archive') }}">Explore the photo archive ↗</a><a class="text-link" href="{{ route('journal') }}">Read the festival journal ↗</a></div>
    @endif
</section>
@endsection

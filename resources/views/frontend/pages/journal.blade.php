@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'IDEAS THAT LIVE BEYOND THE FESTIVAL','intro'=>'Notes from the stage. Reflections from the audience. Stories worth carrying home.'])
<section class="container section">
    @php($featured=$articles[0])
    <a class="journal-feature" href="{{ route('article',$featured['slug']) }}"><img src="{{ $image($featured['image']) }}" alt="Illustrated books and writing materials" width="800" height="530"><div><span class="eyebrow">THE FESTIVAL DIARY · {{ $featured['minutes'] }} MIN READ</span><h2 lang="hi">{{ $featured['title'] }}</h2><p lang="hi">{{ $featured['excerpt'] }}</p><span class="text-link">Step into the story ↗</span></div></a>
    <div data-collection data-page-size="9" data-item=".article-card">
        <div class="filter-toolbar"><div class="filter-pills" aria-label="Filter articles"><button aria-pressed="true" data-category-filter="all">All stories</button><button aria-pressed="false" data-category-filter="Festival diary">Festival diaries</button><button aria-pressed="false" data-category-filter="Conversations">Conversations</button></div><label class="search-field"><span class="sr-only">Search articles</span><input type="search" placeholder="Find a story…" data-collection-search><span aria-hidden="true">⌕</span></label></div>
        <p class="result-count" role="status" data-collection-count>{{ count($articles) }} stories to explore</p>
        <div class="article-grid">@foreach($articles as $article)@include('frontend.partials.article-card')@endforeach</div>
        <p class="empty-results" data-collection-empty hidden>No stories match your search. Try another word or choose All stories.</p>
        <div class="load-more-wrap"><button class="button button-outline" data-load-more hidden>More stories <span aria-hidden="true">↓</span></button><span data-load-status role="status"></span></div>
    </div>
</section>
@endsection

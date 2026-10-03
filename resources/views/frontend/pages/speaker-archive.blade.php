@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'ELEVEN SEASONS. MANY RETURNING VOICES.','intro'=>'Discover the writers, poets, artists and thinkers who joined us from 2015 to 2025. Follow a familiar voice across the years.'])
<section class="container section">
    <div id="archive-directory" class="archive-directory">
        <div class="section-heading"><div><p class="eyebrow">OUR FESTIVAL HISTORY</p><h2>All our festival <em>voices.</em></h2><p>{{ $totalProfiles }} speaker profiles across 11 seasons. Each card brings their festival years together.</p></div></div>
        <form class="archive-filters" action="{{ route('speakers.archive') }}#archive-directory" method="get">
            <label>Find a speaker<input type="search" name="q" value="{{ $archiveQuery }}" placeholder="Name or keyword"></label>
            <label>Festival year<select name="year"><option value="">All years</option>@foreach(range(2025,2015) as $year)<option value="{{ $year }}" @selected($selectedYear===(string)$year)>{{ $year }} &middot; Season {{ $year-2014 }} ({{ $yearCounts[$year] }})</option>@endforeach</select></label>
            @if($showAll)<input type="hidden" name="view" value="all">@endif
            <button class="button button-blue" type="submit">Find speakers</button>
            @if($archiveQuery!=='' || $selectedYear!=='')<a class="text-link" href="{{ route('speakers.archive') }}#archive-directory">Clear filters</a>@endif
        </form>
        <div class="archive-results"><p role="status">{{ $directory->total() ? $directory->firstItem().'–'.$directory->lastItem().' of '.$directory->total().' profiles' : 'No profiles found' }}</p><a class="text-link" href="{{ route('speakers.archive',array_filter(['q'=>$archiveQuery,'year'=>$selectedYear,'view'=>$showAll ? null : 'all'])) }}#archive-directory">{{ $showAll ? 'Show numbered pages' : 'Show all speakers' }}</a></div>
        <div class="speaker-grid directory">
            @foreach($directory as $speaker)
                @include('frontend.partials.speaker-card')
            @endforeach
        </div>
        @if($directory->isEmpty())<p class="archive-empty">Try another name or select a different year.</p>@endif
        @if($directory->lastPage()>1)
        <nav class="archive-pagination" aria-label="Speaker archive pages">
            @if($directory->onFirstPage())<span aria-disabled="true">&#8592; Previous</span>@else<a href="{{ $directory->previousPageUrl() }}">&#8592; Previous</a>@endif
            @for($number=1;$number<=$directory->lastPage();$number++)<a href="{{ $directory->url($number) }}" @if($directory->currentPage()===$number) aria-current="page" @endif aria-label="Page {{ $number }}">{{ $number }}</a>@endfor
            @if($directory->hasMorePages())<a href="{{ $directory->nextPageUrl() }}">Next &#8594;</a>@else<span aria-disabled="true">Next &#8594;</span>@endif
        </nav>
        @endif
    </div>
    <div class="section-heading"><h2>Every year. <em>Remarkable voices.</em></h2><a class="text-link" href="{{ route('speakers.year',2025) }}">Meet the 2025 speakers &#8599;</a></div>
    <div class="season-grid">
        @foreach(range(2025,2015) as $year)
        <a class="season-card" href="{{ route('speakers.year',$year) }}">
            <span class="eyebrow">SEASON {{ $year-2014 }}</span><span class="season-year">{{ $year }}</span><strong>{{ $year }} Speakers</strong><span>{{ $yearCounts[$year] }} voices to explore &#8599;</span><i aria-hidden="true">&#10035;</i>
        </a>
        @endforeach
    </div>
</section>
@endsection

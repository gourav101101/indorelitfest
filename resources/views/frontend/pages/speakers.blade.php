@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'THE VOICES THAT STAY WITH US','intro'=>'Authors, poets, artists and thinkers. Revisit the people and perspectives of our 2025 edition.'])
<section class="container section"><div class="filter-toolbar"><div class="tabs"><a class="active" href="{{ route('speakers') }}">2025 speakers</a><a href="{{ route('speakers.archive') }}">Our past speakers ↗</a></div><label class="search-field"><span class="sr-only">Search speakers</span><input type="search" placeholder="Find a name or a voice…" data-filter=".speaker-card"><span aria-hidden="true">⌕</span></label></div><p class="result-count" role="status" data-results>{{ count($speakers) }} voices to discover</p><div class="speaker-grid directory">@foreach($speakers as $speaker)@include('frontend.partials.speaker-card')@endforeach</div><p class="empty-results" hidden>No speakers match your search. Try another name.</p></section>
@endsection

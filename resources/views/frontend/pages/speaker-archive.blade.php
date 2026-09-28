@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'A LEGACY OF REMARKABLE VOICES','intro'=>'Every edition adds another chapter. Explore the people and perspectives of our past festivals.'])
<section class="container section">
    <div class="section-heading"><div><p class="eyebrow">SINCE 2015</p><h2>The voices that shaped <em>our story.</em></h2><p>Across our past editions, these writers, artists and thinkers have shared their words, ideas and perspectives.</p></div></div>
    <ul class="legacy-names">@foreach(json_decode(file_get_contents(resource_path('data/prominent-speaker-links.json')),true) as $person)<li><a href="{{ url($person['path']) }}">{{ $person['name'] }} <span aria-hidden="true">↗</span></a></li>@endforeach</ul>
    <div class="section-heading"><h2>Every year. <em>Remarkable voices.</em></h2><a class="text-link" href="{{ route('speakers.year',2025) }}">Meet the 2025 speakers ↗</a></div>
    <div class="season-grid">
        @foreach(range(2025,2015) as $year)
            @if(isset($yearCounts[$year]))
            <a class="season-card" href="{{ route('speakers.year',$year) }}">
                <span class="eyebrow">THE {{ $year }} COLLECTION</span><span class="season-year">{{ $year }}</span><strong>{{ $year }} Speakers</strong><span>{{ $yearCounts[$year] }} profiles to explore ↗</span><i aria-hidden="true">✳</i>
            </a>
            @else
            <div class="season-card is-pending">
                <span class="eyebrow">FROM OUR ARCHIVES</span><span class="season-year">{{ $year }}</span><strong>{{ $year }} Speakers</strong><span>Profiles coming soon</span><i aria-hidden="true">✳</i>
            </div>
            @endif
        @endforeach
    </div>
    <p class="muted">Earlier collections will be added as the archive grows.</p>
</section>
@endsection

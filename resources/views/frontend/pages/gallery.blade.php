@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'OUR MEMORY BOOK','intro'=>'Eleven editions, curtain raisers and special gatherings. Explore our festival photographs, one chapter at a time.'])
<section class="container section">
    @php($latest=collect($collections)->firstWhere('slug','2025'))
    <a class="gallery-feature" href="{{ route('season','2025') }}"><img src="{{ $image($latest['photos'][0]['path']) }}" alt="ILF Season 11 · 2025" width="1200" height="550"><div><p class="eyebrow">OUR LATEST CHAPTER · 11TH EDITION</p><h2>2025.<br><em>A year to remember.</em></h2><span class="button button-yellow">Explore {{ count($latest['photos']) }} photographs ↗</span></div></a>
    <div class="section-heading"><h2>Every chapter. <em>A shared memory.</em></h2></div>
    <div class="client-gallery-collections">
        @foreach($collections as $collection)
        <a class="client-gallery-collection" href="{{ route('season',$collection['slug']) }}"><img src="{{ $image($collection['cover']) }}" alt="{{ $collection['title'] }}" loading="lazy" width="640" height="420"><div><span class="eyebrow">{{ count($collection['photos']) }} PHOTOGRAPHS</span><h2>{{ $collection['title'] }}</h2><span class="text-link">Explore the collection ↗</span></div></a>
        @endforeach
    </div>
</section>
@endsection

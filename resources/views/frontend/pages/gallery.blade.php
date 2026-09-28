@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'OUR MEMORY BOOK','intro'=>'Eleven editions of shared wonder. Find the faces, the conversations and the moments between the words.'])
<section class="container section"><a class="gallery-feature" href="{{ route('season','2025') }}"><img src="{{ $image('legacy/images/dayone/dayone2.jpeg') }}" alt="The audience at the 2025 festival" width="1200" height="550"><div><p class="eyebrow">OUR LATEST CHAPTER · 11TH EDITION</p><h2>2025.<br><em>A year to remember.</em></h2><span class="button button-yellow">Explore the gallery ↗</span></div></a><div class="section-heading"><h2>Every year. <em>A new story.</em></h2></div><div class="season-grid">@foreach(range(2025,2015) as $year)@if($year===2025)<a class="season-card" href="{{ route('season',(string)$year) }}">@else<div class="season-card is-pending">@endif<span class="eyebrow">SEASON {{ str_pad($year-2014,2,'0',STR_PAD_LEFT) }}</span><span class="season-year">{{ $year }}</span><span>{{ $year===2025?'Explore photographs':'Collection not yet indexed' }} <span aria-hidden="true">↗</span></span><i aria-hidden="true">✳</i>@if($year===2025)</a>@else</div>@endif
@endforeach</div></section>
@endsection


@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'THE FESTIVAL, PAGE BY PAGE','intro'=>'The 12th edition takes place from '.$festival['dates'].' at '.$festival['venue'].'. Its programme will be announced separately. Explore the original 2025 programme below.'])
<section class="container section">
    <div class="section-heading"><div><span class="tag">2025 ARCHIVE</span><h2>Three days.<br><em>A world of conversations.</em></h2><p>14–16 November 2025 · Daly College, Indore</p></div></div>
    @include('frontend.partials.festival-document',['documentYear'=>'2025','documentTitle'=>'The programme, page by page.','documentDescription'=>'Revisit the original schedule and invitation from our 11th edition. Save a copy or open it in your browser. The 2026 programme will be announced separately.','documentPath'=>$festival['schedule']])
</section>
@endsection

@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'BRING YOUR CURIOSITY. LEAVE YOUR MARK.','intro'=>'Reader, performer, volunteer or creator—there is more than one way to become part of the festival.'])
<section class="container section"><div class="notice"><span aria-hidden="true">✳</span><div><strong>Join the 12th Indore Literature Festival.</strong><p>{{ $festival['dates'] ?: 'New festival dates and participation forms will be announced here.' }} Explore the ways to join us, or contact the team for enquiries.</p></div></div><div class="participation-grid">@foreach($festival['forms'] as $form)<article class="participation-card"><span class="eyebrow">{{ $form['icon'] }} / FIND YOUR PLACE</span><h2>{{ $form['name'] }}</h2><p>{{ $form['description'] }}</p>@if($form['url'])<a class="button button-blue" href="{{ $form['url'] }}">Open registration form ↗</a>@else<span class="tag">ANNOUNCEMENT AWAITED</span><a class="text-link" href="mailto:{{ $festival['email'] }}?subject={{ rawurlencode('Indore Lit Fest — '.$form['name']) }}">Enquire with the team ↗</a>@endif</article>@endforeach</div></section>
@include('frontend.partials.faq')
@endsection


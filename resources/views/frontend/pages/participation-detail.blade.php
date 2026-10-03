@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'BE PART OF THE FESTIVAL','intro'=>$festival['dates'].' · '.$festival['venue']])
<section class="container section participation-detail">
    <a class="text-link" href="{{ route('participate') }}">← All ways to participate</a>
    <article class="participation-story">
        <div><img src="{{ $image($part['image']) }}" alt="{{ $part['alt'] }}" loading="lazy"></div>
        <div>
            <p class="eyebrow">YOUR PLACE IN THE FESTIVAL</p>
            <h2>{{ $part['title'] }}</h2>
            <div lang="{{ $part['language'] ?? 'en' }}">@foreach(explode("\n\n",$part['copy']) as $paragraph)<p>{{ $paragraph }}</p>@endforeach</div>
            <p>{{ $part['detail'] }}</p>
            <div class="form-actions">
                <a class="button button-blue" href="{{ $festival['forms'][$part['form']]['url'] }}" target="_blank" rel="noopener">{{ ['','Apply for Open Mic','Enquire about a stall','Apply to volunteer','Apply for an internship'][$part['form']] }} ↗</a>
                <button class="text-link" type="button" data-copy-form="{{ $festival['forms'][$part['form']]['url'] }}">Copy form link</button><span role="status"></span>
            </div>
        </div>
    </article>
    @if(!empty($part['gallery']))
    <section class="section"><h2>Moments from the festival</h2>@include('frontend.partials.client-photo-grid',['photos'=>$part['gallery'],'caption'=>$part['title']])</section>
    @endif
    <aside class="form-help"><h2>Need help applying?</h2><p>The form opens in a new tab. If it does not open in WhatsApp or Instagram, copy the form link into your browser.</p><p>Email <a href="mailto:{{ $festival['email'] }}">{{ $festival['email'] }}</a> for help.</p></aside>
    <nav class="tabs" aria-label="Other ways to participate">@foreach($parts as $option)@if($option['slug']!==$part['slug'])<a href="{{ route('participation.detail',$option['slug']) }}">{{ $option['title'] }} →</a>@endif @endforeach</nav>
</section>
@endsection

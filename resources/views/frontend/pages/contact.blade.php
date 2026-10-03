@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'LET’S START A CONVERSATION','intro'=>'A question, a collaboration, a story to share. We would love to hear from you.'])
<section class="container section contact-grid"><div><p class="eyebrow">HELLO HINDUSTAN NEWS & NETWORK</p><h2>Hello, <em>storyteller.</em></h2><a class="contact-email" href="mailto:{{ $festival['email'] }}">{{ $festival['email'] }} ↗</a><a class="contact-email" href="mailto:{{ $festival['secondary_email'] }}">{{ $festival['secondary_email'] }}</a><p>{{ $festival['address'] }}</p><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=Krishna+Business+Centre+Vijay+Nagar+Indore">Find our office on the map ↗</a><div class="contact-social"><a href="{{ $festival['instagram'] }}">Instagram ↗</a><a href="{{ $festival['youtube'] }}">YouTube ↗</a><a href="{{ $festival['facebook'] }}">Facebook ↗</a></div></div><div class="contact-note"><span aria-hidden="true">✳</span><h3>A note before you visit</h3><p>This is the festival team’s office. The 12th edition takes place from {{ $festival['dates'] }} at {{ $festival['venue'] }}. For registration and ways to join, visit our participation page.</p><a class="button button-blue" href="{{ route('participate') }}">Explore participation ↗</a></div></section>
@include('frontend.partials.enquiry')
@include('frontend.partials.faq')
@endsection



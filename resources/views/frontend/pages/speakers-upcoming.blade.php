@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',['kicker'=>'THE NEXT CHAPTER','intro'=>'New voices. Fresh perspectives. Three days of literature and conversation at Daly College.'])
<section class="container section"><div class="empty-state"><span aria-hidden="true">✳</span><h2>The Speaker List of 2026 will be out soon</h2><p>Join us from {{ $festival['dates'] }}. Until the lineup is announced, revisit the writers, poets, artists and thinkers who have shaped our festival.</p><a class="button button-blue" href="{{ route('speakers.archive') }}">Our past speakers ↗</a><a class="text-link" href="{{ route('participate') }}">Join the festival ↗</a></div></section>
@endsection

<header class="site-header ilf-header">
<a href="{{ route('home') }}" class="brand official-brand" aria-label="Indore Literature Festival home"><img src="{{ asset('images/indore-literature-festival-logo.jpg') }}" width="160" height="160" alt="Indore Literature Festival"></a>
<button class="menu-toggle" aria-expanded="false" aria-controls="navigation"><span></span><span></span><span class="sr-only">Open menu</span></button>
<nav id="navigation" aria-label="Main navigation">
<a href="{{ route('home') }}" aria-current="page">Home</a>
<details class="ilf-nav-menu"><summary>Festival <svg class="ilf-nav-chevron" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary><div><a href="#festival">About the festival</a><a href="#registration">Be part of the festival</a><a href="{{ route('schedule') }}">2025 Programme</a><a href="{{ route('gallery') }}">Festival gallery</a><a href="{{ route('visit') }}">Plan your visit</a></div></details>
<a href="{{ route('speakers') }}">Speakers</a>
<details class="ilf-nav-menu"><summary>Media <svg class="ilf-nav-chevron" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></summary><div><a href="{{ route('journal') }}">Festival journal</a><a href="{{ route('media') }}">Media room</a><a href="{{ $festival['youtube'] }}">Watch on YouTube</a></div></details>
<a href="{{ route('malwa') }}">Discover Malwa</a>
<a href="{{ $festival['forms'][3]['url'] }}">Volunteer</a>
<a class="ilf-button header-cta" href="{{ $festival['forms'][0]['url'] }}">Register to Attend <span aria-hidden="true">➜</span></a>
</nav></header>

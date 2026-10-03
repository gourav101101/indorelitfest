<header class="site-header ilf-header">
    <a href="{{ route('home') }}" class="brand official-brand festival-badge" aria-label="Indore Literature Festival home"><img src="{{ asset('images/indore-literature-festival-badge.png') }}" width="810" height="810" alt="Indore Literature Festival — Since 2015" fetchpriority="high"></a>
    <div class="header-brand-copy">
        <strong>India's Most Vibrant Literature Festival</strong>
        <span class="header-event-details"><span class="header-event-date">27&#8211;29 November 2026</span><a class="header-venue-link" href="https://www.google.com/maps/search/?api=1&amp;query=Daly+College+Indore" target="_blank" rel="noopener" aria-label="Daly College, Indore - open location in Google Maps (new tab)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>Daly College</span><span class="header-venue-arrow" aria-hidden="true">&#8599;</span></a></span>
    </div>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation"><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav id="navigation" aria-label="Main navigation">
        @foreach(['home'=>'Home','about'=>'Our story','speakers'=>'Speakers','schedule'=>'Schedule','journal'=>'Journal','gallery'=>'Gallery','malwa'=>'Discover Malwa'] as $route=>$label)
        <a href="{{ route($route) }}" @if(request()->routeIs($route) || ($route==='speakers' && request()->routeIs('speaker','speakers.*')) || ($route==='journal' && request()->routeIs('article')) || ($route==='gallery' && request()->routeIs('season'))) aria-current="page" @endif>{{ $label }}</a>
        @endforeach
        @include('frontend.partials.explore-menu')
        <a class="button button-red ilf-button header-cta" href="{{ route('participate') }}" @if(request()->routeIs('participate')) aria-current="page" @endif>Join the festival <span aria-hidden="true">↗</span></a>
        <div class="mobile-menu-extra"><a href="{{ route('contact') }}">Contact the team ↗</a><a href="{{ route('faq') }}">Visitor FAQs ↗</a><p>साहित्य • संस्कृति • संवाद</p></div>
    </nav>
</header>

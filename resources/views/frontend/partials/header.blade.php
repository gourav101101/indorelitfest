<header class="site-header ilf-header">
    <a href="{{ route('home') }}" class="brand official-brand festival-badge" aria-label="Indore Literature Festival home"><img src="{{ asset('images/indore-literature-festival-badge.png') }}" width="810" height="810" alt="Indore Literature Festival — Since 2015" fetchpriority="high"></a>
    <div class="header-brand-copy">
        <strong>India's Most Vibrant Literature Festival</strong>
        <span>27-29th November 2026 @Daly College</span>
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

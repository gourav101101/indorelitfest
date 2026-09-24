<header class="site-header">
    <a href="{{ route('home') }}" class="brand official-brand" aria-label="Indore Literature Festival home"><img src="{{ asset('images/indore-literature-festival-logo.jpg') }}" width="160" height="160" alt="Indore Literature Festival" fetchpriority="high"></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation"><span></span><span></span><span class="sr-only">Open menu</span></button>
    <nav id="navigation" aria-label="Main navigation">
        @foreach(['about'=>'Our story','speakers'=>'Speakers','schedule'=>'Schedule','journal'=>'Journal','gallery'=>'Gallery','malwa'=>'Discover Malwa'] as $route=>$label)
        <a href="{{ route($route) }}" @if(request()->routeIs($route) || ($route==='speakers' && request()->routeIs('speaker','speakers.archive')) || ($route==='journal' && request()->routeIs('article')) || ($route==='gallery' && request()->routeIs('season'))) aria-current="page" @endif>{{ $label }}</a>
        @endforeach
        @include('frontend.partials.explore-menu')
        <a class="button button-red header-cta" href="{{ route('participate') }}">Join the festival <span aria-hidden="true">↗</span></a>
        <div class="mobile-menu-extra"><a href="{{ route('contact') }}">Contact the team ↗</a><a href="{{ route('faq') }}">Visitor FAQs ↗</a><p>साहित्य • संस्कृति • संवाद</p></div>
    </nav>
</header>

<!doctype html>
<html lang="en-IN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? 'A celebration of words' }} | Indore Literature Festival</title>
    <meta name="description" content="{{ $description ?? ($title ?? 'Discover the festival').' — Indore Literature Festival. Literature, art, culture and the spirit of Indore.' }}">
    <meta name="theme-color" content="#173b70">
    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="icon" href="{{ asset('images/indore-literature-festival-logo.jpg') }}" type="image/jpeg">
    <meta property="og:title" content="{{ $title ?? 'Indore Literature Festival' }}">
    <meta property="og:description" content="{{ $description ?? 'Let the legacy of literature grow. A celebration of stories, art and the spirit of Indore.' }}">
    <meta property="og:image" content="{{ $image($socialImage ?? 'images/malwa-hero-original.png') }}">
    <meta property="og:type" content="{{ ($page ?? '') === 'article' ? 'article' : 'website' }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:url" content="{{ url()->current() }}">
    <link rel="stylesheet" href="{{ asset('fonts/fonts.css') }}">
    @vite(['resources/css/frontend/app.css','resources/css/frontend/festival.css','resources/css/frontend/composition.css','resources/js/frontend/app.js'])
    @if(request()->routeIs('home'))
        @vite(['resources/css/frontend/home-2026.css','resources/js/frontend/home-2026.js'])
    @endif
</head>
<body class="page-{{ $page ?? 'error' }}">
    <a class="skip-link" href="#main">Skip to content</a>
    @include(request()->routeIs('home') ? 'frontend.partials.ilf-header' : 'frontend.partials.header')
    <main id="main">@yield('content')</main>
    @if(request()->routeIs('home'))
        @include('frontend.partials.ilf-footer')
    @else
        @include('frontend.partials.footer-discover')
        @include('frontend.partials.footer')
    @endif
    <button class="back-top" aria-label="Back to top" hidden>↑</button>
    <dialog class="lightbox" id="photo-dialog" aria-label="Festival photo viewer">
        <div class="lightbox-toolbar"><span data-photo-count aria-live="polite"></span><button class="dialog-close" aria-label="Close photograph">×</button></div>
        <button class="photo-prev" aria-label="Previous photograph">←</button><img alt=""><button class="photo-next" aria-label="Next photograph">→</button>
        <p id="photo-caption"></p><span class="lightbox-hint">← → to explore · Escape to close</span>
    </dialog>
</body>
</html>

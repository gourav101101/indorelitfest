<div class="festival-document">
    <img src="{{ asset('images/journal-art.webp') }}" alt="Illustration of an open book, a pen and Malwa architecture" width="1000" height="667" loading="lazy">
    <div><p class="eyebrow">{{ $documentYear }} · ORIGINAL FESTIVAL PDF</p><h2>{{ $documentTitle }}</h2><p>{{ $documentDescription }}</p><div class="document-actions">@if((string)$documentYear === '2025')<a class="button button-blue" href="#schedule-flipbook" data-open-schedule-book>Read the flipbook ↓</a>@endif<a class="text-link" href="{{ asset($documentPath) }}">Open the PDF <span aria-hidden="true">↗</span></a><a class="text-link" href="{{ asset($documentPath) }}" download>Download a copy ↓</a></div></div>
</div>
@if($documentYear === '2025' || $documentYear === 2025)
<details class="schedule-book" id="schedule-flipbook" open><summary>Browse the schedule flipbook</summary>
<div class="schedule-flipbook" data-flipbook tabindex="0" aria-label="2025 schedule flipbook">
    <div class="book-controls"><button type="button" data-book-prev aria-label="Previous schedule page">← Previous</button><span role="status" data-book-status></span><button type="button" data-book-next aria-label="Next schedule page">Next →</button></div>
    <div class="book-tools"><button type="button" data-book-sound aria-pressed="true">Sound: on</button><button type="button" data-book-zoom aria-pressed="false">Zoom in</button><button type="button" data-book-fullscreen aria-pressed="false">Full screen</button><span>Use the arrows to turn pages. Zoom in for small text.</span></div>
    @foreach(json_decode(file_get_contents(resource_path('data/schedule-pages.json')),true) as $bookPage)
    <figure class="book-page" data-book-page><div class="book-viewport" tabindex="0" aria-label="Schedule page image"><img src="{{ asset($bookPage['image']) }}" alt="2025 festival schedule, page {{ $loop->iteration }}" loading="lazy"></div><figcaption><details><summary>Page {{ $loop->iteration }} text</summary><p>{{ $bookPage['text'] ?: 'This page uses image-based text. Open the original schedule for the full page.' }}</p></details></figcaption></figure>
    @endforeach
</div></details>
@endif
<details class="document-reader"><summary>Read the PDF on this page</summary><object class="schedule-pdf" data="{{ asset($documentPath) }}" type="application/pdf" aria-label="{{ $documentTitle }}"><p>Your browser cannot display this PDF. <a href="{{ asset($documentPath) }}">Open the document directly</a>.</p></object></details>

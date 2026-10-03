<a class="speaker-card" href="{{ $speaker['profile_url'] ?? route('speaker',$speaker['slug']) }}" data-name="{{ $speaker['name'] }}" data-search="{{ $speaker['search_text'] ?? mb_strtolower($speaker['name'].' '.$speaker['slug'].' '.$speaker['role']) }}">
    <div class="speaker-photo">
        @if($speaker['image'])
        <img src="{{ $image($speaker['image']) }}" alt="{{ $speaker['name'] }}" loading="lazy" width="360" height="420">
        @else
        <div class="archive-monogram" aria-hidden="true">{{ collect(explode(' ',$speaker['name']))->filter()->map(fn($word)=>mb_substr($word,0,1))->take(2)->implode('') }}</div>
        @endif
        <span class="speaker-arrow" aria-hidden="true">&#8599;</span>
    </div>
    <h3>{{ $speaker['name'] }}</h3>
    <p>{{ $speaker['role'] ?: 'Festival voice' }}</p>
    @include('frontend.partials.speaker-years')
</a>

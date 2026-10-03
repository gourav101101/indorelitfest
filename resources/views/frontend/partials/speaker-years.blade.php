@if(count($speaker['years'] ?? []))
<span class="speaker-years" aria-label="Festival appearances">
    <span class="speaker-years-label">At ILF</span>
    @foreach($speaker['years'] as $appearanceYear)
        <span class="speaker-year" @if((string)($selectedYear ?? $archiveYear ?? '')===(string)$appearanceYear) data-selected="true" @endif>{{ $appearanceYear }}</span>
    @endforeach
</span>
@endif

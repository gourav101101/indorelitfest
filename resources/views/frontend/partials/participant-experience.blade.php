@isset($part['experience'])
<aside class="participant-experience">
    <p class="eyebrow">A PARTICIPANT'S EXPERIENCE</p>
    <p>{{ $part['experience']['text'] }}</p>
    <p><strong>{{ $part['experience']['name'] }}</strong> · {{ $part['experience']['year'] }}</p>
    <small>Summary of a published account. <a href="{{ $part['experience']['source'] }}" target="_blank" rel="noopener">Read the original ↗</a></small>
</aside>
@endisset

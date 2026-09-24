@if($block==='doorways')
<section class="festival-doorways container section" id="festival-guide" aria-labelledby="doorways-title">
    <div class="section-heading"><div><p class="eyebrow">MAKE YOURSELF AT HOME</p><h2 id="doorways-title">Where will your<br><em>curiosity take you?</em></h2></div><a class="text-link" href="{{ route('experiences') }}">Explore the festival ↗</a></div>
    <div class="doorway-grid">
    @foreach([['01','Hear a new perspective.','Meet the writers, thinkers and voices of our 2025 edition.','speakers','legacy/images/slideshow-main/6.jpg'],['02','Find your people.','Readers, performers, volunteers. There is a place for you.','community','legacy/images/dayone/dayone2.jpeg'],['03','Make a day of it.','A little planning. Plenty of room for discovery.','visit','images/malwa-hero-original.png']] as [$number,$heading,$copy,$destination,$picture])
        <a class="doorway" href="{{ route($destination) }}" data-reveal><img src="{{ $image($picture) }}" alt="" loading="lazy" width="700" height="900"><div><span class="eyebrow">{{ $number }} / YOUR FESTIVAL</span><h3>{{ $heading }}</h3><p>{{ $copy }}</p><span class="doorway-arrow" aria-hidden="true">↗</span></div></a>
    @endforeach
    </div>
</section>

@endif
@if($block==='chapters')
<section class="chapter-stage section" data-chapter-tabs>
    <div class="container"><div class="section-heading"><div><p class="eyebrow">REVISIT THE 2025 EDITION · 14–16 NOVEMBER</p><h2>Three days.<br><em>So many stories.</em></h2></div><a class="text-link" href="{{ route('schedule') }}">Open the original programme ↗</a></div>
    <div class="chapter-tabs" role="tablist" aria-label="2025 festival days">@foreach(['Day 1','Day 2','Day 3'] as $i=>$label)<button id="chapter-tab-{{ $i }}" role="tab" aria-controls="chapter-{{ $i }}" aria-selected="{{ $i===0?'true':'false' }}" tabindex="{{ $i===0?'0':'-1' }}" data-chapter="{{ $i }}"><span>0{{ $i+1 }}</span>{{ $label }}<small>{{ 14+$i }} NOVEMBER 2025</small></button>@endforeach</div>
    @foreach([['day-one','dayone/dayone2.jpeg','The first hello.','A full house. Fresh ideas. The beginning of three days together.'],['day-two','slideshow-main/6.jpg','The conversation grows.','Follow the ideas, encounters and reflections in our second-day diary.'],['day-three','daythree/daythree13.jpeg','The stories stay.','Revisit the final day through the words of the festival journal.']] as $i=>[$slug,$photo,$heading,$copy])
    <div class="chapter-panel" id="chapter-{{ $i }}" role="tabpanel" aria-labelledby="chapter-tab-{{ $i }}" tabindex="0">
        <img src="{{ $image('legacy/images/'.$photo) }}" alt="{{ $i===1?'A conversation from the festival photo archive':'Indore Literature Festival 2025' }}" loading="lazy" width="1000" height="650">
        <div><p class="eyebrow">FROM THE FESTIVAL JOURNAL</p><h3>{{ $heading }}</h3><p>{{ $copy }}</p><a class="button button-yellow" href="{{ route('article',$slug) }}">Read the day {{ $i+1 }} diary ↗</a><a class="text-link" href="{{ route('season','2025') }}">Explore 2025 photographs ↗</a></div>
    </div>
    @endforeach
    </div>
</section>

@endif
@if($block==='community')
<section class="festival-invitation container section"><div data-reveal><p class="eyebrow">THE FESTIVAL BELONGS TO ITS PEOPLE</p><h2>Don’t just<br>turn a page.<br><em>Be part of one.</em></h2><p>Bring your words, your time, your ideas. Help the next chapter of Indore Literature Festival come alive.</p><a class="button button-blue" href="{{ route('community') }}">Find your place ↗</a></div><div class="invitation-links">@foreach([['01','Take the stage','Poetry, stories and your own voice.','participate'],['02','Behind the scenes','Explore volunteering and internships.','participate'],['03','Create something together','Books, creative stalls and collaborations.','community'],['04','Tell the story','A starting point for media and press enquiries.','media']] as [$num,$name,$copy,$destination])<a href="{{ route($destination) }}"><span>{{ $num }}</span><div><h3>{{ $name }}</h3><p>{{ $copy }}</p></div><b aria-hidden="true">↗</b></a>@endforeach</div></section>
@endif

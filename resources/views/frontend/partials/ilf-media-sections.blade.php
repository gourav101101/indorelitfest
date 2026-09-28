@php($homeMedia = require resource_path('data/home-media.php'))
@include('frontend.partials.youtube-milestone')
<section id="podcasts" class="ilf-media-section ilf-listen ilf-section">
 <img class="ilf-scene-wildlife" src="{{ $image('images/festival-wildlife-divider.png') }}" alt="" aria-hidden="true" width="2172" height="724" loading="lazy">

 @include('frontend.partials.ilf-heading',['overline'=>'Indore voices','heading'=>'Listen & watch'])
 <p class="ilf-intro">Settle into a longer conversation. Discover the people, ideas and personal journeys behind the festival through these video conversations from Hello Hindustan’s 2025 archive.</p>
 <div class="ilf-media-rail ilf-wrap" aria-label="Video conversations" tabindex="0">
 @foreach($homeMedia['conversations'] as $item)
 <a class="ilf-listen-card" href="https://www.youtube.com/watch?v={{ $item['id'] }}">
 <div class="ilf-listen-cover"><img src="https://i.ytimg.com/vi/{{ $item['id'] }}/hqdefault.jpg" alt="Video thumbnail: {{ $item['title'] }}" width="480" height="360" loading="lazy" referrerpolicy="no-referrer"><span aria-hidden="true">▷</span></div>
 <small>VIDEO CONVERSATION · {{ $item['duration'] }}</small><h3>{{ $item['title'] }}</h3><p>{{ $item['person'] }}</p><span class="ilf-text-link">Listen & watch on YouTube ↗</span>
 </a>
 @endforeach
 </div><p class="ilf-media-note">Recorded festival conversations on YouTube.</p><a class="ilf-button" href="https://www.youtube.com/@indorelitfest/videos">Explore All Conversations ↗</a>
</section>
<section id="watch-sessions" class="ilf-media-section ilf-sessions ilf-section">
 @include('frontend.partials.ilf-heading',['overline'=>'Watch','heading'=>'Our sessions!'])
 <p class="ilf-intro">A story, a poem, a fresh point of view. Revisit these recordings from the 2025 Indore Literature Festival, published by Hello Hindustan.</p>
 <div class="ilf-session-grid ilf-wrap">
 @foreach($homeMedia['sessions'] as $item)
 <a class="ilf-session-card" href="https://www.youtube.com/watch?v={{ $item['id'] }}">
 <div><img src="https://i.ytimg.com/vi/{{ $item['id'] }}/hqdefault.jpg" alt="Video thumbnail: {{ $item['title'] }}" width="480" height="360" loading="lazy" referrerpolicy="no-referrer"><span class="ilf-session-play" aria-hidden="true">▶</span><small>{{ $item['duration'] }}</small></div>
 <h3 lang="hi">{{ $item['title'] }}</h3><p>{{ $item['person'] }}</p><span>2025 ARCHIVE · WATCH ON YOUTUBE ↗</span>
 </a>
 @endforeach
 </div><a class="ilf-button" href="https://www.youtube.com/@indorelitfest/videos">Explore All Videos ↗</a>
</section>
@include('frontend.partials.ilf-chapter-transition',['scene'=>'river'])
<section id="attendees" class="ilf-attendees ilf-section">
 @include('frontend.partials.ilf-heading',['overline'=>'What our attendees','heading'=>'Say'])
 <p class="ilf-intro">Different people. A shared love for the festival. Audience reflections reported by Agniban after the 2025 edition.</p>
 <div class="ilf-attendee-grid ilf-wrap">
 @foreach($homeMedia['attendees'] as $item)
 <article>@if(!empty($item['image']))<img class="attendee-note" src="{{ $image($item['image']) }}" alt="{{ $item['image_alt'] }}" loading="lazy">@else<span class="ilf-attendee-initial" aria-hidden="true">{{ $item['initial'] }}</span>@endif<p>{{ $item['text'] }}</p><h3>{{ $item['name'] }}</h3><small>2025 festival attendee</small>@if(!empty($item['video_url']))<p><a class="ilf-text-link" href="{{ $item['video_url'] }}" target="_blank" rel="noopener">Watch their experience ↗</a></p>@endif</article>
 @endforeach
 </div><p class="ilf-media-note">Summaries of published attendee comments, not verbatim quotations.</p><a class="ilf-text-link" href="{{ $homeMedia['attendee_source'] }}">Read the original audience comments · Agniban ↗</a>
</section>
<section id="news-updates" class="ilf-news ilf-section">
 @include('frontend.partials.ilf-heading',['overline'=>'News and','heading'=>'Updates'])
 <p class="ilf-intro">The latest festival announcement, alongside reporting and perspectives from previous editions.</p>
 <div class="ilf-news-grid ilf-wrap">
 <article class="ilf-news-announcement"><span class="ilf-news-source">FESTIVAL ANNOUNCEMENT</span><p class="ilf-news-date">12TH EDITION · 2026</p><h3>Three days. A new chapter for Indore.</h3><p>{{ $festival['dates'] }}<br>{{ $festival['venue'] }}<br>Registration and participation forms are available.</p><a class="ilf-text-link" href="{{ $festival['forms'][0]['url'] }}">Register to Attend ↗</a></article>
 @foreach($homeMedia['news'] as $item)
 <article><span class="ilf-news-source">{{ $item['source'] }}</span><p class="ilf-news-date">{{ $item['date'] }}</p><h3>{{ $item['title'] }}</h3><p>{{ $item['copy'] }}</p><a class="ilf-text-link" href="{{ $item['url'] }}">Read the coverage ↗</a></article>
 @endforeach
 </div>
</section>

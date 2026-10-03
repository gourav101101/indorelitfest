@php($homeMedia = require resource_path('data/home-media.php'))
<section id="watch-sessions" class="container section media-session-library">
 <div class="section-heading"><div><p class="eyebrow">WATCH THE FESTIVAL</p><h2>Our <em>sessions!</em></h2></div></div>
 <p class="media-session-intro">A story, a poem, a fresh point of view. Revisit these recordings from the 2025 Indore Literature Festival, published by Hello Hindustan.</p>
 <div class="media-session-grid">
 @foreach($homeMedia['sessions'] as $item)
 <a class="media-session-card" href="https://www.youtube.com/watch?v={{ $item['id'] }}">
 <div><img src="https://i.ytimg.com/vi/{{ $item['id'] }}/hqdefault.jpg" alt="Video thumbnail: {{ $item['title'] }}" width="480" height="360" loading="lazy" referrerpolicy="no-referrer"><span class="ilf-session-play" aria-hidden="true">▶</span><small>{{ $item['duration'] }}</small></div>
 <h3 lang="hi">{{ $item['title'] }}</h3><p>{{ $item['person'] }}</p><span>2025 ARCHIVE · WATCH ON YOUTUBE ↗</span>
 </a>
 @endforeach
 </div><a class="button button-blue" href="https://www.youtube.com/@indorelitfest/videos">Explore All Videos ↗</a>
</section>

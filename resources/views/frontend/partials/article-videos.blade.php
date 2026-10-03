@if($articleVideos)
<section class="container section article-watch" aria-labelledby="article-watch-title">
 <div class="section-heading"><div><p class="eyebrow">FROM THE STAGE TO THE SCREEN</p><h2 id="article-watch-title">{{ $articleVideos['heading'] }}</h2></div></div>
 <p class="article-watch-intro">{{ $articleVideos['description'] }}</p>
 <div class="article-watch-grid">
 @foreach($articleVideos['videos'] as $video)
 <a class="article-watch-card" href="{{ $video['url'] }}" target="_blank" rel="noopener noreferrer">
  <div class="article-watch-cover"><img src="{{ asset($video['thumbnail']) }}" alt="" width="480" height="360" loading="lazy"><span class="article-watch-play" aria-hidden="true">&#9654;</span><span class="article-watch-duration">{{ $video['duration'] }}</span></div>
  <div class="article-watch-copy"><h3>{{ $video['title'] }}</h3><span>Watch on YouTube &#8599;<span class="sr-only"> (opens in a new tab)</span></span></div>
 </a>
 @endforeach
 </div>
</section>
@endif
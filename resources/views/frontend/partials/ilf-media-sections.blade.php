@php($homeMedia = require resource_path('data/home-media.php'))
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
 </div>
 <div class="listen-actions ilf-wrap">
  <div class="listen-actions-copy"><span>KEEP THE CONVERSATION GOING</span><p>More voices. More stories to discover.</p></div>
  <div class="listen-actions-links">
   <a class="ilf-button" href="https://www.youtube.com/@indorelitfest/videos">Explore All Conversations &#8599;</a>
   <a class="ilf-text-link" href="{{ route('media') }}#watch-sessions">Festival sessions in the Media Room &#8599;</a>
  </div>
 </div>
</section>


<section id="attendees" class="ilf-attendees ilf-section">
 @include('frontend.partials.memory-garden-branches')
 @include('frontend.partials.ilf-heading',['overline'=>'What our attendees','heading'=>'Say'])
 <p class="ilf-intro">In their own words. Handwritten memories and experiences from our festival community.</p>
 @php($feedback = json_decode(file_get_contents(resource_path('data/client-media-2026-09.json')),true)['experiences'])
 <div class="ilf-wrap client-feedback feedback-wall">
 <div class="feedback-stage">
 <figure class="feedback-film">
 <div class="feedback-film-label"><span aria-hidden="true">&#9654;</span> A LITTLE FILM. A LOT OF FEELING.</div>
 <video controls playsinline preload="metadata" aria-label="Handwritten festival memories, a 36-second film"><source src="{{ asset('videos/ilf-attendee-experiences.mp4') }}" type="video/mp4"><a href="{{ asset('videos/ilf-attendee-experiences.mp4') }}">Watch the festival experience video</a></video>
 <figcaption>Little notes. Lasting memories.<span>From our community, with love.</span></figcaption>
 </figure>
 <div class="feedback-notes" aria-label="Handwritten festival memories" tabindex="0">
 @foreach(array_intersect_key($feedback,array_flip([0,8,13,17])) as $photo)
 <button class="feedback-note" type="button" data-lightbox="{{ $image($photo['image']) }}" data-caption="Handwritten festival feedback" aria-label="Read festival memory {{ $loop->iteration }}">
 <img src="{{ $image($photo['image']) }}" alt="Handwritten messages from festival visitors, photo {{ $loop->iteration }}" width="800" height="600" loading="lazy"><span>Notes from the festival <b aria-hidden="true">&#8599;</b></span>
 </button>
 @endforeach
 </div>
 </div>
 <p class="feedback-hint">Tap a note to read it up close.</p>
 <details class="feedback-more"><summary>Open the memory wall <span>17 more photographs</span></summary>@include('frontend.partials.client-photo-grid',['photos'=>array_diff_key($feedback,array_flip([0,8,13,17])),'caption'=>'Handwritten festival feedback'])</details>
 </div>
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

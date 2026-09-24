<section id="books" class="ilf-feature ilf-books">
    <div class="ilf-wrap ilf-feature-grid">
        <div class="ilf-feature-art ilf-feature-art-books">
            <div class="ilf-feature-image"><img src="{{ $image('images/conversation-art.png') }}" alt="Conceptual illustration of readers and literary conversation" width="800" height="800" loading="lazy"></div>
            <span class="ilf-art-caption"><small>STORIES BRING US TOGETHER</small><b lang="hi">शब्दों से जुड़ते रिश्ते</b></span>
        </div>
        <div>@include('frontend.partials.ilf-heading',['overline'=>'A place for books &','heading'=>'New ideas'])<p>Every writer begins with a question, a memory or a story waiting to be told. At Indore Literature Festival, established authors and emerging voices share the same spirit of discovery.</p><p>Explore reflections on the craft of writing, the changing world of literature and the journeys of new authors in our festival journal. Publishers, booksellers and creative exhibitors can also connect with the team through the 2026 stall booking form.</p><div class="ilf-feature-actions"><a class="ilf-button" href="{{ route('article','budding-authors') }}">Discover New Voices ➜</a><a class="ilf-text-link" href="{{ $festival['forms'][2]['url'] }}">Book a stall ↗</a></div></div>
    </div>
</section>
<section id="music" class="ilf-feature ilf-music">
    <img class="ilf-ujjain-accent" src="{{ asset('images/ujjain-linework.svg') }}" width="220" height="340" alt="" aria-hidden="true" loading="lazy">
    <div class="ilf-wrap ilf-feature-grid">
        <div>@include('frontend.partials.ilf-heading',['overline'=>'Beyond the written word','heading'=>'Music & poetry'])<p>A song can hold a story. A poem can change the mood of an entire room. Music, poetry and performance are woven into the festival’s celebration of expression.</p><p>Revisit the words and reflections surrounding Rahgir’s appearance in our festival archive, explore past performances, or bring your own voice to the 2026 open mic. The new performance schedule will be shared when it is announced.</p><div class="ilf-feature-actions"><a class="ilf-button" href="{{ route('article','rahagir') }}">Read the Festival Story ➜</a><a class="ilf-text-link" href="{{ $festival['forms'][1]['url'] }}">Open mic form ↗</a></div></div>
        <div class="ilf-feature-art ilf-feature-art-music">
            <div class="ilf-feature-image"><img src="{{ $image('legacy/images/daythree/daythree13.jpeg') }}" alt="A performance from the 2025 Indore Literature Festival" width="800" height="800" loading="lazy"></div>
            <span class="ilf-art-caption"><small>THE STAGE COMES ALIVE</small><b lang="hi">सुर, शब्द और संवेदना</b></span>
        </div>
    </div>
</section>
@include('frontend.partials.ilf-chapter-transition',['scene'=>'literary'])
<section id="memories" class="ilf-moments ilf-section">
    @include('frontend.partials.ilf-heading',['overline'=>'A festival full of','heading'=>'Living memories'])
    <p class="ilf-intro">The full house, the quiet listener, the conversation that keeps going. Look back at people and moments from our festival archive, and imagine being part of the next chapter.</p>
    <div class="ilf-memory-ribbon">
    @foreach(['dayone/dayone5.jpeg','dayone/dayone4.jpeg','daytwo/daytwo2.jpeg','slideshow-main/6.jpg'] as $i=>$photo)
        <button type="button" data-lightbox="{{ $image('legacy/images/'.$photo) }}" data-caption="{{ $i===3?'From the Indore Literature Festival archive':'Indore Literature Festival · 2025' }}" aria-label="Enlarge festival memory {{ $i+1 }}"><img src="{{ $image('legacy/images/'.$photo) }}" alt="{{ ['Festival audience applauding','Visitors gathering in the festival grounds','Musicians performing on the festival stage','A literary conversation'][$i] }}" width="700" height="550" loading="lazy"><span>{{ ['The joy of being there','Between the sessions','The stage comes alive','Conversations that stay'][$i] }} <i aria-hidden="true">↗</i></span></button>
    @endforeach
    </div>
    <a class="ilf-button" href="{{ route('gallery') }}">Explore the Photo Archive ➜</a>
</section>
<section id="visit-indore" class="ilf-feature ilf-venue">
    <div class="ilf-wrap ilf-feature-grid">
        <div class="ilf-venue-card"><svg viewBox="0 0 260 200" aria-hidden="true"><use href="#ilf-palace"/></svg><span>YOUR NOVEMBER PLANS</span><strong>27 · 28 · 29</strong><p>NOVEMBER 2026</p><hr><h3>Daly College, Indore</h3><p>12th Indore Literature Festival</p><a class="ilf-text-link" href="https://www.google.com/maps/search/?api=1&query=Daly+College+Indore">Find the venue on Maps ↗</a></div>
        <div>@include('frontend.partials.ilf-heading',['overline'=>'We’ll see you in','heading'=>'Indore'])<p>Three days of literature, art and conversation await at Daly College. Make room for a favourite writer, an unfamiliar idea and the joy of discovering something together.</p><p>Register through the official festival form, explore our visitor information, and speak with the organising team about group visits or accessibility requirements before you travel.</p><div class="ilf-feature-actions"><a class="ilf-button" href="{{ route('visit') }}">Plan Your Visit ➜</a><a class="ilf-text-link" href="{{ route('contact') }}">Ask the team ↗</a></div><p class="ilf-venue-note">The 2026 programme and entry timings will be announced separately.</p></div>
    </div>
    <img class="ilf-narmada-art" src="{{ $image('images/narmada-heritage-divider.png') }}" width="2172" height="724" alt="" aria-hidden="true" loading="lazy">
</section>

@extends('frontend.layouts.app')
@section('content')
@include('frontend.partials.page-heading',[
    'kicker'=>'ELEVEN EDITIONS. AN ENDURING LITERARY LEGACY.',
    'intro'=>'Since 2015, bringing writers, poets, artists and readers together through literature, expression and the exchange of ideas.'
])
<section class="container section about-lead">
    <img src="{{ $image('legacy/images/slideshow-main/6.jpg') }}" alt="A conversation on stage at Indore Literature Festival" width="1000" height="620">
    <div>
        <p class="eyebrow">LET THE LEGACY OF LITERATURE GROW</p>
        <h2>A shared passion.<br><em>An enduring legacy.</em></h2>
        <p>Indore Literature Festival celebrates the many ways stories connect us. Since 2015, writers, poets, artists and readers have come together to share their work, exchange ideas and discover perspectives beyond their own.</p>
        <p>Across eleven editions, established voices and emerging talent have shared a platform for conversation, debate, poetry, storytelling, theatre and music. The festival's legacy lives in these encounters: between generations, across languages, and in the stories readers carry home.</p>
        <p>As we look towards the 12th edition, our purpose remains the same: to nurture a love for art and literature, especially among young people, and make room for different voices.</p>
    </div>
</section>
<section class="container section">
    <p class="eyebrow">THE VOICES BEHIND THE LEGACY</p>
    <h2>A living literary legacy.</h2>
    <p>From Ruskin Bond and Javed Akhtar to Shabana Azmi, Amish Tripathi, Gopaldas Neeraj and many more, our past guests have opened new ways of reading, listening and thinking. Their conversations are part of a shared journey that continues with every edition.</p>
    <a class="button button-blue" href="{{ route('speakers.archive') }}">Our past speakers &#8599;</a>
</section>
<section class="container about-content">
    <article>
        <span class="eyebrow">01 / THE PEOPLE &amp; THE PURPOSE</span>
        <h2>Keeping literature part of everyday life.</h2>
        <p>The Indore Literary Program Organizing Society (ILPOS) organises the festival with a commitment to celebrating and conserving art, culture and literature. Its purpose is to bring these into people's lives through participation, discovery and a shared love of stories.</p>
        <p>Encouraging young readers and writers is central to that work. By creating opportunities to listen, question and express themselves, the society helps a new generation find its place in the literary conversation.</p>
    </article>
    <article>
        <span class="eyebrow">02 / THE FESTIVAL EXPERIENCE</span>
        <h2>Many forms of expression. A shared space.</h2>
        <p>Literature comes alive through more than the printed page. At ILF, discussions and debates sit alongside poetry readings, storytelling, interviews, theatre and music.</p>
        <p>These different forms invite people of different ages and interests to take part. A reader can meet a favourite author, discover an unfamiliar voice, or leave a conversation with a new question. Together, these experiences sustain a community united by its curiosity and love for literature.</p>
        <a class="text-link" href="{{ route('experiences') }}">Inside the festival &#8599;</a>
    </article>
    <article>
        <span class="eyebrow">03 / CONCEPT &amp; PRODUCTION</span>
        <h2>Hello Hindustan.</h2>
        <p>Hello Hindustan News &amp; Network brings its work in journalism, publishing and storytelling to the concept and production of the festival.</p>
        <p>Alongside the live programme, its recorded festival conversations allow readers and listeners to return to ideas, discover speakers and continue exploring after an edition has ended.</p>
        <a class="text-link" href="{{ route('media') }}">Explore the Media Room &#8599;</a>
    </article>
    <article>
        <span class="eyebrow">04 / THE FOUNDER</span>
        <h2>Pravin Sharma &#183; Festival Producer</h2>
        <img class="founder-photo" src="{{ $image('legacy/images/pravin_sharma.jpg') }}" alt="Pravin Sharma" width="180" height="200" loading="lazy">
        <p>Pravin Sharma founded Indore Literature Festival in 2015. His work with Hello Hindustan and the Indore Literary Program Organizing Society brings together publishing, cultural programming and a commitment to literature.</p>
        <p>The festival carries that purpose forward by creating space for established authors, emerging writers and the readers who give their stories a life beyond the stage.</p>
    </article>
</section>
<section id="artwork-credits" class="container section">
<details class="artwork-credits"><summary>Artwork credits</summary><p>AI-assisted watercolor montage based on the credited portraits below. Illustration adaptation shared under CC BY-SA 4.0.</p><ul>@foreach($rotatingSpeakers as $voice)@isset($voice['portrait'])<li>{{ $voice['name'] }}: {{ $voice['portrait']['credit'] }} · <a href="{{ $voice['portrait']['source'] }}" target="_blank" rel="noopener">Source</a> · <a href="{{ $voice['portrait']['license_url'] }}" target="_blank" rel="noopener">{{ $voice['portrait']['license'] }}</a>. Adapted into a watercolor illustration.</li>@endisset
@endforeach<li>Manoj Muntashir: ILF 2024 speaker brochure.</li>@foreach($featuredSpeakers as $person)@isset($person['portrait'])<li>{{ $person['name'] }}: {{ $person['portrait']['credit'] }} · <a href="{{ $person['portrait']['source'] }}" target="_blank" rel="noopener">Source</a> · <a href="{{ $person['portrait']['license_url'] }}" target="_blank" rel="noopener">{{ $person['portrait']['license'] }}</a>. {{ $person['portrait']['changes'] }}</li>@endisset @endforeach</ul></details>
</section>
@endsection
@unless(request()->routeIs('home'))
@include('frontend.partials.youtube-milestone')
@endunless
<footer class="ilf-footer">
<div class="ilf-social"><p>Connect with us</p>@foreach(['instagram'=>'Instagram','facebook'=>'Facebook','youtube'=>'YouTube','twitter'=>'X'] as $key=>$label)<a href="{{ $festival[$key] }}" aria-label="{{ $label }}">@include('frontend.partials.social-icon',['network'=>$key]) {{ $label }} ↗</a>@endforeach</div>
<div class="ilf-footer-grid ilf-wrap">
<div class="ilf-produced"><img src="{{ asset('images/indore-literature-festival-badge.png') }}" alt="Indore Literature Festival" width="160" height="160" loading="lazy"><p>Produced by</p><img class="producer-logo" src="{{ asset('images/hello-hindustan-source-logo.png') }}" alt="हेलो हिन्दुस्तान — Hello Hindustan" width="572" height="148" loading="lazy"><p>Hello Hindustan News & Network</p><small>An initiative of Indore Literary Program Organizing Society</small></div>
<div><h2>About Us</h2><a href="{{ route('about') }}">About the festival</a><a href="{{ route('gallery') }}">Festival archive</a><a href="{{ route('contact') }}">Contact us</a><a href="{{ route('faq') }}">FAQs</a></div>
<div><h2>Explore</h2><a href="{{ route('speakers') }}">Speakers</a><a href="{{ route('schedule') }}">Programme archive</a><a href="{{ route('journal') }}">Festival journal</a><a href="{{ route('malwa') }}">Discover Malwa</a><a href="{{ route('media') }}">Media room</a></div>
<div><h2>Join the Festival</h2>@foreach($festival['forms'] as $form)<a href="{{ $form['url'] }}">{{ $form['name'] }}</a>@endforeach</div>
<div><h2>Let’s Connect</h2><a href="mailto:{{ $festival['email'] }}">{{ $festival['email'] }}</a><a href="mailto:{{ $festival['secondary_email'] }}">{{ $festival['secondary_email'] }}</a><a href="tel:+919425410345">{{ $festival['phone'] }}</a><p>{{ $festival['address'] }}</p><p><strong>{{ $festival['dates'] }}</strong><br>{{ $festival['venue'] }}</p><a href="{{ route('contact') }}">Get in touch ➜</a></div>
</div><div class="ilf-footer-bottom">© {{ date('Y') }} Indore Literature Festival · All rights reserved.<span>Let the legacy of literature grow.</span></div>
</footer>

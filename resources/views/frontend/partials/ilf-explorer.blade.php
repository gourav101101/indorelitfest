<section class="ilf-explorer" aria-labelledby="explorer-title">
 <img class="ilf-food-ornament ilf-food-poha ilf-food-explorer-one" src="{{ asset('images/indore-poha-ornament-v2.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
 <img class="ilf-food-ornament ilf-food-jalebi ilf-food-explorer-two" src="{{ asset('images/indore-jalebi-ornament.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
 <img class="ilf-food-ornament ilf-food-jalebi ilf-food-explorer-three" src="{{ asset('images/indore-jalebi-ornament.webp') }}" width="512" height="512" alt="" aria-hidden="true" loading="lazy">
 <div class="ilf-explorer-controls"><span class="ilf-orbit-deco ilf-orbit-deco-left"><svg viewBox="0 0 190 105" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"><path d="M170 20 C134 38 96 67 61 94"/><path d="M84 92 L61 94 L66 72"/></svg></span><div class="ilf-orbit-caption" data-orbit-caption aria-label="Meet the Voices"><svg viewBox="0 0 280 85" aria-hidden="true"><defs><path id="ilf-explorer-title-arc" d="M20 75 Q140 -5 260 75"/></defs><text><textPath href="#ilf-explorer-title-arc" startOffset="50%" text-anchor="middle" data-orbit-title>Meet the Voices</textPath></text></svg></div><span class="ilf-orbit-deco ilf-orbit-deco-right"><svg viewBox="0 0 190 105" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20 C56 38 94 67 129 94"/><path d="M106 92 L129 94 L124 72"/></svg></span></div>
 <div class="ilf-orbit" role="navigation" aria-label="Explore the festival">
  <div class="ilf-orbit-centre" aria-hidden="true"></div>
  @foreach([
   ['Meet the Voices',route('speakers.archive'),'voices'],
   ['On the Programme',route('schedule'),'programme'],
   ['Festival Moments',route('gallery'),'moments'],
   ['Plan Your Visit',route('visit'),'visit'],
   ['Take Part','#registration','join']
  ] as $item)
  <a class="ilf-orbit-link" href="{{ $item[1] }}" data-orbit-label="{{ $item[0] }}" @if($item[2]==='voices') data-orbit-voices aria-label="Illustrated festival voices — Ruskin Bond, Javed Akhtar, Manoj Muntashir and Malini Awasthi" @endif style="--tile:{{ $loop->index }}">
   <span class="ilf-orbit-painting" aria-hidden="true">@if($item[2]==='voices')<img class="orbit-speaker-art" src="{{ asset('images/four-speaker-watercolor-2026.webp') }}" alt="" width="1000" height="1000" loading="lazy">@endif</span><span>{{ $item[0] }}</span>
  </a>
  @endforeach
 </div>


</section>

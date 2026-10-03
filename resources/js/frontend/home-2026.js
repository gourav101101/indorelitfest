const home = document.querySelector('.ilf-home');
if (home && 'IntersectionObserver' in window) {
  const targets = home.querySelectorAll('.ilf-heading,.ilf-prose,.ilf-film-card,.ilf-intro,.ilf-registration-card,.ilf-speaker,.ilf-feature-art,.ilf-venue-card,.ilf-memory-ribbon button,.ilf-journal-grid .article-card');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('ilf-awaiting');
      observer.unobserve(entry.target);
    }
  }), {threshold:0.06,rootMargin:'0px 0px 35px 0px'});
  targets.forEach((target,index) => {
    target.classList.add('ilf-motion-target');
    target.style.setProperty('--reveal-delay', (target.matches('.ilf-registration-card,.ilf-speaker') ? index % 3 * 75 : 0) + 'ms');
    if (target.getBoundingClientRect().top > innerHeight) target.classList.add('ilf-awaiting');
    observer.observe(target);
  });

}
// Homepage-specific controls. The carousel never auto-advances.
document.querySelectorAll('.ilf-nav-menu').forEach(menu => {
  menu.addEventListener('toggle', () => {
    if (menu.open) document.querySelectorAll('.ilf-nav-menu').forEach(other => { if (other !== menu) other.open = false; });
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
});
document.addEventListener('click', event => {
  document.querySelectorAll('.ilf-nav-menu[open]').forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.ilf-nav-menu[open]').forEach(menu => {
    const focused = menu.contains(document.activeElement);
    menu.open = false;
    if (focused && !window.matchMedia('(max-width: 1180px)').matches) menu.querySelector('summary').focus();
  });
});
document.querySelectorAll('[data-ilf-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('[data-ilf-slide]')];
  const controls = carousel.querySelector('.ilf-carousel-controls');
  const pagination = document.createElement('div');
  pagination.className = 'ilf-carousel-dots';
  pagination.setAttribute('role', 'group');
  pagination.setAttribute('aria-label', 'Choose a festival experience');
  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show ' + slide.querySelector('h3').textContent);
    dot.addEventListener('click', () => show(index));
    pagination.append(dot);
    return dot;
  });
  carousel.append(pagination);
  let active = 0;
  function show(index) {
    active = (index + slides.length) % slides.length;
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === active)));
    slides.forEach((slide, i) => {
      const offset = (i - active + slides.length) % slides.length;
      const slot = offset > slides.length / 2 ? offset - slides.length : offset;
      slide.style.setProperty('--slot', slot);
      slide.classList.toggle('is-active', i === active);
      slide.querySelector('a').tabIndex = i === active ? 0 : -1;
      slide.setAttribute('aria-hidden', String(i !== active));
    });
    carousel.querySelector('[data-ilf-status]').textContent = slides[active].querySelector('h3').textContent + ' · ' + (active + 1) + ' / ' + slides.length;
  }
  carousel.classList.add('is-enhanced');
  controls.hidden = false;
  show(0);
  carousel.querySelector('[data-ilf-prev]').addEventListener('click', () => show(active - 1));
  carousel.querySelector('[data-ilf-next]').addEventListener('click', () => show(active + 1));
  carousel.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const focusOnSlide = document.activeElement.closest('[data-ilf-slide]');
    show(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : active + (event.key === 'ArrowRight' ? 1 : -1));
    if (focusOnSlide) slides[active].querySelector('a').focus({preventScroll:true});
  });
  slides.forEach((slide, index) => slide.querySelector('a').addEventListener('click', event => {
    if (index !== active) { event.preventDefault(); show(index); }
  }));
  const track = carousel.querySelector('.ilf-experience-track');
  let gesture;
  let suppressClick = false;
  carousel.addEventListener('dragstart', event => event.preventDefault());
  track.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    gesture = {id:event.pointerId,x:event.clientX,y:event.clientY};
  });
  window.addEventListener('pointermove', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 12) { reset(); return; }
    if (Math.abs(dx) > 8) {
      carousel.classList.add('is-dragging');
      track.style.setProperty('--drag-offset', Math.max(-65, Math.min(65, dx * .3)) + 'px');
    }
  });
  function reset() {
    gesture = null;
    carousel.classList.remove('is-dragging');
    track.style.removeProperty('--drag-offset');
  }
  window.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    const dragged = Math.abs(dx) > 8;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) show(active + (dx < 0 ? 1 : -1));
    reset();
    if (dragged) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
  });
  window.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  carousel.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
});

// Progressive scenic slideshow. The first illustration works without JavaScript.
const scenicHero = document.querySelector('.ilf-hero');
if (scenicHero) {
  const scenes = [...scenicHero.querySelectorAll('[data-hero-scene]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, visible = false, request = 0;
  const allowed = () => visible && !document.hidden && !reduced.matches && document.documentElement.classList.contains('motion-enabled');
  const ready = image => {
    if (!image.src && image.dataset.src) image.src = image.dataset.src;
    return image.decode().then(() => true).catch(() => false);
  };
  function schedule() {
    clearTimeout(timer);
    scenicHero.classList.toggle('is-scenery-visible', allowed());
    if (allowed()) timer = setTimeout(() => select((current + 1) % scenes.length, true), 12000);
  }
  async function select(index, automatic = false) {
    clearTimeout(timer);
    const token = ++request;
    if (!await ready(scenes[index]) || token !== request || (automatic && !allowed())) { schedule(); return; }
    current = index;
    scenes.forEach((scene, i) => scene.classList.toggle('is-current', i === index));
    schedule();
  }
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, {threshold:.15}).observe(scenicHero);
  new MutationObserver(schedule).observe(document.documentElement, {attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
}

// Illustrated explorer: premium circular transitions with bloom entrance.
const explorer=document.querySelector('.ilf-explorer');
if(explorer){
 const orbit=explorer.querySelector('.ilf-orbit'),links=[...orbit.querySelectorAll('a')],caption=explorer.querySelector('[data-orbit-caption]');
 const mobile=matchMedia('(max-width:700px)'),reduce=matchMedia('(prefers-reduced-motion:reduce)');
 let turn=0,index=0,focus=false,visible=false,timer,bloomed=false;
 function label(){caption.querySelector('[data-orbit-title]').textContent=links[index].dataset.orbitLabel;caption.setAttribute('aria-label',links[index].dataset.orbitLabel);}
 function paint(){
  index=((turn%5)+5)%5;
  links.forEach((link,i)=>{
   const a=i*72-turn*72;
   const s=1;
   link.style.transform='rotate('+a+'deg) translateY(-131px) rotate('+(-a)+'deg) scale('+s+')';
   link.classList.toggle('is-current',i===index);
   link.tabIndex=mobile.matches||i===index?0:-1;
  });
  label();
 }
 function allowed(){return visible&&!focus&&!mobile.matches&&!reduce.matches&&!document.hidden&&document.documentElement.classList.contains('motion-enabled');}
 function sync(){clearTimeout(timer);if(allowed())timer=setTimeout(()=>{turn++;paint();sync();},3000);}
 function step(dir){if(mobile.matches){index=(index+dir+5)%5;orbit.scrollTo({left:links[index].offsetLeft-(orbit.clientWidth-links[index].offsetWidth)/2,behavior:reduce.matches?'instant':'smooth'});label();}else{turn+=dir;paint();}sync();}
 const prevBtn=explorer.querySelector('[data-orbit-prev]'),nextBtn=explorer.querySelector('[data-orbit-next]');
 if(prevBtn)prevBtn.addEventListener('click',()=>step(-1));if(nextBtn)nextBtn.addEventListener('click',()=>step(1));
 links.forEach(link=>link.addEventListener('click',event=>{
  if(!mobile.matches&&!link.classList.contains('is-current'))event.preventDefault();
 }));
 explorer.addEventListener('focusin',()=>{focus=true;sync();});explorer.addEventListener('focusout',e=>{if(!explorer.contains(e.relatedTarget)){focus=false;sync();}});
 orbit.addEventListener('scroll',()=>{if(mobile.matches){index=links.reduce((best,link,i)=>Math.abs(link.offsetLeft+link.offsetWidth/2-orbit.scrollLeft-orbit.clientWidth/2)<Math.abs(links[best].offsetLeft+links[best].offsetWidth/2-orbit.scrollLeft-orbit.clientWidth/2)?i:best,0);label();}},{passive:true});
 // Bloom entrance: staggered petal reveal on first visibility
 function triggerBloom(){
  if(bloomed||mobile.matches||reduce.matches)return;
  bloomed=true;
  links.forEach((link,i)=>{
   link.style.setProperty('--bloom-from',(i*72+90)+'');
   link.style.setProperty('--orbit-r',(i*72-turn*72)+'deg');
   link.style.setProperty('--orbit-r-inv',(-(i*72-turn*72))+'deg');
   link.style.setProperty('--orbit-s','1');
  });
  explorer.classList.add('orbit-blooming');
  setTimeout(()=>{explorer.classList.remove('orbit-blooming');links.forEach(l=>{l.style.removeProperty('--bloom-from');l.style.removeProperty('--orbit-r');l.style.removeProperty('--orbit-r-inv');l.style.removeProperty('--orbit-s');});},1200);
 }
 new IntersectionObserver(entries=>{const was=visible;visible=entries[0].isIntersecting;if(!was&&visible)triggerBloom();sync();},{threshold:.15}).observe(explorer);
 new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',sync);mobile.addEventListener('change',()=>{paint();sync();});reduce.addEventListener('change',sync);
 paint();explorer.classList.add('is-orbit-ready');
}

// Hero countdown timer
const countdown = document.querySelector('.ilf-countdown');
if (countdown) {
  const target = new Date(countdown.dataset.ilfTarget).getTime();
  const blocks = {
    days: countdown.querySelector('[data-unit="days"] span'),
    hours: countdown.querySelector('[data-unit="hours"] span'),
    minutes: countdown.querySelector('[data-unit="minutes"] span'),
    seconds: countdown.querySelector('[data-unit="seconds"] span'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function paintDigits(element, value) {
    element.classList.add('ilf-countdown-value');
    element.replaceChildren(...[...value].map(character => {
      const digit = document.createElement('span');
      digit.className = 'ilf-countdown-digit';
      const current = document.createElement('span');
      current.className = 'ilf-digit-current';
      current.textContent = character;
      digit.append(current);
      return digit;
    }));
    element.dataset.value = value;
    element.setAttribute('aria-label', value);
  }

  function updateUnit(element, value) {
    if (element.dataset.value === value) return;
    const digits = [...element.querySelectorAll(':scope > .ilf-countdown-digit')];
    const animate = element.dataset.value && digits.length === value.length && !matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.classList.contains('motion-enabled');
    if (!animate) {
      paintDigits(element, value);
      return;
    }

    [...value].forEach((character, index) => {
      const digit = digits[index];
      const current = digit.querySelector('.ilf-digit-current');
      if (current.textContent === character) return;
      const outgoing = current.cloneNode(true);
      outgoing.className = 'ilf-digit-old';
      outgoing.setAttribute('aria-hidden', 'true');
      digit.append(outgoing);
      digit.classList.add('is-preparing');
      current.textContent = character;
      digit.classList.remove('is-flipping');
      void digit.offsetWidth;
      digit.classList.add('is-flipping');
      digit.classList.remove('is-preparing');
      setTimeout(() => {
        outgoing.remove();
        digit.classList.remove('is-flipping');
      }, 560);
    });
    element.dataset.value = value;
    element.setAttribute('aria-label', value);
  }

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      countdown.classList.add('is-arrived');
      countdown.querySelector('.ilf-countdown-label').textContent = 'The festival is here! 🎉';
      return;
    }
    updateUnit(blocks.days, pad(Math.floor(diff / 86400000)));
    updateUnit(blocks.hours, pad(Math.floor((diff % 86400000) / 3600000)));
    updateUnit(blocks.minutes, pad(Math.floor((diff % 3600000) / 60000)));
    updateUnit(blocks.seconds, pad(Math.floor((diff % 60000) / 1000)));
  }

  tick();
  setInterval(tick, 1000);
}


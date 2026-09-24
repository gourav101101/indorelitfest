const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
try { userPaused = localStorage.getItem('ilf-motion-paused') === 'true'; } catch { /* Storage is optional. */ }
const motionButton = document.createElement('button');
motionButton.className = 'motion-toggle';
motionButton.type = 'button';
motionButton.setAttribute('aria-label', 'Pause decorative animations');
document.body.append(motionButton);
function syncMotion() {
  const active = !reducedMotion.matches && !userPaused;
  document.documentElement.classList.toggle('motion-enabled', active);
  motionButton.textContent = active ? 'Ⅱ Pause motion' : '▷ Motion paused';
  motionButton.setAttribute('aria-pressed', String(!active));
  motionButton.setAttribute('aria-label', active ? 'Pause decorative animations' : 'Enable decorative animations');
  motionButton.hidden = reducedMotion.matches;
}
motionButton.addEventListener('click', () => {
  userPaused = !userPaused;
  try { localStorage.setItem('ilf-motion-paused', String(userPaused)); } catch { /* Keep preference for this page. */ }
  syncMotion();
});
reducedMotion.addEventListener('change', syncMotion);
syncMotion();

const strip = document.querySelector('.culture-strip');
if (strip) {
  const track = document.createElement('div');
  track.className = 'marquee-track';
  const items = [...strip.children];
  items.forEach(item => track.append(item));
  items.forEach(item => { const clone = item.cloneNode(true); clone.setAttribute('aria-hidden', 'true'); track.append(clone); });
  strip.append(track);
}

// Reveal only elements below the current viewport; the first screen never waits for JS.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
  }), {threshold:0.08});
  document.querySelectorAll('[data-reveal], .intro-art, .experience-card, .home-speakers .speaker-card, .journal-section .article-card').forEach(item => {
    item.setAttribute('data-reveal','');
    if (item.getBoundingClientRect().top > innerHeight && !reducedMotion.matches) item.classList.add('reveal-pending');
    observer.observe(item);
  });
}

const scene = document.querySelector('[data-depth-scene]');
if (scene && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let frame = 0;
  scene.addEventListener('pointermove', event => {
    if (!document.documentElement.classList.contains('motion-enabled') || frame) return;
    const x = event.clientX, y = event.clientY;
    frame = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      scene.style.setProperty('--scene-x', `${((x-rect.left)/rect.width-.5)*14}px`);
      scene.style.setProperty('--scene-y', `${((y-rect.top)/rect.height-.5)*10}px`);
      frame = 0;
    });
  }, {passive:true});
  scene.addEventListener('pointerleave', () => { scene.style.setProperty('--scene-x','0px'); scene.style.setProperty('--scene-y','0px'); });
}

document.querySelectorAll('[data-chapter-tabs], [data-experience-tabs]').forEach(section => {
  const tabs = [...section.querySelectorAll('[role=tab]')];
  const activate = target => tabs.forEach(tab => {
    const active = tab === target;
    tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const vertical = tab.closest('[role=tablist]').getAttribute('aria-orientation') === 'vertical';
      const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      if (![previousKey,nextKey,'Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = tabs[event.key==='Home' ? 0 : event.key==='End' ? tabs.length-1 : (index+(event.key===nextKey?1:-1)+tabs.length)%tabs.length];
      activate(next); next.focus();
    });
  });
  activate(tabs[0]);
});

const explore = document.querySelector('.explore-menu');
document.addEventListener('click', event => { if (explore && !explore.contains(event.target)) explore.open = false; });
document.addEventListener('keydown', event => {
  if (event.key==='Escape' && explore?.open) { explore.open=false; explore.querySelector('summary').focus(); }
});
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  if (document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false' && explore) explore.open=false;
});

// Track real document scrolling, without intercepting wheel or touch input.
const homeScenes = [...document.querySelectorAll('[data-home-scene]')];
if (homeScenes.length) {
  const progress = document.createElement('div');
  progress.className = 'chapter-progress';
  progress.setAttribute('aria-hidden','true');
  progress.append(document.createElement('span'));
  document.body.append(progress);
  const sceneLinks = [...document.querySelectorAll('.scene-navigation a')];
  let scrollFrame = 0;
  function updateChapters() {
    const header = document.querySelector('.site-header').getBoundingClientRect().height;
    const active = homeScenes.filter(scene => scene.getBoundingClientRect().top <= header + innerHeight * .35).at(-1) || homeScenes[0];
    sceneLinks.forEach(link => {
      if (link.hash === '#'+active.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const homeBottom = homeScenes.at(-1).offsetTop + homeScenes.at(-1).offsetHeight;
    const percentage = Math.min(1, Math.max(0, scrollY / Math.max(1,homeBottom-innerHeight)));
    progress.firstElementChild.style.width = `${percentage*100}%`;
    scrollFrame = 0;
  }
  function scheduleChapters() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateChapters); }
  window.addEventListener('scroll',scheduleChapters,{passive:true});
  window.addEventListener('resize',scheduleChapters);
  updateChapters();
}

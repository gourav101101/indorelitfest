document.querySelectorAll('a[href*="forms.gle"],a[href*="docs.google.com/forms/"]').forEach(link => {
  link.target = '_blank'; link.rel = 'noopener';
  link.setAttribute('aria-label', `${link.textContent.trim()} (opens Google Forms in a new tab)`);
});
document.querySelectorAll('[data-copy-form]').forEach(button => button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('[role=status]');
  try { await navigator.clipboard.writeText(button.dataset.copyForm); status.textContent = 'Link copied. Paste it into your browser.'; }
  catch { status.textContent = 'Use the form link above, or open it in your browser.'; }
}));
document.querySelectorAll('[data-open-schedule-book]').forEach(link => link.addEventListener('click', () => {
  const book = document.getElementById('schedule-flipbook');
  if (book) book.open = true;
}));
document.querySelectorAll('[data-flipbook]').forEach(book => {
  const pages = [...book.querySelectorAll('[data-book-page]')];
  if (!pages.length) return;
  const previous = book.querySelector('[data-book-prev]'), next = book.querySelector('[data-book-next]');
  const status = book.querySelector('[data-book-status]');
  const soundButton = book.querySelector('[data-book-sound]');
  const zoomButton = book.querySelector('[data-book-zoom]');
  const fullButton = book.querySelector('[data-book-fullscreen]');
  let index = 0, muted = false, audio;
  try { muted = localStorage.getItem('ilf-book-muted') === 'true'; } catch { /* Storage is optional. */ }
  function soundLabel() {
    soundButton.textContent = muted ? 'Sound: off' : 'Sound: on';
    soundButton.setAttribute('aria-pressed', String(!muted));
    soundButton.setAttribute('aria-label', muted ? 'Turn page sound on' : 'Mute page sound');
  }
  async function rustle() {
    if (muted) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    try {
      audio ||= new Audio();
      if (audio.state === 'suspended') await audio.resume();
      if (muted || audio.state !== 'running') return;
      const length = Math.floor(audio.sampleRate * 0.26);
      const buffer = audio.createBuffer(1, length, audio.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.sin(i / audio.sampleRate * 85));
      const source = audio.createBufferSource();
      source.buffer = buffer;
      const filter = audio.createBiquadFilter();
      filter.type = 'bandpass'; filter.frequency.value = 1700; filter.Q.value = 0.6;
      const gain = audio.createGain(), now = audio.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      source.connect(filter).connect(gain).connect(audio.destination);
      source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
      source.start(now); source.stop(now + 0.26);
    } catch { /* Navigation continues when browser audio is unavailable. */ }
  }
  function resetZoom() {
    book.classList.remove('is-zoomed');
    zoomButton.textContent = 'Zoom in';
    zoomButton.setAttribute('aria-pressed', 'false');
    book.querySelectorAll('.book-viewport').forEach(view => { view.scrollTop = 0; view.scrollLeft = 0; });
  }
  function show(value, userAction = false) {
    const target = Math.max(0, Math.min(pages.length - 1, value));
    const changed = target !== index;
    book.dataset.direction = target < index ? 'previous' : 'next';
    index = target;
    resetZoom();
    pages.forEach((page, i) => { page.hidden = i !== index; });
    previous.disabled = index === 0; next.disabled = index === pages.length - 1;
    pages[index].querySelector('img').loading = 'eager';
    status.textContent = 'Page ' + (index + 1) + ' of ' + pages.length;
    if (changed && userAction) void rustle();
  }
  previous.addEventListener('click', () => show(index - 1, true));
  next.addEventListener('click', () => show(index + 1, true));
  book.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || book.classList.contains('is-zoomed')) return;
    event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  soundButton.addEventListener('click', () => {
    muted = !muted; soundLabel();
    try { localStorage.setItem('ilf-book-muted', String(muted)); } catch { /* Storage is optional. */ }
  });
  zoomButton.addEventListener('click', () => {
    const zoomed = book.classList.toggle('is-zoomed');
    zoomButton.textContent = zoomed ? 'Fit page' : 'Zoom in';
    zoomButton.setAttribute('aria-pressed', String(zoomed));
  });
  fullButton.hidden = !document.fullscreenEnabled || !book.requestFullscreen;
  fullButton.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === book) await document.exitFullscreen();
      else await book.requestFullscreen();
    } catch { /* The fit-page reader remains available. */ }
  });
  document.addEventListener('fullscreenchange', () => {
    const full = document.fullscreenElement === book;
    fullButton.textContent = full ? 'Exit full screen' : 'Full screen';
    fullButton.setAttribute('aria-pressed', String(full));
  });
  book.classList.add('is-interactive'); soundLabel(); show(0);
});
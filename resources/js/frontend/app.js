import './festival.js';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenuOpen(open) {
  menuButton?.setAttribute('aria-expanded', String(open));
  const label = menuButton?.querySelector('.sr-only');
  if (label) label.textContent = open ? 'Close menu' : 'Open menu';
  navigation?.classList.toggle('is-open', open);
  if (!open) navigation?.querySelectorAll('details[open]').forEach(menu => { menu.open = false; });
}
function closeMenu() {
  setMenuOpen(false);
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  setMenuOpen(open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 1400px)').addEventListener('change', closeMenu);

document.querySelectorAll('[data-filter]').forEach((input) => {
  const cards = [...document.querySelectorAll(input.dataset.filter)];
  const result = document.querySelector('[data-results]');
  const empty = document.querySelector('.empty-results');
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach((card) => {
      card.hidden = !card.dataset.search.includes(query);
      if (!card.hidden) count++;
    });
    if (result) result.textContent = `${count} ${input.dataset.filter.includes('speaker') ? 'speakers' : 'stories'} ${query ? 'found' : 'to discover'}`;
    if (empty) empty.hidden = count > 0;
  });
});

const dialog = document.querySelector('#photo-dialog');
let lastPhotoButton;
let photoSet = [], photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photoSet.length) % photoSet.length;
  const button = photoSet[photoIndex];
  dialog.querySelector('img').src = button.dataset.lightbox;
  dialog.querySelector('img').alt = button.querySelector('img').alt;
  dialog.querySelector('#photo-caption').textContent = button.dataset.caption;
  dialog.querySelector('[data-photo-count]').textContent = `${photoIndex + 1} / ${photoSet.length}`;
}
document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    lastPhotoButton = button;
    photoSet = [...document.querySelectorAll('[data-lightbox]')].filter(item => !item.hidden);
    showPhoto(photoSet.indexOf(button));
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
dialog?.querySelector('.photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
dialog?.querySelector('.photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
dialog?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart = 0;
dialog?.querySelector('img').addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
dialog?.querySelector('img').addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 50) showPhoto(photoIndex + (distance < 0 ? 1 : -1));
}, {passive:true});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastPhotoButton?.focus();
});

const backTop = document.querySelector('.back-top');
function scrollState() {
  if (backTop) backTop.hidden = window.scrollY < 700;
  document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', scrollState, { passive: true });
scrollState();
backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('.brand')?.focus({ preventScroll: true });
});

// Progressive collection controls: all content remains available without JavaScript.
document.querySelectorAll('[data-collection]').forEach((collection) => {
  const items = [...collection.querySelectorAll(collection.dataset.item)];
  const size = Number(collection.dataset.pageSize) || items.length;
  const more = collection.querySelector('[data-load-more]');
  const search = collection.querySelector('[data-collection-search]');
  const filters = [...collection.querySelectorAll('[data-category-filter]')];
  let limit = size, category = 'all';
  function render() {
    const query = search?.value.trim().toLocaleLowerCase() || '';
    const matched = items.filter(item => (category === 'all' || item.dataset.category === category) && (!query || (item.dataset.search || item.textContent).toLocaleLowerCase().includes(query)));
    items.forEach(item => { item.hidden = !matched.includes(item) || matched.indexOf(item) >= limit; });
    const count = collection.querySelector('[data-collection-count]');
    if (count) count.textContent = `${matched.length} ${collection.dataset.item.includes('gallery') ? 'photographs' : 'stories'}`;
    if (more) more.hidden = matched.length <= limit;
    const status = collection.querySelector('[data-load-status]');
    if (status) status.textContent = `Showing ${Math.min(limit, matched.length)} of ${matched.length}`;
    const empty = collection.querySelector('.empty-results');
    if (empty) empty.hidden = matched.length > 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.categoryFilter; limit = size;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button))); render();
  }));
  search?.addEventListener('input', () => { limit = size; render(); });
  more?.addEventListener('click', () => {
    const firstHidden = items.find(item => item.hidden && (category === 'all' || item.dataset.category === category) && (!search?.value || (item.dataset.search || item.textContent).toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase())));
    limit += size; render();
    if (firstHidden) { const focus = firstHidden.matches('button,a') ? firstHidden : firstHidden.querySelector('a'); focus?.focus({preventScroll:true}); }
  });
  render();
});

document.querySelectorAll('[data-language-tabs]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role=tab]')];
  const activate = tab => tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1;
    document.getElementById(item.dataset.panel).hidden = !active;
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = tabs[event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      activate(next); next.focus();
    });
  }); activate(tabs[0]);
});
document.querySelectorAll('[data-share]').forEach(button => button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('[data-share-status]');
  try { await navigator.clipboard.writeText(button.dataset.share); if (status) status.textContent = 'Link copied'; }
  catch { if (status) status.textContent = 'Copy the address from your browser to share this page.'; }
}));
document.querySelector('[data-enquiry]')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  const subject = `ILF enquiry: ${fields.get('topic')}`;
  const body = `Hello ILF team,\n\n${fields.get('message')}\n\nFrom,\n${fields.get('name')}`;
  window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.querySelector('[data-enquiry-status]').textContent = 'Your email app should open a draft. If it does not, email us directly using the address above. Nothing has been sent by this website.';
});

import './client-refinements.js';

import './page-transition.js';

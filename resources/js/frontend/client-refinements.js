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
  const previous = book.querySelector('[data-book-prev]'), next = book.querySelector('[data-book-next]');
  const status = book.querySelector('[data-book-status]'); let index = 0;
  function show(value) {
    index = Math.max(0, Math.min(pages.length - 1, value));
    pages.forEach((page, i) => { page.hidden = i !== index; });
    previous.disabled = index === 0; next.disabled = index === pages.length - 1;
    status.textContent = `Page ${index + 1} of ${pages.length}`;
  }
  previous.addEventListener('click', () => show(index - 1)); next.addEventListener('click', () => show(index + 1));
  book.addEventListener('keydown', event => { if (!['ArrowLeft','ArrowRight'].includes(event.key)) return; event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1)); });
  book.classList.add('is-interactive'); show(0);
});

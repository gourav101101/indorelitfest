import '../../css/frontend/page-transition.css';

// Decorative navigation feedback; ordinary links still work without JavaScript.
const overlay = document.createElement('div');
overlay.className = 'book-navigation';
overlay.setAttribute('aria-hidden', 'true');
overlay.innerHTML = "<div class=\"book-navigation__scene\"><svg class=\"book-navigation__art\" viewBox=\"0 0 400 300\" aria-hidden=\"true\"><defs><linearGradient id=\"turn-paper\" x1=\"0\" x2=\"1\"><stop stop-color=\"#dfcdb0\"/><stop offset=\".28\" stop-color=\"#fffdf5\"/><stop offset=\".75\" stop-color=\"#faf0dc\"/><stop offset=\"1\" stop-color=\"#d5bb91\"/></linearGradient><linearGradient id=\"turn-cover\" x2=\"0\" y2=\"1\"><stop stop-color=\"#cc7045\"/><stop offset=\"1\" stop-color=\"#873c2a\"/></linearGradient></defs><ellipse cx=\"200\" cy=\"252\" rx=\"130\" ry=\"15\" fill=\"#081a2d\" opacity=\".24\"/><g transform=\"translate(0 -8)\"><path d=\"M42 116 Q115 93 200 126 Q281 93 358 116 L353 238 Q278 218 200 249 Q120 218 47 238Z\" fill=\"url(#turn-cover)\" stroke=\"#e4b576\" stroke-width=\"2\"/><path d=\"M50 109 Q124 89 200 120 Q278 89 350 109 L346 226 Q276 209 200 239 Q124 209 54 226Z\" fill=\"#dfc9a5\"/><path d=\"M50 101 Q126 84 200 116 Q275 84 350 101 L346 217 Q274 201 200 233 Q128 201 54 217Z\" fill=\"url(#turn-paper)\" stroke=\"#cdb38a\"/><path d=\"M63 122 Q122 112 178 133 M64 138 Q123 128 179 149 M65 154 Q124 144 180 165 M66 170 Q124 160 181 181 M222 133 Q279 112 335 122 M221 149 Q278 128 334 138 M220 165 Q277 144 333 154 M219 181 Q276 160 332 170\" fill=\"none\" stroke=\"#b5a286\" opacity=\".5\" stroke-width=\"2\"/><path d=\"M200 116 L200 233\" stroke=\"#94744e\" opacity=\".45\" stroke-width=\"2\"/>\n<path class=\"book-navigation__sheet\" d=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z\" fill=\"url(#turn-paper)\" stroke=\"#cdb38a\" stroke-width=\".8\"><animate attributeName=\"d\" begin=\"indefinite\" dur=\".72s\" fill=\"freeze\" calcMode=\"spline\" keyTimes=\"0;.35;.68;1\" keySplines=\".35 0 .4 1;.3 0 .25 1;.3 0 .2 1\" values=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z;M200 116 Q226 28 264 48 L283 167 Q230 158 200 233Z;M200 116 Q150 25 125 60 L107 176 Q158 166 200 233Z;M200 116 Q126 84 50 101 L54 217 Q128 201 200 233Z\" data-delay=\"0\"/></path><path class=\"book-navigation__sheet\" d=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z\" fill=\"url(#turn-paper)\" stroke=\"#cdb38a\" stroke-width=\".8\"><animate attributeName=\"d\" begin=\"indefinite\" dur=\".72s\" fill=\"freeze\" calcMode=\"spline\" keyTimes=\"0;.35;.68;1\" keySplines=\".35 0 .4 1;.3 0 .25 1;.3 0 .2 1\" values=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z;M200 116 Q226 28 264 48 L283 167 Q230 158 200 233Z;M200 116 Q150 25 125 60 L107 176 Q158 166 200 233Z;M200 116 Q126 84 50 101 L54 217 Q128 201 200 233Z\" data-delay=\"105\"/></path><path class=\"book-navigation__sheet\" d=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z\" fill=\"url(#turn-paper)\" stroke=\"#cdb38a\" stroke-width=\".8\"><animate attributeName=\"d\" begin=\"indefinite\" dur=\".72s\" fill=\"freeze\" calcMode=\"spline\" keyTimes=\"0;.35;.68;1\" keySplines=\".35 0 .4 1;.3 0 .25 1;.3 0 .2 1\" values=\"M200 116 Q275 84 350 101 L346 217 Q274 201 200 233Z;M200 116 Q226 28 264 48 L283 167 Q230 158 200 233Z;M200 116 Q150 25 125 60 L107 176 Q158 166 200 233Z;M200 116 Q126 84 50 101 L54 217 Q128 201 200 233Z\" data-delay=\"210\"/></path>\n<path d=\"M199 234 Q205 245 210 264 L220 257 L228 262 Q221 242 214 229\" fill=\"#cf6948\"/></g></svg></div>";
document.body.append(overlay);
let destination = null;
let navigateTimer;
let resetTimer;
function reset() {
  clearTimeout(navigateTimer);
  clearTimeout(resetTimer);
  destination = null;
  overlay.classList.remove('is-active', 'is-arriving');
}
window.addEventListener('pageshow', reset);
window.addEventListener('pagehide', reset);
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!document.documentElement.classList.contains('motion-enabled') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.closest('[data-no-transition]')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return;
  if (url.pathname === location.pathname && url.search === location.search) return;
  // Assets and documents should open immediately, with their native browser behaviour.
  if (/\.[a-z0-9]{2,6}$/i.test(url.pathname) || /\/(?:build|images|storage|downloads)\//.test(url.pathname)) return;
  event.preventDefault();
  if (destination) return;
  destination = url.href;
  overlay.classList.add('is-active');
  overlay.querySelectorAll('animate').forEach(animation => {
    animation.beginElementAt(Number(animation.dataset.delay) / 1000);
  });
  navigateTimer = setTimeout(() => {
    location.assign(destination);
  }, 950);
  // A failed or cancelled navigation must never leave a screen-covering overlay.
  resetTimer = setTimeout(reset, 6000);
});

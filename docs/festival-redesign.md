# Festival experience redesign — 19 September 2026

## Direction

The user requested a larger, more expressive festival experience, using Jaipur Literature Festival as the quality reference. Indore remains the main identity; the regional destination remains labelled Discover Malwa. The official client logo is retained, and the removed top announcement strip is not reinstated.

Reference inspected live: https://www.jaipurliteraturefestival.org/ . Its homepage used illustrated scenes, animated ornaments, strong section transitions, a festival experience/registration hierarchy and broad navigation. The inspected homepage had 12 active rotating SVG/image animations and no canvas elements. This is a page observation, not a claim about every part of Jaipur’s site. Snapshot: `research/jaipur-motion-review.json`; screenshots: `research/screenshots/jaipur-current-*`.

## Implemented

- Larger illustrated hero, oversized type, rotating ornaments and subtle pointer-responsive image depth.
- Animated culture strip, section reveals, expressive card hover states, a persistent motion pause control and system reduced-motion support.
- Stronger typography and spacing throughout, dark-blue speaker presentation, larger portraits, photographic discovery cards and a contrasting red archive section.
- Keyboard-accessible Day 1/2/3 tabs connected to the existing 2025 diaries and original programme.
- Explore menu with grouped links, mobile scrolling navigation and direct footer access to the expanded site.
- Four new pages: `/experiences`, `/visit`, `/community`, `/media`.
- Visitor planning, participation routes, collaboration enquiries and media resources use existing verified festival facts and new editorial guidance. No new content was scraped from the old site.

## Motion and performance decisions

Uses native CSS transforms, requestAnimationFrame and IntersectionObserver. No 3D engine, scroll hijacking, automatic video downloads or animation dependency. Pointer depth only runs for a fine pointing device; reduced-motion settings suppress decorative movement. Visitors can also pause motion; that preference is kept locally.

Content renders on the server. With JavaScript disabled, all three festival diary panels remain readable and the Explore menu remains a native disclosure. Images are served through the existing WebP helper and lower sections load lazily. Total built JavaScript is 9.08 KB (2.95 KB gzip); combined stylesheet build sizes are about 62 KB before compression. These are asset measurements, not a production Core Web Vitals guarantee.

## Verification

- Production build and JavaScript lint passed.
- Laravel route/content suite: 6 tests, 199 assertions passed.
- New browser review: 21 checks passed, including day-tab keyboard navigation, menu focus, persisted motion pause, reduced-motion changes, no-JavaScript content access, and all four new pages at 390 px and 1440 px.
- Browser report: `research/festival-redesign-checks.json`.
- Existing functionality review: all 28 browser checks passed after the redesign (speaker/journal search, lightbox, Hindi biographies, FAQs, mobile navigation and representative page widths). Combined with the new review, 49 browser checks passed.
- Captures include `indore-festival-redesign-final.png`, `indore-festival-redesign-mobile.png`, `indore-redesign-chapters.png`, `indore-redesign-explore-menu.png`, and the new page screenshots.

Dates, future programme, new form URLs, supplied video and posters remain pending. No paid tiers, named partners, promised facilities, confirmed future speakers or testimonials were invented. A community collaboration page is an enquiry route, not an announcement of an existing partnership programme.

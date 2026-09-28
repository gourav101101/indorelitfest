# 2026 homepage — Jaipur reference revision

## Current scope
Latest refinement: fuller live inspection revealed additional deferred Jaipur content: book/music features, hotels, podcasts, recorded sessions and press coverage. Added Indore books/writing, music/poetry, a real archive photo ribbon with lightbox, confirmed venue information and a channel CTA. Testimonials, press cards, sponsor logos, hotel packages, podcasts and a newsletter await actual client material; requirements are in [the ready-to-forward client request](client-content-request-2026.md).

Motion refinements: progressively enhanced section reveals with staggered card entrances, decorative emblem movement, larger carousel photography, interactive photo/card treatments and document-driven reading progress. Content remains visible without JavaScript, when motion is paused, and under reduced-motion preferences. Existing assets were reused; no additional generated image was commissioned in this refinement.

Rebuild only the homepage, including its header and footer, in the ornamental visual structure of the live Jaipur Literature Festival reference. Other page layouts are preserved. Shared festival facts, forms, contact information and contradictory date/availability copy were updated wherever the shared data is used.

Reference inspected live: https://www.jaipurliteraturefestival.org/ on 19 September 2026. Reference captures: `research/screenshots/jaipur-september*.png`. The eight-chapter split hero from the earlier pass is superseded.

## Reference mapped to Indore
| Reference pattern | Indore implementation |
| --- | --- |
| Solid-colour sticky header and registration CTA | Navy header, festival/media dropdowns, supplied registration form |
| Central ornamental arch with event logo, dates and venue | Original SVG arch, official ILF logo, 12th edition, confirmed 2026 information |
| Illustrated people and regional setting around the arch | New commissioned conceptual Rajwada/readers/music artwork; Indore identity |
| Centred About section with substantial text | Three expanded paragraphs grounded in the already imported ILPOS/festival history |
| Wide video feature | Existing festival photograph links to the supplied Hello Hindustan YouTube channel |
| Decorative section transitions and framed experience carousel | Native SVG colour bands, floral motifs, manually operated three-slide carousel |
| Participation cards | Five supplied Google Forms plus a visitor-information card |
| Footer with social and useful links | Supplied Instagram, YouTube, Twitter and email; festival/participation links |
| Additional ILF archive content | Clearly labelled 2025 voices and existing journal entries |

The page uses navy, red, saffron, ivory and warm peach. Discover Malwa is retained in navigation/footer as a separate page, with no homepage Malwa feature. No Jaipur text, logos, photographs, paid packages or testimonials are republished. No new 2026 speakers, session times, ticket prices or hospitality benefits are invented.

## Confirmed information
- 12th edition: **27–29 November 2026**
- Venue: **Daly College, Indore**
- Email: **hellohindustan@gmail.com** (confirmed by user, 26 September 2026)
- Volunteer: https://forms.gle/by5xS5RTGjEJfMBFA
- Internship: https://forms.gle/htJKDyAMbKi6erHh9
- Registration: https://forms.gle/SH2gXWhEKokRSwEA6
- Stall booking: https://forms.gle/BkTuSAir9gymZU9P6
- Open mic: https://forms.gle/UTP3dukT4reDac867

Values live in `config/festival.php`, `.env` and `.env.example`. Archive PDFs, article dates and prior speakers remain labelled with their actual years.

## Still awaiting client material
The email refers to an attached “12th Edition Announcement Poster”, but no PNG was attached to this chat. The homepage accepts its public relative path through `FESTIVAL_POSTER`. The optional poster block stays absent until supplied; no old poster is relabelled and the generated hero illustration is not represented as the client's poster. The poster image has no forced aspect ratio and is not cropped.

The main film/captions and the 2026 speaker lineup/programme are also not supplied. The existing 2025 programme remains an archive. This work is local; the public indorelitfest.in site has not been deployed or modified, and no forms were submitted or client messages sent.

## Implementation and validation
- Homepage: `resources/views/frontend/pages/home.blade.php`
- Home-only styles: `resources/css/frontend/home-2026.css`
- Home-only controls: `resources/js/frontend/home-2026.js`
- Home-only partials: `resources/views/frontend/partials/ilf-*.blade.php`
- 53/53 browser checks after the motion/content refinement: `research/home-2026-checks.json`
- 7 Laravel tests / 219 assertions pass.
- Production build and lint pass.
- Tested 1920×930, 1440×1000, 1280×720, 1024×768, 768×1024, 390×844, 360×740 and 320×740.
- Captures: `research/screenshots/ilf-2026-*.png`; latest desktop: `ilf-2026-final.png`.
- Carousel supports click, Enter, arrows, Home/End and horizontal swipe; no autoplay. All three experiences remain visible without JavaScript. Inactive slide links leave the keyboard sequence.
- Floral rotation honours motion pause and system reduced motion. Native scrolling is preserved.
- New hero WebP: 261,436 bytes, 1800×600 with alpha. Home-only JS is approximately 3.24 KB before gzip. No animation library, embedded video player, third-party fonts or WebGL runtime added.
- Old `check-composition.mjs` and `check-festival-redesign.mjs` reports describe the superseded eight-chapter homepage; use the new homepage check for this revision.

## Original artwork
Generated with the **built-in image generation tool** using the imagegen skill.
- Original saved project asset: `public/images/indore-festival-hero-2026.png`
- Optimized website asset: `public/images/indore-festival-hero-2026.webp`
- A conceptual illustration of readers, music and Indore heritage; not a documentary architectural record.
- The official supplied festival logo is preserved separately and was not generated or edited.

Final generation prompt:

> Use case: illustration-story. Create an original wide panoramic illustration asset for the Indore Literature Festival homepage, approximately 3:1 landscape, transparent background with real alpha. Bold flat editorial folk illustration, clean simplified shapes and subtle printed grain, elegant colourful Indian cultural festival art, NOT watercolor or realistic 3D. Palette: navy #173b70, saffron yellow #f6bc32, vermilion #ce4635, warm ivory, teal and muted coral. Composition important: two separate lively groups at the far left and far right thirds, with the CENTRAL THIRD ENTIRELY EMPTY TRANSPARENT for an ornamental white arch to overlay later. On the far left: young Indian woman in a red sari reading a book, seated male reader in a teal kurta, a blue peacock and stacked books, behind them a stylised small Indore Rajwada palace facade with its layered red-brown wooden balconies. On far right: an Indian woman in yellow holding an open book, a folk musician in an Indore/Malwa-style turban playing a string instrument, and a storyteller; architectural details inspired by Indore heritage behind them. Figures occupy lower two thirds of the canvas with some marigolds and graceful flowing shapes grounding the groups. Make the silhouettes easy to distinguish on a dark navy website background. Faces warm and human, hands anatomically coherent. No camels, no Jaipur landmarks, no text, no lettering, no logo, no watermarks, no arch frame, no actual website UI. Professional commissioned festival campaign art with confident bright colour blocking.

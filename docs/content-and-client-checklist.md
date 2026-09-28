# Client brief coverage and content record

> Implementation update, 28 September: [completed work and all remaining points](client-changes-delivery-2026-09-28.md), [updated page inventory](website-page-inventory-2026-09-28.md), and [client-ready material request](client-message-remaining-2026-09-28.md). This update supersedes the older status and requests below.


> New brief, 27 September 2026: [all 33 client changes, feasibility and required materials](client-changes-2026-09-27.md), plus [the complete page inventory](website-page-inventory-2026-09-27.md). This is the current planning reference. The new requests are reviewed, not yet implemented.

> Latest content request: [Old website recovery and remaining client details ? 26 September 2026](legacy-content-recovery-2026-09-26.md). This supersedes older missing-material lists below. The new logo is supplied, and 2024 archive source profiles have now been recovered.

## Current status — 26 September 2026

Speaker archives now use Gallery-style year cards with working 2024 (23 profiles) and 2025 (36 profiles) directories. The 2024 portraits and biographies were recovered from the legacy PDF; image-only Hindi biographies use source-based summaries. Speaker PDF links/viewers are removed. Earlier years await source content. See [the recovery and implementation record](legacy-content-recovery-2026-09-26.md).

The homepage visual identity now extends to all inner-page templates: illustrated arches, navy/ivory/gold colours, framed portraits and cards, shared footer, and clearer document access. The compact navbar keeps its approved spacing. Explore destinations now show their active state; mobile menu labels announce Open/Close correctly and closing the menu also closes its dropdown.

Completed review: 80 public URLs at desktop and phone widths, 31 browser interaction checks, and 7 application tests (219 assertions). Navigation follow-up also passed lint, production build and application tests. See [all-page visual review](site-visual-review.md) and [the preview gallery](../research/site-review/index.html).

### Still needs client material or launch configuration

- [ ] Original 2026 announcement poster and approved campaign artwork/copy.
- [ ] Main festival film, poster frame and captions; a higher-resolution official logo is also desirable.
- [ ] Approved 2026 programme and speaker information when ready to announce. The current directory/programme remain the 2025 archive.
- [ ] Verified year assignments for older gallery photographs and any additional approved photos.
- [ ] Review of inconsistent legacy biographies, organiser statistics, credits and final contact details.
- [ ] Production domain/hosting details, deployment configuration and final staging review. The live website has not been deployed by this work.

Dates, venue and all five supplied registration forms are already implemented. These are not outstanding requests. The records below describe earlier passes; this status takes precedence where older notes differ.


Reviewed: 18 September 2026. Source brief: `C:/Users/ADIN/Downloads/Website Redesign Doc (1).pdf`, two pages. Extracted text: `research/client-brief.txt`. The user's latest direction narrows the regional focus from all Madhya Pradesh to **Indore and Malwa**.

Current status — 19 September 2026: the homepage now follows the Jaipur reference's ornamental arch, illustrated transitions, centred editorial content and participation cards. **12th edition: 27–29 November 2026, Daly College, Indore.** All five client-supplied form links and supplied email/social details are configured. The announcement PNG mentioned in the email was not attached and is still required. See [the current homepage record](homepage-2026-reference.md) for screenshots, artwork prompt and validation. Older implementation passes below are historical.

## Brief coverage
Composition refinement: shorter desktop heading/card layouts now keep the listening, attendee, news, speaker and journal sections together at tested screen sizes. Added an original wildlife divider and rotating button ornaments that honour motion pause. See [layout and artwork record](compact-layout-and-ornaments.md).

Media update: three verified video conversations, six session recordings, three sourced attendee summaries and three press stories now appear on the homepage alongside the 2026 announcement. See [media sources and limitations](homepage-media-sources.md). A separate podcast feed has not been verified; the listening block is labelled as video conversations.

For the complete current list of client deliverables, use [Client content request — 2026](client-content-request-2026.md). It includes a ready-to-forward message, exact asset specifications, a delivery spreadsheet format and section-by-section status.


| Client request | Implemented / remaining |
| --- | --- |
| New design, familiar flow | Public navigation retains festival story, speakers, schedule, blog/journal, gallery and contact; adds a Malwa discovery page |
| Logo colours: blue, red, yellow | Applied throughout, with warm paper backgrounds; existing official favicon artwork retained with a new typographic lockup |
| Updated Google Forms | All five links supplied by the client are configured and shown on the homepage and participation page |
| Updated dates | 27–29 November 2026 · Daly College, Indore. Existing 2025 programme and speakers remain clearly archived |
| Same content | 36 speaker biographies, 16 full articles and four organiser/about sections migrated. Homepage introduction expanded from existing festival and ILPOS content |
| Old and new 11th-edition photography | Available archive and 2025 day-one/day-two/day-three images downloaded. Additional client photographs still welcome |
| Gallery: all seasons in grid | 2015–2025 chapter grid, 2025 photo collection and mixed-year archive. Earlier-year tiles are noninteractive until photo cataloguing is complete; no mixed-year photo is assigned an invented year |
| Exact annual tagline | “Let the legacy of literature grow…” retained in configuration, brand copy and the homepage headline treatment |
| Go-up arrow | Scroll-aware back-to-top control, reduced-motion support and keyboard focus handling |
| Main film hosted directly | Native HTML video section, activated with `FESTIVAL_FILM`. Client MP4 and captions not supplied; honest coming-soon state used |
| Flowy, dynamic theme | Original hero illustration, cultural colour strip, arch-shaped photography, image hover effects, journal photo motion; reduced-motion support |
| New posters | Pending supplied artwork; do not relabel old posters as new |
| New photo wall | Homepage wall and native modal enlargement; actual festival images |
| Sneak peek links to YouTube | Links to the official channel in same tab |
| 90K subscribers milestone | Celebratory milestone band based on the client's brief, not represented as a live count |
| Links open in the same webpage | No `_blank` navigation; native photo dialog stays on the page. PDFs have inline display plus direct open/download options |
| Desktop and mobile | Responsive layouts and navigation; visual and interaction checks at multiple widths |
| New speakers page with archive | Searchable directory, individual profiles, embedded archive entry and separate 2024 PDF collection |
| Schedule remains PDF | Original 2025 PDF is preserved and embedded without rewriting its content |
| All blogs, floating images | All 16 linked articles imported, searchable index and decorative floating background photos |
| AI article thumbnails | Three original conceptual editorial illustrations used across corresponding article subjects |
| Literature, culture, arts, Indore, carnival, legacy | Regional illustration, bilingual visual accents, real events imagery and Malwa editorial coverage |
| Interactive links | Real page routes, searches, photo viewer, email/phone/map links and available archive downloads |

## Source and asset record

- Festival source: https://indorelitfest.in/ and its about, speaker, schedule, blog and contact pages.
- Full HTML snapshots: `research/legacy/`. Download manifest: `research/legacy/assets.json` (206 available assets).
- Server-side import script: `scripts/import-legacy.php`; it strips presentation markup and preserves paragraph text, including Hindi. Re-import overwrites the curated JSON, so review edits before rerunning it.
- New thumbnails are illustrative, not depictions of specific speakers or sessions. Hero is a conceptual regional composition, not an exact geographical or historical reconstruction.
- Official logo supplied on 19 September 2026: `unnamed.jpg`, preserved as `public/images/indore-literature-festival-logo.jpg`. Integrated in the header, footer and browser icon, replacing the temporary icon/text lockup. Supplied resolution: 160 × 160 pixels.
- Some source biographies are internally inconsistent. For example, the Vivek Chaturvedi section contains material about Divya Mathur. The original text is retained in the source; the clearly unrelated Divya Mathur paragraph is excluded from the displayed Vivek Chaturvedi profile. Other source inconsistencies still need client review.
- Some legacy image links return 404; only successfully downloaded assets are included. Missing images and unlabelled years require client material/cataloguing.

## Regional references

Malwa content is deliberately separate from event locations. Indore is the main identity; Ujjain, Mandu and Dewas are cultural discovery links, not claimed ILF venues or partners.

- [Indore — Incredible India](https://www.incredibleindia.gov.in/en/madhya-pradesh/indore)
- [Ujjain — MP Tourism](https://www.mptourism.com/destination-ujjain.php)
- [Mandu — MP Tourism](https://www.mptourism.com/tourist-places-to-visit-in-mandu.html)
- [Dewas — district tourism](https://dewas.nic.in/en/tourist-places/)

## Required before public launch

1. Dates and venue supplied and implemented: 27–29 November 2026, Daly College, Indore.
2. Five updated participation form links supplied and implemented; no form submissions were made.
3. Supply the main MP4, poster and captions; set `FESTIVAL_FILM` to its public relative path.
4. Supply new promotional posters and any additional 11th-edition photos. Confirm photo-to-season assignments before populating older-year albums.
5. Review the official logo placement, conceptual artwork and condensed homepage copy. A larger original logo would improve sharpness on high-density displays.
6. Review mismatched legacy biographies and any outdated organiser statistics retained from the old about page.
7. Confirm contact details, production domain and hosting PHP configuration; review the staging site before deployment.

No external messages were sent, no Google Forms were submitted, and no live website was changed.

## Second implementation pass

Completed independently of the forthcoming dates, forms, video and posters:

- Restored Hindi speaker biographies, English/Hindi tabs, role labels, previous/next profiles and related journal links.
- Added a featured journal story, category filters, search, reading time, more-stories controls, related articles and copy-link actions.
- Grouped the 2025 photographs by actual day with filtering and progressive loading. Photo viewer includes image counts, previous/next, keyboard arrows and swipe gestures.
- Removed misleading links from unindexed season tiles. Original mixed-year photographs remain available together without invented year assignments.
- Embedded the preserved 2024 speaker PDF, retaining direct access and download.
- Added visitor FAQs, participation/contact guidance, and a contact email-draft composer. It does not send or store messages.
- Added a festival-history section and improved metadata, current-page navigation and mobile controls.

Dates, form URLs, main film/captions and posters remain awaiting client supply. Earlier-year photo categorisation and legacy-content review are also still required. Production deployment and a CMS/admin dashboard are not completed by this frontend pass.


## Latest direction: Indore first

Indore is the primary public identity. The entire top announcement bar has been removed. The homepage culture strip, city feature and page metadata highlight Indore. The regional page and links remain **Discover Malwa**, as corrected by the user. The existing `/malwa` URL is retained.

## Festival experience redesign — 19 September 2026

Latest revision: the homepage has now been recomposed into eight viewport-aware chapters, with a separate text/illustration hero, larger navigation, interactive experience selections, chapter navigation and scroll progress. The former Malwa homepage feature and duplicated closing banner are removed; Discover Malwa remains a separate navigation destination. New original Rajwada-inspired artwork is delivered as WebP. See `docs/homepage-composition.md` and `docs/rajwada-artwork.md` for the implementation and image-generation record. All 40 composition checks passed across five desktop sizes and two phone sizes.

The larger visual redesign adds motion, photographic discovery cards, grouped Explore navigation, an interactive 2025 day-by-day archive and four pages: Inside the festival, Plan your visit, Community & collaborations, and Media room. The supplied official logo appears in the header and footer. Existing content is preserved; no additional old-site scraping was used. Full design and verification notes: `docs/festival-redesign.md`.

New content pages provide editorial guidance and enquiry routes. Dates, forms, film and posters can still be supplied later. New partners, future speakers, facilities or paid experiences are not presented as confirmed.


### Homepage participation update
- Removed the repeating Experience carousel from the homepage.
- Rebuilt participation with a prominent attendance card and four concise options: Open Mic, Stall Booking, Volunteer, and Internship.
- All five actions use the supplied Google Form links; the Festival menu now links to participation.
- Visitor and Listen & Watch sections retain their approved layouts.

- Participation visual refinement: wider cards, larger type, navy attendance invitation with subtle Rajwada line art; fits below navigation at 1440x900 and 1366x768, with stacked mobile cards.

- Added original illustrated courtyard artwork behind participation: readers, books, marigolds and Indore-inspired architecture. Generated asset and prompt are documented in docs/participation-artwork.md. Desktop section remains 674px at 1366x768 beneath the 94px navbar.

- Connected the About video and participation section with a responsive, static woven SVG divider in ivory, parchment, muted teal and ochre. Divider sits outside participation to preserve its desktop composition.


### Homepage background and artwork rhythm
- Festival voices, New ideas and Music & poetry share warm ivory.
- Listen & watch and Our sessions share parchment; the listening rail is wider with artwork at its lower edges.
- Quiet literary and river transitions separate the books/music and video groups.
- Attendee reflections, news and journal continue on ivory; the final pale-green invitation has a subtle decorative edge.
- Hero, Living memories and the Indore visitor composition are preserved.

### Find your festival explorer
- Added between hero and About: five direct links around a stationary Rajwada/book illustration.
- Desktop orbit pauses on hover, keyboard focus, reduced motion, Pause motion, hidden tab and when offscreen.
- Mobile uses a swipeable row with previous/next controls; labels stay visible and links work without JavaScript.

- Replaced the explorer icon wheel with original painted festival scenes and a Rajwada/open-book centrepiece. Sprite artwork and prompt documented in docs/explorer-artwork.md; navigation and motion controls retained.

- Explorer refinement: 3.4-second selection cycle with 1.1-second circular easing, clickable title above the wheel, crisp gold-bordered active scene and subdued inactive scenes. Existing artwork retained; mobile links remain swipeable and motion preferences respected.

- Explorer adjusted to full-colour, unblurred scenes, a larger raised foreground centrepiece, and quicker 2-second cycling with 650ms transitions.

- Explorer autoplay fix: hovering the overall section no longer stops rotation; title hover and keyboard focus still pause for navigation. Centre artwork uses a sharp foreground medallion; changing title follows an SVG arc. Browser verified automatic advancement with the section hovered.

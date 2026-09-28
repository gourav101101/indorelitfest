# Client changes — implementation and remaining material

> Current point-by-point checklist: [30 requested changes, completion status and required materials](client-changes-status-2026-09-28.md). Includes the latest logo placement and supplied lake/College images.


Updated 28 September 2026. Latest direction: homepage hero now combines Rajwada on the left with Daly College on the right. See [venue artwork update and exact prompts](venue-artwork-update-2026-09-28.md). This supersedes the implementation status and material requests in the 27 September planning review. Changes are in the local workspace, not deployed to the live website.

The requested design, navigation and interaction changes are implemented. Some content requirements remain partial: supplied files cannot establish attendance years, correct gallery days, private testimonials, a specific journey video, or Google Forms owner settings. The table below covers every numbered point without treating a placeholder as completed content.

## All 33 points

| Point | Status | Delivered / remaining |
| --- | --- | --- |
| 1 | Implemented | Daly College illustration replaces the Mandu homepage scene; sourced from the college's campus photography. Shared inner-page art also uses it where appropriate. |
| 2 | Preserved | Digital countdown retained; counts to the start of 27 November IST rather than an unconfirmed opening hour. |
| 3 | Implemented | Tagline, 27–29 November 2026 dates and Daly College appear beside the navbar badge, including mobile. |
| 4 | Preserved | Rotating snacks and motion controls retained. |
| 5 | Implemented | Meet the Voices illustration uses Manoj Muntashir, Neelima Dalmia Adhar and Sharmistha Mukherjee portraits. |
| 6 | Preserved | Programme element retained. |
| 7 | Implemented | Stall-area festival photograph adapted into the Festival Moments illustration. |
| 8 | Awaiting client photograph | Client will supply the black ILF T-shirt volunteer photograph. No AI-generated volunteer or placeholder is needed. Once received, adapt the supplied photo to the requested sketch style and place it in Take Part. |
| 9 | Implemented | Supplied ILF badge used in the orbit centre, navbar and hero. |
| 10 | Implemented | Homepage About and Our Story focus on literature and the festival's legacy. |
| 11 | Ready for URL | `FESTIVAL_JOURNEY_YOUTUBE` now controls the journey link on the homepage and film page. Exact 11-year video not found; current fallback explicitly opens the channel, not a claimed journey film. |
| 12 | Implemented | Turning-book navigation feedback; no imposed delay; resets on Back/Forward; reduced-motion support. |
| 13 | Implemented with available sources | Participation artwork combines real festival stall and group photographs. It does not identify unlabelled people as interns or volunteers. More specific activity photos can replace those parts. |
| 14 | Website fix complete; owner check remains | Expanded Google Forms destinations, new-tab handling, copy-link actions and browser guidance. Four supplied forms responded with their 2026 titles; Open Mic returned an authentication/access barrier. No submissions made. Owner must check its responder settings. |
| 15 | Implemented | Five homepage historical voices link to their correct profiles; main CTA opens Past Speakers; separate 2026 CTA remains. |
| 16 | Partial content | All 23 recovered 2024 profiles now have English/Hindi; nine previously abridged biographies expanded from brochure images. Shalini Modi's existing Hindi text now appears in its own tab. Translations and small-print names/titles need proofreading. New historical profiles have sourced introductions, not complete client biographies. |
| 17 | Implemented | `/speakers` displays the exact 2026 coming-soon message. 2025 directory and profile URLs retain their edition identity. |
| 18 | Implemented with supplied reference | New Ideas window now shows the supplied lake's fountain, geese, trees and pavilion in the reading-room illustration style. See the venue artwork update. |
| 19 | Partial content | Open Mic has its own participation section, without a misleading headliner photograph. Homepage performance copy distinguishes Music & Poetry. Need identified Open Mic participant photos. |
| 20 | Partial content | Existing three publication-based attendee summaries and source link retained. Template supports note images and video links; client-held sticky notes and videos still needed. No invented quotes. |
| 21 | Partial artwork | Articles with mapped speakers now use the actual speaker portrait and matching alt text. Final artistic session-based thumbnails need labelled session-image mapping; a portrait is not presented as a session photo. |
| 22 | Implemented | Article language inferred from body, matching language attributes applied, mixed Day 1/2/3 titles localised. Existing source text retained. |
| 23 | Implemented | Connect with Us and accessible Instagram, Facebook, YouTube and X icons. |
| 24 | Implemented | Client-supplied 90k+ milestone credited to Hello Hindustan's YouTube channel. It is not a live counter. |
| 25 | Implemented | Exact Hello Hindustan artwork recovered from the supplied 2025 schedule. Transparent master is optional for sharper future output. |
| 26 | Implemented | Seven-page schedule flipbook with Previous/Next, keyboard navigation, readable extracted text and original PDF fallback. No speaker PDF links. |
| 27 | Structure complete; order pending | Explicit ordered manifest replaces filename sorting. Source folders contain the same photograph at `dayone11.jpeg` and `daytwo11.jpeg` (identical hashes). Neither filename establishes the correct day. Client must confirm grouping/order using the provided sheet. |
| 28 | Implemented | Numbered gallery Chapter labels now say Season. |
| 29 | Implemented | Separate photo archive UI removed; `/gallery/archive` permanently redirects to `/gallery` and is excluded from sitemap. |
| 30 | Implemented | Maheshwar, Dhar, Narmadapuram and Ratlam added under Malwa & beyond, with official destination references. |
| 31 | Structure complete; content pending | Dedicated volunteer section, explanatory copy and form. Needs labelled volunteer photos, real experiences and final programme duties. |
| 32 | Structure complete; content pending | Matching internship, stall and Open Mic sections. Existing stall photograph and a sourced Open Mic attendee summary included. Needs programme-specific photos, experiences and operating details. |
| 33 | Partial content | All 50 supplied names link to profiles. Twelve reuse existing profiles; 38 new historical profiles have sourced English/Hindi introductions, with 27 openly licensed portraits and attribution. Eleven use monograms. Full official biographies and attendance years remain outstanding; no invented years assigned. |

## What the client still needs to send

1. Exact YouTube URL for the 11-year journey film.
2. Promised black-shirt ILF volunteer photograph; labelled volunteer, intern, registration, stall and Open Mic photos. Identify the activity in filenames or a short list.
3. Sticky-note images/transcriptions, attendee and participant video links, names/credits and the experiences to publish.
4. Correct gallery day/year/order. Fill [the filename sheet](../research/client-changes-2026-09-28/gallery-order-for-client.csv), especially the duplicate Day 1/Day 2 image.
5. Attendance years and fuller official biographies for the historical list; review Hindi/English drafts and preferred name spellings. Existing brochures are sufficient—no need to type everything again.
6. Portraits for Anupam Kher, Kishwar Naheed, J. Sai Deepak, Kumar Vishwas, Rajiv Dogra, Anand Ranganathan, Gitanjali J. Angmo, Gautam Chikermane, Philippa Kaye, Naresh Saxena and Neeraj Arya's Kabir Cafe. Other new portraits are sourced and credited; client festival portraits can replace them.
7. Article-to-session-photo mapping for the final journal artwork. Lake and Daly College references have now been supplied.
8. Open Mic form owner to check sign-in/responder restrictions and response acceptance. If another form still fails, supply its name, error and browser/device.
9. Final volunteer/intern duties and programme information; stall arrangements and Open Mic format/selection/timing. Only provide fees, certificates or deadlines if they should appear publicly.

Dates, venue, ILF logo, contact email, existing form URLs and the 2025 schedule are already held. The Hello Hindustan logo has also been recovered. No duplicate request for these is necessary.

## Pages and validation

- [Complete page inventory with titles and local links](website-page-inventory-2026-09-28.md): **132 sitemap pages + 10 unlisted earlier-season gallery placeholders = 142 content URLs**. All returned HTTP 200. Redirect aliases and PDFs excluded.
- Production build and ESLint pass. Vite leaves root-relative public images for runtime resolution; the referenced files exist.
- Application suite: **10 tests, 694 assertions**, passing.
- Browser interactions: **39 passing checks**, including mobile menu, search, gallery, language tabs, form targets, flipbook and Back-navigation loader reset.
- Updated templates checked at desktop 1440px and mobile 390px; navigation additionally checked from 320px to 1400px. Latest targeted review: no overflow, broken images or browser exceptions.
- Submission delivery was not tested; no Google Form responses were sent. Production deployment was not performed. A hosted staging URL is still required for client-accessible review links.

## Sources and editing records

- Public biography links and portrait author/license links are stored in `resources/data/past-speakers.json` and shown on the relevant profile. Raw recovery and license metadata: `research/client-changes-2026-09-28/`.
- College reference: [Daly College campus](https://dalycollege.org/Campus.html); [campus features](https://dalycollege.org/salient.html). A campus lake's existence does not establish a precise reference view.
- Added destinations: [Maheshwar](https://www.mptourism.com/destination-maheshwar.php), [Dhar](https://dhar.nic.in/en/tourist-places/), [Narmadapuram](https://narmadapuram.nic.in/en/tourist-places/), [Ratlam](https://ratlam.nic.in/en/tourist-places/).
- [Artwork asset and prompt-brief record](generated-artwork-2026-09-28.md).
- Research scripts that publish biographies are one-time migration tools, not build steps. Do not rerun `publish-past-speakers.mjs` after portrait recovery without recovering portraits again; it reconstructs the draft records.

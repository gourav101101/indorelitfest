# Indore Lit Fest — implementation plan and status

Updated 18 September 2026 after reviewing the client PDF, old Indore website and Fibro Laravel structure.

**The regional focus is Indore and Malwa.** This replaces the earlier proposal to cover all of Madhya Pradesh.

## Current result

The redesigned website is implemented in `D:/indorelitfest` and runs at **http://127.0.0.1:8008**. It uses Laravel 13, Blade and Vite, with small JavaScript interactions. The existing Fibro project was read as a structural reference and was not changed.

The visual direction combines the client's blue, red and yellow with warm paper backgrounds, literary typography, original Malwa-inspired illustration and authentic festival photography. Indore remains the main festival identity. Ujjain, Mandu and Dewas appear as regional discovery content, not additional festival venues.

## Implemented page structure

- Home: illustrated festival hero, introduction, 2025 speaker highlights, festival experiences, Malwa feature, photo wall, YouTube milestone and journal.
- Our story: festival purpose, ILPOS, Hello Hindustan and founder material from the old site.
- Speakers: searchable directory of 36 imported profiles, individual biographies and a past-speaker archive with the 2024 PDF.
- Schedule: the original 2025 PDF embedded unchanged, with direct open/download options. This follows the client PDF and replaces the earlier proposed session-filter interface.
- Journal: all 16 linked legacy articles, complete Hindi text, search, conceptual AI thumbnails and floating background photographs.
- Gallery: 2015–2025 season grid, the available 2025 photographs and a mixed-year archive. Older seasons without verified image assignments have clear pending states.
- Discover Malwa: regional context and official visitor-guide links.
- Participate: festival registration, open mic, stall booking, volunteering and internship, ready for updated Google Forms.
- Film: a native directly hosted video slot, awaiting the actual MP4.
- Contact: email, phone, office location, social links and a clear distinction between the office and festival venue.

## Key interactions

Responsive menu with Escape/focus handling; instant speaker/article search with empty states; native photo modal; back-to-top button; reduced-motion support; keyboard-visible focus; same-tab navigation; working legacy redirects; sitemap and proper 404 responses.

Fonts are hosted locally. Photographs and illustrations are optimized to WebP during the build. Core pages and their text remain available without JavaScript.

## Content treatment

The old website lists **14–16 November 2025**. Those dates, its schedule and speakers are treated as archive material. The new edition's dates and venue have not been invented.

The client-supplied tagline is retained: “Let the legacy of literature grow…”. The 90K+ YouTube statement is presented as the client's community milestone, not a live subscriber counter.

A total of 36 speaker profiles, 16 articles, four about sections and 206 available source assets were retrieved. Broken old-site image URLs were not introduced into the redesign. Existing source biography inconsistencies are documented for client review.

## Technical structure

- `app/Http/Controllers/Frontend`: public page delivery.
- `routes/frontend.php`: public routes and redirects.
- `resources/views/frontend`: layouts, partials and page templates.
- `resources/css/frontend` and `resources/js/frontend`: appearance and interaction.
- `resources/data/legacy.json`: imported text records.
- `config/festival.php` and `.env`: edition and participation settings.
- `public/images`, `public/legacy`, `public/fonts`: local public assets.
- `tests/Feature`: route/content validation.
- `docs`: client coverage, artwork prompts and deployment instructions.

This public-site version does not require a database, Node production server or queue worker. It does not include an admin dashboard or collect submissions internally. A future admin or internal registration system can be added within Laravel with its own authentication, validation and database schema.

## Verification

The production asset build and ESLint checks pass. Laravel feature tests cover all public routes, all imported detail pages, archive states, invalid resources, redirects, sitemap and portrait files. Browser checks cover menu/search/lightbox behaviour and responsive overflow at desktop, tablet and mobile sizes. Laravel configuration, route and view caching have also been exercised.

Evidence: `research/browser-checks.json` and `research/screenshots/`.

## Client material needed before launch

1. Confirm new edition dates and venue.
2. Supply updated Google Forms and confirm when each registration opens.
3. Supply the main 11-year MP4, poster image and captions.
4. Supply new promotional posters and any additional 11th-edition photography.
5. Confirm photo-to-year assignments for the older season galleries.
6. Review the logo treatment and the biography inconsistencies inherited from the old website.

The frontend provides honest pending states until these inputs arrive. No live deployment or form submission has occurred.

## Handoff references

- [Project README](../README.md)
- [Full client requirement checklist](../docs/content-and-client-checklist.md)
- [Hostinger deployment](../docs/hostinger-deployment.md)
- [Artwork and generation prompts](../docs/artwork.md)
- [Jaipur screenshot reference gallery](reference-gallery.html)

## Second frontend pass — 18 September 2026

Expanded the first prototype with bilingual speaker profiles, journal discovery/reading features, day-filtered galleries, navigable lightbox, embedded speaker archive, visitor FAQs and an email-draft contact composer. See `docs/completion-audit.md` for verification and `docs/content-and-client-checklist.md` for the remaining client inputs. Dates, registration forms, video and posters can be supplied later; they did not block this implementation pass.

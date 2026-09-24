# Homepage composition revision — 19 September 2026

## Problem and direction

The user’s 1920 × 930 screenshot showed low-contrast copy over a busy illustration, small navigation text, and sections that exceeded the usable viewport. Making every element larger had not produced the clear, complete compositions expected from the Jaipur reference.

The replacement separates the headline and illustration, sets a deliberate reading order, and composes eight homepage chapters around the space below the sticky header. Desktop chapters can grow if necessary rather than hiding content. Mobile layouts deliberately flow vertically so readable text and images are not compressed into a fixed screen.

## Homepage order

1. Welcome: plain cream text area alongside new Rajwada-inspired literary illustration.
2. Festival story: one photograph, one editorial message, eleven-edition seal.
3. Voices: four portraits with balanced image heights and a direct directory link.
4. Experiences: four keyboard-accessible selections with one associated panel at a time.
5. Programme: three archive days linked to actual 2025 diaries.
6. Memories: three photographs and the official YouTube community link.
7. Journal: three featured stories with a full journal link.
8. Join: participation, community and visitor planning links.

The Malwa homepage feature has been removed. Discover Malwa remains in the main navigation, Explore menu and footer as a separate destination. The top announcement bar remains removed. The repeated global closing banner is skipped on the homepage because the final chapter already contains that invitation.

## Design and interaction

- Navigation is 16–19 px on desktop and 18 px in the compact menu. The compact menu now starts below 1181 px so larger text does not crowd the header.
- Opaque sticky header prevents previous sections from showing through it.
- Desktop chapters use viewport-aware type, image heights, padding and available-space calculations; no fixed-height content clipping.
- Gentle proximity scroll snapping on large screens, chapter navigation and document-driven progress. No wheel interception or mandatory snapping.
- Motion pause and system reduced-motion settings remain supported. Reduced motion also disables chapter snapping.
- The generated image is approximately 188 KB as WebP. It is a conceptual illustration, not a documentary depiction or a replacement festival logo.

## Implementation

`resources/views/frontend/pages/home.blade.php` defines the eight chapters. `resources/css/frontend/composition.css` scopes their composition and refines global navigation. `resources/js/frontend/festival.js` handles chapter progress, tabs and decorative motion. Existing detail pages, archives, imported content and participation configuration are preserved.

## Verification record

`research/check-composition.mjs` measures section heights, hero separation, navigation size, alternate tab states, overflow, chapter alignment, keyboard behaviour and reduced motion. Results: `research/composition-checks.json`. Captures: `research/screenshots/indore-composition-*.png`. Checked desktop sizes: 1920 × 930, 1366 × 768, 1536 × 864, 1280 × 720 and 1920 × 1080; phone sizes: 390 × 844 and 360 × 740.

The server-side suite passes 6 tests / 199 assertions. Production build and JavaScript lint pass. Browser verification passes 89 checks: 40 composition checks, 28 existing interaction checks and 21 festival redesign checks. The browser harness explicitly emulates document focus so keyboard dispatch and media-query changes remain reliable while the live browser is in the background. Reports are saved in the corresponding research JSON files.

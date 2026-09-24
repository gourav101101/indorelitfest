# Section composition and decorative detail

Refined desktop layouts for listening cards, attendee reflections, news, speakers and journal: shorter heading zones, responsive image heights and tighter spacing. Mobile retains readable natural scrolling. Longer sections such as the full introduction, six-session archive and participation grid can still exceed one screen; content is not clipped to force a fit.

Homepage buttons have clean terracotta backgrounds, without corner ornaments. Hover and keyboard focus reveal a gold fill with navy text and a subtle arrow movement. Motion is interaction-only and respects reduced-motion preferences. Added a decorative peacock/deer landscape transition with empty alt text. Existing SVG floral motifs remain in use outside buttons.

Artwork generated with the built-in image generation tool. Project files: `public/images/festival-wildlife-divider.png` and its optimized `.webp` sibling.

Final generation prompt:

Create a professional original Indian literary festival decorative horizontal divider, 3:1 aspect ratio, transparent background real alpha. Flat graphic folk illustration with light print texture. A graceful navy and teal peacock on the far right with sweeping tail, a small elegant terracotta deer with delicate antlers on far left, subtle marigold flowers, and low flowing layered landscape brush bands across the bottom in saffron gold, muted teal, warm coral and ivory. Open transparent space across the upper central 60 percent. Indore literary cultural campaign palette navy #173b70, saffron #f6bc32, red #c94433, teal #2d8279. Animals complete and anatomically coherent, stylized refined silhouettes, no text, no logos, no rectangular backdrop, no photorealism. Keep the band shallow and animals gracefully integrated, suitable as a website section transition.

Browser measurements and motion checks: `research/compact-layout-checks.json`. Screenshots: `research/screenshots/ilf-compact-listen-*.png` and `research/screenshots/ilf-wildlife-divider.png`.

## Wide artwork and section proportions

The wildlife divider now retains its source width of 2172px (previously reduced to 1000px). The image build preserves up to 2400px for hero and divider assets and checks cached dimensions before reuse. This preserves source detail; it does not invent higher-resolution detail.

Replaced the plain wave transition with vector foliage and a fine curved rule, and replaced the oversized book divider with a repeating architectural arcade. Both remain sharp at any display size. Desktop content now spans up to 1400px, with media rows up to 1320px. Short editorial sections use a viewport-based minimum height; longer content remains naturally scrollable, with no clipping or forced scroll snapping.

## Homepage scene redesign

The homepage now pairs About copy with a large arched festival image, places the Experience introduction beside its interactive carousel, and presents all participation choices within a contrasting navy composition. Standalone wave/arcade/wildlife strips have been removed from the rendered homepage. Wildlife artwork now forms the lower background of Listen & Watch, with opaque cards protecting text contrast. Original vector quill/book artwork decorates section edges without reusing the hero.

CSS is split into home-base.css (existing styles) and home-scenes.css (scene composition), imported by home-2026.css. Desktop screenshots and geometry are captured by research/review-scenes.mjs. Mobile retains natural stacking and scrolling; sections are never clipped to enforce a viewport height.

## Taller hero

The desktop hero retains its 800?980px illustration scene and enlarged headline. The subsequent widening of other sections was reverted at the client?s request; the previous scene widths, grids and portrait sizing are restored. Mobile hero sizing remains separate.

About has been restored to its original centred story-first layout, with the wide video preview below the prose. The desktop split layout has been removed; the taller hero remains unchanged.

Experience, participation and Festival voices have also been restored to the earlier centred layouts. Participation again uses the peach background and spacious arched cards; the side-by-side navy composition and quill decorations were removed. Experience retains its working carousel with modest vertical spacing. The taller hero and story-first About remain.

> Update, 2 October 2026: The user requested the original Rajwada/Daly College hero artwork and edge placement. The original hero image and responsive layout are restored. The generated speaker collages below are retained as unused artwork.

# Seven festival voices in the hero — 2 October 2026

The homepage now uses two transparent painted groups made from the same seven client-selected portraits shown in Festival voices. Rajwada and Daly College remain in the scene. The existing profile cards and links are unchanged. Desktop places the portraits beside the central arch; tablet and mobile lift both groups above the text so all seven faces remain visible.

## Assets

- `public/images/hero-voices-left-2026.png` — transparent master, Kumar Vishwas, Narendra Kohli and Amish Tripathi.
- `public/images/hero-voices-right-2026.png` — transparent master, Vikram Sampath, Devdutt Pattanaik, Taslima Nasreen and Tarek Fateh.
- `public/images/hero-voices-left-2026.webp` — optimized website asset, 444,138 bytes.
- `public/images/hero-voices-right-2026.webp` — optimized website asset, 384,020 bytes.

Generated with the built-in imagegen tool. Portrait references: the seven files named in `resources/data/home-speaker-selection.json`. Style reference: `public/images/rajwada-daly-hero-illustrated-v2.webp`. Both generated masters retain alpha transparency. The old hero asset is preserved.

## Final prompts

Shared prompt:

Create a transparent PNG editorial watercolor and fine-ink illustration for Indore Literature Festival's homepage hero. Match the last reference's warm coral, ochre, ivory and teal illustrated style. Preserve recognizable faces, age, hair and clothing from the portrait references. No caricatures, no lettering, no logos, no photographic backgrounds, no extra people. Soft painted edges and genuine alpha transparency around the scene. Generous headroom; every face unobstructed. Bust portraits grouped with secondary landmark architecture and a few teal leaves / marigolds at the bottom. 

Left group:

LEFT SIDE composition, portrait-shaped 4:5 canvas: exactly THREE speakers from references 1 Kumar Vishwas tan suit, 2 Narendra Kohli grey hair and white beard glasses brown vest, 3 Amish Tripathi pink shirt. Place three busts in a loose triangular group, one slightly higher and two below, all faces in the LEFT 70% of the canvas, leaving the rightmost 25% transparent for the website's central arch. Rajwada palace in the upper background, as shown on the left of reference4. No people from reference4. Upper-right edge open and transparent, bottom silhouettes merge with leaves. Face likeness matters; each person appears once.

Right group:

RIGHT SIDE composition, portrait-shaped 4:5 canvas: exactly FOUR speakers from references 1 Vikram Sampath glasses blue shirt grey vest, 2 Devdutt Pattanaik glasses beard black jacket yellow scarf, 3 Taslima Nasreen short black hair red and cream/yellow sari, 4 Tarek Fateh glasses grey hair black jacket. Arrange four bust portraits as a balanced two-by-two staggered group: Vikram and Devdutt upper row, Taslima and Tarek lower row. Every face fully visible, accurately recognizable, no overlaps covering faces. The faces sit within the RIGHT 75% of the canvas. Leave upper-left and leftmost 20% transparent for the website's central arch. Daly College's ivory domes and clocktower behind the upper row as shown on right of reference5, no people from reference5. Full color hand-painted watercolor with fine facial detailing; preserve the actual photographed expressions. Few leafy teal branches and ochre marigolds around base, gentle organic outline. Each of the four people appears exactly once.

## Validation

- Production Vite build passed.
- Existing homepage rendering and seven-speaker selection tests: 2 passed, 67 assertions.
- Browser checks and screenshots at 1440px, 768px and 390px: no horizontal overflow, broken images or JavaScript exceptions; all seven faces visually reviewed.
- Evidence: `research/hero-voices-2026-10-02/`.

The previously prepared deployment ZIP predates this hero change. Generate a fresh release before the next upload.

# Indore visual identity — September 2026

Replaced the Jaipur-like scalloped hero, heading ornaments, carousel frames, portrait arches, participation arches and spinning flowers. Kept approved centred section order, taller hero, dates, forms and original logo. The hero now uses an original painted Indore reading scene and stepped cornice frame; interface accents use restrained geometric textile rules, numbered participation cards and clean editorial portraits. Removed the wildlife backdrop; a quiet river-line texture replaces it.

Hero asset: public/images/indore-heritage-hero.png, generated using the built-in imagegen skill. Creative brief: Rajwada and contemporary readers lead; Maheshwar ghats, Mandu water-palace architecture, and distant Ujjain/Mahakal and Omkareshwar temple silhouettes provide regional atmosphere. This is an artistic composite, not a geographically accurate panorama or documentary depiction of each monument. No deity icons, tourism feature strip or new event claims have been added.

Reference research: https://www.mptourism.com/indore-ujjain-omkareshwar-mandu-maheshwar-itinerary.aspx and https://www.shrimahakaleshwar.mp.gov.in/temple . Regional details are interpreted artistically rather than represented as exact architectural drawings.

Desktop 1440px and mobile 390px browser review: no missing images, JavaScript exceptions or horizontal overflow. Build and Blade compilation pass.

Client correction: restored the approved original hero artwork, scalloped frame and taller dimensions, plus the peacock/deer background within Listen & Watch. Local landmark artwork should be introduced selectively within other sections, not used to replace this approved hero. The generated heritage hero is retained as an unused asset.

## Regional artwork added within sections

Approved hero and Listen & Watch wildlife remain unchanged. About now has a restrained Rajwada linework accent; Music & Poetry has an Ujjain/Mahakal-inspired temple outline; visitor information has an original Maheshwar–Omkareshwar–Mandu riverside background. These are artistic interpretations, not documentary elevations or a geographically accurate panorama. Decorative assets have empty alt text and do not imply that these places are festival venues.

Assets: public/images/rajwada-linework.svg, public/images/ujjain-linework.svg, public/images/narmada-heritage-divider.png (and optimized WebP). The panorama was generated with the built-in imagegen skill: wide 3:1 gouache architectural landscape, empty ivory upper area, Maheshwar ghats left, distant Omkareshwar island temple centre, Mandu water-palace architecture right, muted navy/teal/terracotta/gold, no people or text. Source resolution retained for full-width rendering.

Verified desktop 1440x900 and mobile 390x844: all images load, no horizontal overflow or JavaScript errors. Build and Blade compilation pass. Screenshots: research/screenshots/regional-art-desktop.png and regional-art-mobile.png.

Homepage polish: three original SVG experience illustrations, visible 2025 speaker labels with existing roles, four curated archival photographs (applause, grounds, performance, conversation), clearer memory captions, and a single closing registration invitation. Photo dates are labelled generically as archive where not independently established. Approved hero and regional artwork unchanged. Build, Blade compilation, carousel interaction and desktop/mobile overflow checks completed.

## Three-scene hero

Original Indore artwork remains the opening scene. Two original generated panorama assets add Narmada (Maheshwar/Omkareshwar) and Mandu/Ujjain scenery; central event copy, frame, logo and CTA stay fixed. Scene changes every 9 seconds with a 1.6-second crossfade and 10px decorative drift. This is layered 2D motion, not WebGL/true 3D. Regional buildings are artistic interpretations.

Alternative images load on demand and are decoded before display; failures retain the previous scene. Autoplay pauses when offscreen, the tab is hidden, reduced motion is requested or the existing motion control is paused. Manual selectors remain available. Initial illustration works without JS.

Generated using built-in imagegen: navy #173b70 open-centre 3:1 literary panoramas, architecture and readers at outside edges, terracotta/gold/teal/ivory, no text or central objects. Assets: narmada-hero-scene.png and mandu-hero-scene.png plus WebP outputs. Desktop automated checks cover autoplay, manual choice, pause, fixed heading and no overflow; mobile screenshot review also completed.

Hero alternatives revised: both v2 images were generated using the original approved hero as an edit reference. They retain 2172x724 dimensions and transparent alpha, with larger colourful figures and tall architecture. Removed CSS top masking entirely. Original opening image remains unchanged. Replacements are narmada-hero-scene-v2.png and mandu-hero-scene-v2.png, generated with built-in imagegen using exact source composition, transparent centre, bright coral/gold/teal and no sky gradients. Build and template compilation pass.

Hero framing refinement: preserve intrinsic 3:1 proportions at desktop to avoid clipping edge characters, give tablet/mobile separate sizing and mobile upper-edge positioning, tighten central copy spacing, and stop decorative flower rotation. Slow fading slideshow and pause/reduced-motion behavior unchanged. Desktop and mobile browser checks found no missing images, JavaScript errors or horizontal overflow.

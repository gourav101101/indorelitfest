# Legacy journal recovery — 30 September 2026

Source: https://indorelitfest.in/blog.php

## Applied

- Recovered all 16 articles linked by the original blog index, in source order.
- Preserved source titles and full body text, including the source's repeated lines and spelling. No rewriting or translation.
- Downloaded 128 unique original images, used in 140 photo placements.
- Added all original article galleries with full-size lightbox viewing.
- Each card thumbnail and article cover use the first image actually displayed by that original article.
- Removed controller logic that substituted speaker portraits or generated illustrations for article images.
- Kept original image files alongside optimized WebP display images and 640px thumbnails.
- The existing journal theme, search, filters, routes, and related articles remain.

## Source caveats preserved

Five articles use the original site's shared CSS archive photographs: ramayan-dhar-dwivedi, writing-toolkit, vinay_blog, vikas_blog, and kavita_blog. These are not asserted to depict those specific sessions.

The original day-one article uses files in the daytwo image folder. The migration follows the original page assignments, not filename guesses.

The latest user request is to reproduce the old blog's actual images; this supersedes the earlier proposal for AI-styled article thumbnails. No extra image mapping is needed to reproduce the old blog. Different session-specific photos for the five shared-image articles would be a separate editorial change.

## Files and repeatable recovery

1. node scripts/recover-journal.mjs — downloads the index, 16 pages, and original CSS.
2. php scripts/parse-journal.php — extracts the visible article text and image associations, ignoring HTML comments.
3. node scripts/download-journal-images.mjs — downloads originals, validates images and creates optimized assets and resources/data/journal.json.

Raw source snapshots and extraction manifest: research/journal-recovery-2026-09-30/
Runtime dataset: resources/data/journal.json
Image assets: public/legacy/journal/

## Validation

- Production build passed.
- 11 tests passed, 1,623 assertions, including full source-text equivalence and image availability for every article.
- Browser review: journal index, day-one, sharmistha-mukherjee, and kavita_blog at 1440px and 390px. All HTTP 200; no flagged layout issues or browser exceptions.
- Local changes only; not deployed.
## Display cleanup — 30 September 2026

After the user's request to fix noticed blog mistakes:
- Removed repeated opening titles and consecutive duplicate blocks from the displayed article body.
- Removed dangling dashes at the end of displayed titles.
- Journal excerpts now start with actual article content rather than repeated title labels; reading times use the cleaned content.
- Raw recovered article data, source snapshots, photos, and source order remain intact. App\Support\JournalArticle applies presentation cleanup.
- No factual claims, attendance details, names, or photo associations were guessed or rewritten.
- Source photo caveats listed above still apply.
- 12 tests passed, 1,678 assertions, including preservation of raw source text and regression checks for redundant opening headings.
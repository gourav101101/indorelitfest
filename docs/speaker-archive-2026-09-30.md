# Speaker archive and official photographs — 30 September 2026

## Implemented

- `/speakers/archive` now lists all 97 available profile records: 36 from 2025, 23 from 2024 and 38 historical introductions. These are records, not a claim of 97 unique people or a complete list of everyone since 2015.
- 24 cards per page, numbered pages 1–5, Previous/Next, and Show all speakers.
- Name/keyword search and year selection work across the complete directory, including without JavaScript. Search and year selections persist in pagination.
- Existing yearly collections remain accessible. Years without verified collections show an explicit pending state; historical introductions do not receive guessed attendance years.
- Kept the 59 existing portraits from the old festival website and the 2024 speaker PDF.
- Removed externally sourced historical portraits from the displayed profile data. Those profiles use initials until official photographs are matched. Previous image source/credit records are preserved in `research/speaker-photo-review-2026-09-30/previous-external-portraits.json`; source image files were not deleted.

## Selected Photos folder

Inspected `D:\ILF - Content for Website\Selected Photos`: 349 files across the main folder and edition folders. Most filenames are numbers or camera filenames, without speaker labels. The user confirmed there is no filename/name/year mapping.

No unidentified group or event photo has been assigned to a named person. Existing verified brochure/website portraits remain the best available source. Edition folder labels provide collection context, but do not label each person in a photograph.

A filename checklist is saved at `research/speaker-photo-review-2026-09-30/photo-mapping.csv`. Unmatched photos remain pending; no new portraits or attendance years were invented.

## Verification

Production build passed. All 15 application tests passed (2,295 assertions), including complete pagination coverage, search, year filters, empty results and official-image-only historical profiles. Desktop/mobile browser checks cover the main archive, last page, 2024 filter and a historical profile.

## Follow-up photo audit

The user clarified that the remaining work is photo matching, not deployment. No deployment was attempted.

- All 349 supplied images decoded successfully and have numbered local previews.
- EXIF description/title/comment/keyword/subject fields provided no speaker captions. Photographer credits were not treated as names of people pictured.
- Checked exact original-file matches against 59 labelled website/PDF portraits: no matches found. This does not rule out cropped, resized or recompressed versions.
- Created `research/speaker-photo-review-2026-09-30/index.html`: searchable by filename/folder, with links to full-resolution originals. This is a local review tool, not a public website page.
- No additional speaker-photo or attendance-year assignments could be verified in this audit. Existing official portraits and honest pending states remain unchanged.

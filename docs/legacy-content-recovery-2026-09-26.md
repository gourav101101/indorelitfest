# Old website recovery and remaining client details

> Superseded for current scope by [the 27 September client brief review](client-changes-2026-09-27.md). The new brief explicitly requests the journey video as a YouTube link and full bilingual historical profiles. Recovery facts below remain useful, but the earlier limited client request is historical.

## Implementation update — 26 September 2026

The year-wise speaker archive is now implemented locally at `/speakers/archive`. The 2024 collection has 23 speaker cards and individual profiles at `/speakers/archive/2024`; 2025 has the existing 36 profiles. Years 2015–2023 show noninteractive “Profiles coming soon” cards until source content is supplied. Speaker pages no longer link to or embed PDFs; schedule PDFs remain available.

All 23 portraits were extracted from the 2024 source document. Fourteen English biographies retain the source text; nine image-only Hindi biographies have concise, source-based Hindi summaries. These are historical biographies, labelled as the 2024 collection. The source limits portrait resolution; original photographs would improve sharpness but are not required to view the archive.

Website data: `resources/data/speakers-2024.json`. Source preparation script: `research/prepare-speakers-2024.mjs` (uses temporary `pdfjs-dist` and its canvas dependency installed under `research/.pdf-extract-tools`; these are not production dependencies). Desktop/mobile review: `research/speaker-archive-review/`.

The remaining client request for this feedback is earlier-year profiles, corrections to the recovered 2024/2025 content, specified text/image replacements and details of the failing forms. The email `hellohindustan@gmail.com` is confirmed. A festival film was not requested in this feedback and should not be included in the message to the client. The broader historical inventory below is retained as a recovery record, not a list of new client requirements.

Reviewed 26 September 2026. This is the current content request following the client's landing-page approval. Older request documents may list items already supplied.

## Material available — no need to resend everything

| Material | Recovery and use |
| --- | --- |
| 2025 speakers | The old speakers page supplies the 36 profiles already imported into `resources/data/legacy.json`, with biographies and portrait references. Review corrections rather than recreate the whole directory. |
| 2024 speakers | Recovered a 36-page PDF containing a cover and 23 distinct named profiles, including bilingual pages. Saved page text, all 36 page previews, and a profile-to-page review manifest. This is source material for HTML profiles, not a proposal to display a speaker PDF. |
| Journal and story | Existing import contains 16 articles and four about sections. Fresh source pages are saved for comparison; historic organiser statistics need confirmation. |
| Schedule | Working 2025 schedule/e-invite PDF is already available. This is historical material, not the 2026 programme. |
| Photography | Existing downloaded 2025 and mixed-year archive assets remain available. Mixed archive photos do not establish their own edition year. Three linked `archive-2018` photos return 404. |
| Videos | Verified 14 speaker MP4 URLs return HTTP 200, approximately 18–105 MB each. These are speaker clips, not confirmation of the main festival film. Two YouTube embed URLs were also discovered. |
| Contact/social | Public email confirmed by the user on 26 September 2026: `hellohindustan@gmail.com`. Updated the shared website configuration; no further email confirmation is needed. |

Source pages: [home](https://indorelitfest.in/), [speakers](https://indorelitfest.in/speakers.php), [story](https://indorelitfest.in/about.php), [journal](https://indorelitfest.in/blog.php), [schedule](https://indorelitfest.in/schedule.php), [2024 source PDF](https://indorelitfest.in/Speakers%202024%20-%20Indore%20Literature%20Festival.pdf).

## Exact remaining client request

1. **2015–2023 speaker archives:** for each edition that actually took place, provide the speaker list, biographies and portraits, or a brochure/backup/folder containing them. Confirm cancelled or online-only editions so we do not invent an archive. No complete year directories were found in the linked public pages or targeted search. This does not establish that no private backup exists.
2. **2024 review:** confirm the recovered 23-profile list is complete and approve name spellings/biographies. Provide any missing speakers and original portraits if available. Some biographies are image-only Hindi; we can transcribe these from the saved pages. A fresh spreadsheet is not required just to duplicate this PDF.
3. **2025 corrections:** identify which of the existing 36 profiles, images and roles should change, and supply replacements only for those. Confirm the preferred spelling for names that differ across years before merging profiles.
4. **Photo organisation:** identify the year of mixed archive photos and supply missing older-year collections, including the broken 2018 files if available. Include captions and photographer credits where required.
5. **Approved copy/image changes:** send page or section name, current item and replacement text/image. Design approval does not tell us which content is approved. Include any corrections to organiser statistics, contact details and partner credits.
6. **2026 release material:** announcement poster/campaign copy, approved speaker lineup, programme and schedule PDF when ready. The dates (27–29 November 2026), Daly College venue, new logo and five form URLs are already supplied; do not request them again.
7. **Main festival film:** identify the intended film. If a directly hosted video is still required, supply an approved MP4, poster frame and captions, or identify an existing owned file we should use. The discovered speaker clips do not settle this choice.
8. **Forms:** identify the failing form/button and the device/browser or exact error. Ask the form owner to check public responder access, whether responses are open, and any sign-in/file-upload requirement. Signed-out checks reached four supplied 2026 forms, while Open Mic returned a sign-in/cookie barrier. We cannot change Google Forms owner settings from website code. No account password is needed.
9. **Visitor information, if it should appear:** confirm entry/registration rules, timings, gate/check-in instructions, parking and accessibility details. Historical venue information alone cannot establish 2026 arrangements.

For launch separately: identify hosting/deployment access and who approves the final staging site. This is operational information, not missing legacy content.

## Problems found and boundaries

- Old form links differ from the supplied 2026 links; one discovered old link is an edit URL. Do not replace current form links with these obsolete sources.
- The linked 2022 schedule PNG and three 2018 archive photos return 404.
- The old homepage advertises the 2025 dates. Do not overwrite the confirmed 2026 dates.
- Follow-up implementation now provides year cards and HTML profiles for 2024/2025. This work updates the local site; production deployment is separate.
- PDF text extraction is partial. Empty extracted text means an image-based page, not a missing biography. Page previews preserve those sources.

## Saved evidence

Folder: `research/legacy-audit-2026-09-26/`.

- `crawl.json`: 25 attempted endpoints, with 23 successful HTML responses; robots.txt and sitemap.xml returned 404.
- `*.txt`: fresh HTML snapshots of the linked public pages.
- `discovered-links.json`: source links, including old form and media URLs.
- `asset-checks.json`: read-only checks of PDFs, speaker videos and broken historical image links.
- `speakers-2024-extracted.json`: selectable page text from the local copy of the source PDF.
- `speakers-2024-review.json`: 23 draft profile names with source pages and extracted text, for review before publishing.
- `2024-page-1.png` through `2024-page-36.png`: rendered source pages; two contact sheets provide quick visual review.

No forms were submitted, no curated content was overwritten, and no public site was deployed by this audit.

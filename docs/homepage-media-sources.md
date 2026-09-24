# Homepage media sources — 19 September 2026

Implemented four additional homepage blocks in `ilf-media-sections.blade.php`; editable data is in `resources/data/home-media.php`.

## Video conversations and sessions
The supplied https://www.youtube.com/HelloHindustan/videos resolves to the Hello Hindustan channel with handle **@indorelitfest**. Read the live channel video listing through the browser; exact title, duration and URL evidence is saved in `research/youtube-verified-links.json`.
- Three video conversations: Rahgir (pu27xuANtLY), Sharmistha Mukherjee (LKdLSV3DvIs), Sanjay Shepherd/Ankush Kumar (yxwuQIIFK48).
- Six session recordings: 5dkVmB6LHkg, lvKkZruFtJ0, wNU8uIGsBFs, EljHLsvCEF8, UGxNYsxTXL8, muIWxyn6rNA.
- Each card links directly to the verified recording and uses its YouTube thumbnail. Images are lazy-loaded; video players are not loaded on homepage entry.
- Videos are labelled 2025 archive based on official listing titles, not as a 2026 programme.
- No separate ILF podcast feed was verified. The podcast-style block is titled **Indore voices / Listen & watch** and clearly says video conversations. No Spotify/Apple badges or invented podcast branding have been added. A genuine podcast feed can be supplied later.
- Thumbnails depend on YouTube image availability; playback takes place on YouTube.

## Attendee comments
Source: https://www.agniban.com/indore-literature-festival-was-success-with-over-5000-spectators-attending-the-final-day-dancing-to-the-songs-of-rahgir/
Published 17 November 2025. The article explicitly names Avinash Pathak, Komal and Yash as attendees. Cards use concise original English summaries, not verbatim quotes or fabricated first-person endorsements. The summary label and source link are visible in the section. Initials are used instead of invented portraits. No attendance statistics are republished.

## News
- Official 2026 announcement: dates, venue and registration taken from the user's client message.
- Dainik Jagran English, 12 December 2025: https://english.dainikjagranmpcg.com/states/madhya-pradesh/anish-kanjilal-illuminates-the-art-of-writing-at-indore-literature/article-10117
- Agniban, 17 November 2025: same article as above; closing-day report.
- Free Press Journal, 1 October 2023: https://www.freepressjournal.in/indore/indore-literature-festival-day-2-we-should-become-patriots-not-nationalists-says-anand-ranganathan
Cards use short original summaries and direct links, not copied article bodies or unlicensed publisher images. Older coverage is explicitly dated.

## Verification
Production build and Laravel suite (7 tests / 219 assertions) pass. Targeted browser report: `research/media-section-checks.json`; screenshots: `research/screenshots/ilf-media-*.png`.

This supplements the client content request: exact video links, initial attendee reflections and initial press coverage have now been sourced. The client can still provide preferred episodes, original approved testimonials, new coverage, podcast feeds and higher-quality assets. The 12th edition announcement poster remains missing.

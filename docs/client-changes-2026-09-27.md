# Client changes — complete review, 27 September 2026

> Implementation update, 28 September: [completed work and all remaining points](client-changes-delivery-2026-09-28.md), [updated page inventory](website-page-inventory-2026-09-28.md), and [client-ready material request](client-message-remaining-2026-09-28.md). This update supersedes the older status and requests below.


This reviews all 33 numbered points in the client's “Detailed Changes” message and its two closing requests. It is a scope and content plan, not a record of completed implementation. No website changes were made during this review.

The direction is clear: retain the approved visual style and motion, but replace generic city imagery with recognisable festival people, activities and Daly College scenes. Give the festival's literary legacy greater prominence, separate historical speakers from the upcoming 2026 lineup, and improve participation content and archive accuracy.

All requested features are feasible. Some can be implemented immediately; others need identifiable source photographs, content or owner-controlled settings. We cannot recover an exact photograph's date/order, a person's attendance year, or an inaccessible form's owner setting just from its appearance.

## All 33 points

| No. | Client request | What we can do and what remains needed |
| --- | --- | --- |
| 1 | Replace Roopmati Mahal/Mandu background with Daly College in the same sketch style | Create a Daly College illustration and replace the relevant homepage scene(s). Need a clear reference photo of the intended building/view; the client can provide it, or we can source a suitable reference. Preserve the recognisable architecture. |
| 2 | Likes the digital-watch countdown | Approval: retain it. The dates are known. The current countdown targets 9:00 AM IST on 27 November; that precise start time is not established by this message, so confirm it or count down to the start of the date. |
| 3 | Add tagline and dates near the top logo | Can implement now: “India's Most Vibrant Literature Festival” and “27-29th November 2026 @Daly College”. Adapt line breaks for mobile without crowding the navigation. No new dates or logo required. |
| 4 | Likes rotating Indori snacks | Approval: preserve the effect and motion-pause/reduced-motion support. |
| 5 | “Meet the voices”: sketch collage of 2–3 prominent speakers | Can design the collage. Need the selected names and identifiable portraits/session images. We can propose a selection from point 33, but should not silently choose the client's priorities. This is separate from the 4–5 homepage profile cards in point 15. |
| 6 | “On the program” is good | Approval: preserve this element. Point 26 still requests a change to the schedule PDF experience. |
| 7 | “Festival moments”: people talking in the stall arena, in sketch style | Can adapt a real festival photo. Need an identified stall-arena photograph; source filenames alone do not establish that a photo shows this activity. |
| 8 | “Take part”: volunteer in the crowd with black ILF T-shirt/logo visible | Can create the requested artistic treatment. Client explicitly says they will supply images. Keep the real person and shirt identity; apply the exact logo separately if necessary for legibility. |
| 9 | New logo in the rotating column's centre | The current CSS already references the supplied new badge. Verify the rendered centre against the client reference and adjust size/visibility if they still see the old treatment; do not ask for this logo again. |
| 10 | About section focuses on literary legacy, not Indore city | Can rewrite using existing festival history and the supplied past-speaker list. Apply this to homepage About and Our Story. Keep practical venue/location references; put city tourism emphasis in Discover Malwa. Ask only for specific legacy milestones they want added. |
| 11 | 11-year journey video as a YouTube link | Need the exact video URL. Current homepage card opens the channel, which does not satisfy this request. This new brief explicitly requests the film; the earlier decision to leave it out of the client message is superseded. No MP4 is required for this YouTube request. |
| 12 | Turning-book loading animation on page changes | Can build a small accessible transition animation for internal navigation. It must clear promptly, respect motion preferences, work with Back/Forward, and leave external links/downloads/forms unaffected. It can provide feedback but cannot actually accelerate loading; do not impose a fixed wait just to show it. |
| 13 | Participation collage based on real volunteering/registration/internship/stall photos | Can compose and artistically adapt the collage. Need correctly identified activity photos; we can shortlist existing assets for the client's selection. Retain recognisable people and roles. |
| 14 | Forms do not open | Investigate each website button, final destination and mobile-browser flow. Supplied URLs already exist. Earlier read-only checks reached four 2026 forms and encountered a sign-in/cookie barrier on Open Mic; these were not submission tests. Need which form fails, the exact error and device/browser. Only the owner can change response acceptance, responder restrictions or required sign-in/upload settings. Recheck during implementation. |
| 15 | Homepage Festival Voices represents prominent speakers since 2015; show 4–5, link to Our Past Speakers | Can change the heading, selections and destination to `/speakers/archive`. Need the preferred 4–5 names/photos; point 33 supplies the overall featured pool. Keep each profile's edition evidence rather than labelling everyone as 2025. |
| 16 | Full Hindi and English introductions for past speakers | Structure supports bilingual biographies, but content is incomplete. 2024 currently has 14 English biographies and nine abridged Hindi biographies, not full bilingual introductions. The source PDF includes further Hindi material that can be transcribed. We can draft translations of available complete sources; need missing originals and a content review. Existing 2025 records also need a completeness check; Shalini Modi has no separate Hindi biography field. |
| 17 | Replace “Explore the 2025 Speakers” with “2026 Speakers”; coming-soon message | Can implement now without a lineup. Recommended: `/speakers` becomes the 2026 page displaying “The Speaker List of 2026 will be out soon”; retain `/speakers/archive/2025` and historical profile URLs. Keep the archive CTA in point 15 and a separate 2026 CTA, so the two destinations are clear. |
| 18 | New Ideas image: change only the distant window view to Daly College's Desai lake | Can edit only that background region while retaining the interior/composition. Need a reference view of the lake and confirmation of the preferred spelling if it will appear in captions. |
| 19 | Open Mic images must show Open Mic participants, not headline speakers | Can replace those images throughout relevant sections. Need labelled Open Mic photographs/filenames. Do not infer participation merely because someone holds a microphone. |
| 20 | Add attendee experiences from sticky notes, videos and publications | Can support image notes, readable text, video links and publication references. Need original scans/photos or transcriptions, exact video/article links, names/attribution and which excerpts to use. Do not turn editorial summaries into invented quotations. |
| 21 | Blog artwork must include the actual featured speaker/session | Can rebuild thumbnails using real speaker/session images and matching artistic treatment. Need article-to-image mapping; portraits already held can help, but they do not replace the requested session photo when one is available. Match captions and alternative text to the final image. |
| 22 | English blogs have English title/body; Hindi blogs have Hindi title/body | Can add correct article language metadata, headings, labels and previews. Current template hardcodes Hindi, which needs fixing. Audit mixed titles as well as bodies. This asks for language consistency, not necessarily two translations of every article; ask only if bilingual versions are also desired. |
| 23 | “Social with us” becomes “Connect with us”; show all social icons | Can rename and add proper accessible icons now. We have Instagram, Facebook, YouTube and X URLs. Confirm any additional official accounts; do not invent LinkedIn/WhatsApp accounts or substitute unrelated profiles. |
| 24 | Mention 90k+ YouTube subscribers | Can add this as the client-supplied milestone. Confirm which channel it belongs to before placement; label it as that channel's milestone rather than implying ILF alone has a separate audience. A live subscriber counter is not requested. |
| 25 | Exact Hello Hindustan logo under Produced by | Need the official Hello Hindustan logo file, ideally SVG or transparent PNG. This is a different asset from the supplied ILF badge; do not redraw the wordmark as a replacement. |
| 26 | Flipbook for schedule PDF | Feasible with page-turn controls, keyboard access and mobile fit. Keep direct open/download access as a fallback. Existing 2025 schedule can be used; a 2026 schedule is only needed when published. Choose a suitable implementation without assuming a paid service is required. Speaker PDFs must stay absent. |
| 27 | Preserve gallery layout but correct day grouping and supplied sequence | Current code groups imported day folders and sorts filenames. Replace that with an explicit ordered photo manifest. Need the authoritative sequence, year and day for each filename (or numbered folders). Maintain the same order in grid, day filters and lightbox; do not deduce dates from filenames alone. |
| 28 | “Chapter 1, 2…” becomes “Season 1, 2…” | Can change the numbered gallery labels now. Do not indiscriminately replace ordinary literary uses of the word “chapter” throughout the site. |
| 29 | Remove “Browse the photo archive” page | Can remove its UI links and separate mixed-photo page. Redirect `/gallery/archive` to `/gallery`, update sitemap and empty-state links. Retain source files and only place their photos in individual seasons once years are verified. This does not mean removing Speaker Archives. |
| 30 | Expand Discover Malwa to Maheshwar, Dhar, Narmadapuram, Ratlam and possibly more | Can expand the existing discovery page. Use wording such as “Discover Malwa & beyond” to accommodate the client's wider state coverage without assuming every destination belongs to Malwa. Need any additional preferred places or client photos; we can research destination copy and references during implementation. |
| 31 | Dedicated volunteer column with activity photos, experiences and explanatory paragraph | Can create a substantial section with photos, real experiences, role description and the existing volunteer CTA. Need photos, testimonials and specific duties/eligibility/timing they want published. “Column” can mean an on-page section; it does not by itself require another page. |
| 32 | Equivalent content for interns, stalls and Open Mic | Can create three matching sections with appropriate forms. Need separate photo/testimonial sets and programme details for each. For interns: roles, duration, eligibility; stalls: categories and enquiry/booking rules; Open Mic: format, selection and timing. Only request fees/certificates/deadlines if the team intends to advertise them. |
| 33 | Prominently feature supplied historical personalities with Hindi/English profiles | Use the full supplied list as the intended pool, not just current-year speakers. Match existing records first, avoiding duplicate spelling variants, and create missing profiles. Need attendance year(s), full source introductions in either language if both are not available, portraits, and preferred names. A name list establishes their intended inclusion but does not establish each year. We can draft translations and research gaps, then flag uncertain details for review. Preserve ensemble acts as acts rather than inventing individual profiles. |

## Speaker list supplied in point 33

The client supplied these 50 entries (spellings preserved here for matching, not silently corrected):

Ruskin Bond; Narendra Kohli; Javed Akhtar; Shabana Azmi; Amish Tripathi; Devdutt Pattnaik; Ashwin Sanghi; Piyush Mishra; Anupam Kher; Kabir Bedi; Annu Kapoor; Deepti Naval; Tarek Fatah; Kishwar Naheed; Taslima Nasreen; Vikram Sampath; Anand Ranganathan; J. Sai Deepak; Neelesh Misra; Mame Khan; Neeraj Aarya’s Kabir Cafe; Gopaldas Neeraj; Raghuvir Chaudhari; Malini Avasthi; Laxmi Narayan Tripathi; Chetan Bhagat; Sonam Wangchuk; Gitanjali J. Angmo; Aabid Soorti; Dr. Kumar Vishwas; Bhawana Somaaya; Vivek Ranjan Agnihotri; Vinay Sahastrabuddhe; Uday Mahurkar; Rahgir; Pyschoshayar - Abhi Munde; Paritosh Tripathi; Divya Prakash Dubey; Sharmistha Mukherjee; Vasundhara; Anshu Gupta; Arun Kamal; Chitra Mudgal; Mamta Kaalia; Rajeev Dogra; Manoj Muntashir; Neelima Dalmia; Naresh Saxena; Gautam Chikarmane; Philippa Kaye.

Several are already present in the 2024/2025 data. Match variants such as Abhi Munde/Abhijeet Munde, Manoj Muntashir/Manoj Muntashir Shukla and Neelima Dalmia/Neelima Dalmia Adhar before adding profiles. Confirm preferred public spelling. Existing archive coverage is not the complete historical list.

## Consolidated material request — avoid asking twice

| Package | Exact material needed | Points |
| --- | --- | --- |
| Venue references | Daly College building view and lake view; client originals preferred, or we can source references | 1, 18 |
| Featured speakers | 2–3 names for the sketch collage; 4–5 for homepage cards; portraits/session images. These selections may overlap | 5, 15, 33 |
| Historical profiles | Name, attendance year(s), role, full biography source, available English/Hindi text, portrait, credit; supply existing brochures/files instead of recreating everything | 16, 33 |
| Activity photos | Clearly identified stall-arena conversations, black-shirt ILF volunteer in crowd, registration, volunteering, interns, stalls and Open Mic; client already promised volunteer images | 7, 8, 13, 19, 31, 32 |
| Journey video | Exact YouTube URL for the 11-year journey film; no MP4 needed | 11 |
| Experiences | Attendee and volunteer/intern/stall/Open Mic testimonials, sticky-note scans, video links, publication links, names/attribution and chosen excerpts | 20, 31, 32 |
| Journal images/language | Article-to-session-image mapping; missing English originals if there are English articles; corrected titles where needed | 21, 22 |
| Gallery order | Ordered filename list with year/day, or numbered day folders. Example: `2025, Day 1, 001, photo-name.jpg` | 27 |
| Producer and social | Exact Hello Hindustan logo; additional official social URLs beyond the four held; channel to credit for 90k+ | 23–25 |
| Forms problem | Failing form name(s), error/screenshot, device/browser, whether opening inside WhatsApp/Instagram; owner checks response/access settings | 14 |
| Participation copy | What volunteers/interns do, stall arrangements and Open Mic format; real experiences to accompany each | 31, 32 |

## Small decisions to settle

1. Recommend four distinct sections within the existing participation page for volunteers, interns, stalls and Open Mic. Confirm only if the client instead wants separate pages.
2. Recommend retaining the navigation title “Discover Malwa” and using “Malwa & beyond” in the expanded page copy. Confirm if the client prefers a full navigation rename.
3. Recommend `/speakers` for upcoming 2026 speakers and `/speakers/archive` for historic voices. Existing 2025 profiles remain archived, not relabelled.
4. Confirm the opening time only if a time-specific countdown is required; dates and venue already exist.

We can proceed with these recommendations during implementation unless the user/client chooses another arrangement. Missing optional preferences should not block unrelated fixes.

## Already held — do not request again

- New ILF logo, 27–29 November 2026 dates, Daly College venue, confirmed `hellohindustan@gmail.com` email and five supplied form URLs.
- 36 imported 2025 profiles and 23 recovered 2024 profiles/portraits; they still need full bilingual coverage and editorial corrections where indicated.
- Existing journal text, photo archive and 2025 schedule PDF.
- Instagram, Facebook, YouTube and X link configuration.

## Client's two closing requests

**Total pages, titles and links:** see [the complete current page inventory](website-page-inventory-2026-09-27.md), including individual speaker profiles and journal articles. Local preview links work on this computer only. We need a hosted staging URL to send the client usable redesign links. Do not present old-live-domain URLs as if these new pages are deployed.

**All required content and images:** the consolidated package table above covers the numbered requests. Extra poster files, fees, a main-film MP4, new form URLs or a second ILF logo should not be added to the request unless separately needed. The specific journey YouTube URL and Hello Hindustan logo are new requirements in this brief.

## Suggested implementation order

1. Apply text/navigation changes, correct the 2026 versus archive speaker flow, add social icons and rename gallery season labels; preserve approvals 2, 4 and 6.
2. Investigate the forms, add the book transition and schedule flipbook with accessible fallbacks, and introduce ordered gallery data.
3. Build participation sections, full bilingual speaker coverage and article language handling from verified content.
4. Produce the source-based artwork and testimonials as identified photos/video links arrive.
5. Check mobile/desktop layouts, all forms without submitting unsolicited responses, gallery order/lightbox, profile language switching, navigation, reduced motion and schedule fallback. Send a reviewable staging link and updated final page list.

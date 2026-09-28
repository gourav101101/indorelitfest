# Client feedback — 25 September 2026

Update, 26 September: the requested year-card archive and HTML speaker profiles are implemented locally. The 2024 collection includes 23 recovered profiles with portraits, and 2025 retains 36 profiles. Earlier-year cards are marked “Profiles coming soon.” No speaker PDF links/viewers remain in the website templates. Details: [implementation record](legacy-content-recovery-2026-09-26.md). Statements below about pending implementation describe the earlier review.

The client approves the listed landing-page designs and mobile presentation. Content and images still need editing; this is not final content approval.

## Logo

The supplied `LOGO 322.png` is saved as `public/images/indore-literature-festival-badge.png`. It now replaces the old logo in the navbar, homepage hero, footer templates, favicon and decorative CSS reference. The original old assets remain on disk but are no longer referenced by frontend source.

## Speaker archive request

Replace the PDF-led archive with year cards in the gallery's format: 2015 Speakers, 2016 Speakers, and subsequent years. Each year should lead to a speaker directory and individual biographies, using the current speaker page format. PDFs should remain for schedules only.

This change is requested but not yet implemented in this feedback-interpretation pass. The existing 2024 speaker PDF remains visible until the archive implementation is changed. We have 36 current 2025 profiles; earlier profiles and year assignments must not be invented.

Ask for a spreadsheet with year, speaker name, approved biography, role, portrait file, photo credit and any approved links. Confirm whether repeated speakers should have year-specific biographies, whether 2026 belongs in the archive before the edition occurs, and whether the team can supply the 2024 PDF content as editable records or wants it extracted for approval. Ask for page-by-page copy/image replacements as well.

## Form investigation — 26 September 2026

The local participation page renders all five supplied Google Forms links correctly. Read-only HTTP checks followed their redirects without signing in or submitting responses:

| Form | Result |
| --- | --- |
| Festival registration | HTTP 200, matching 2026 registration title |
| Open Mic | HTTP 401; Google response asks for sign-in and necessary cookie access |
| Stall booking | HTTP 200, matching 2026 stall title |
| Volunteer | HTTP 200, matching 2026 volunteer title |
| Internship | HTTP 200, matching 2026 internship title |

This confirms a signed-out access barrier on Open Mic, not the exact owner setting causing it. It does not verify submission or prove the other forms work in every browser. Keep supplied URLs unchanged until the owner confirms any replacement.

Ask which buttons failed, the exact error/screenshot, device/browser, whether the link opened inside WhatsApp/Instagram, and whether they were signed into Google. Ask the form owner to confirm intended public access, responder restrictions, response acceptance, and any sign-in/file-upload requirement. No account password is needed.

Validation after logo replacement: Vite build and all 7 application tests passed (219 assertions); no old-logo references remain in frontend source.

## Legacy recovery follow-up

See [the current recovery report](legacy-content-recovery-2026-09-26.md). The 2024 source PDF has now been extracted into selectable text and page previews, with 23 distinct named profiles mapped for review. Ask for corrections and missing records rather than requesting the entire 2024 content again. The archive implementation remains pending.

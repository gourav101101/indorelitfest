# Speaker attendance update — 1 October 2026

The client-supplied Season 1–11 list is the attendance source in `resources/data/speaker-attendance.json`. Each original supplied name is retained alongside an explicit profile slug. Existing source collections are not rewritten.

## Published behavior

- 188 season appearances across 2015–2025.
- 144 consolidated profile entries in the main directory; similar but unconfirmed names are kept separate (see below).
- Cards in the archive, annual collections, and selected homepage speakers show all supplied attendance years.
- Profiles show an edition count and links to the relevant annual speaker collections.
- A selected year highlights that year on the matching cards without hiding other attendance years.
- Server-side name/alias search, year filtering, pagination, and Show all remain available.
- All 11 annual collections are populated. 2026 remains an upcoming lineup.
- One canonical profile URL per consolidated identity; original website, historical, and brochure URLs remain accessible.
- Existing biographies, bilingual content, journal relationships and photos are reused. Seven already-labelled client portraits from the homepage are also available in the directory/profile.
- New names without a supplied biography or verified portrait have attendance details and initials; no biographies or portraits were invented.
- Old profiles omitted from the new roster remain directly accessible, but do not receive attendance years inferred from older collections.

## Supplied season counts

| Season | Year | Speakers |
| --- | --- | --- |
| 1 | 2015 | 21 |
| 2 | 2016 | 12 |
| 3 | 2017 | 13 |
| 4 | 2018 | 8 |
| 5 | 2019 | 18 |
| 6 | 2020 | 14 |
| 7 | 2021 | 23 |
| 8 | 2022 | 14 |
| 9 | 2023 | 14 |
| 10 | 2024 | 18 |
| 11 | 2025 | 33 |

## Identity handling

Clear variations in the supplied list are mapped explicitly, including Aabid/Abid Surti, Manoj Muntashir/Manoj Muntashir Shukla, and Lakshmi/Lakmi/Laxmi Narayan Tripathi. Other mappings reuse the existing named source profiles, including Aman Axar/Aman Akshar and Nilotpal/Neelotpal Mrinal.

The original 2025 Manoj Ranjan Tripathi profile and 2024 Manoj Rajan Tripathi profile describe the same journalist, Code Kakori author, and screenwriter. They now share one attendance record (2021, 2024, 2025), canonical path, and the latest existing biography. Both original routes remain accessible.

Unconfirmed similar names are intentionally separate:
- Amish Tripathi (2016) and Amishy Tripathi (2020).
- Manisha Kulshreshth (2020) and Manish Kulshreshth (2023).

The clarification reply focused on displaying years and did not confirm these identities. No identity claim was inferred from it. Original client spellings remain searchable, including stage names and country labels.

## Verification

- Production CSS build passed.
- Application suite: 21 tests passed, 5,389 assertions.
- After fixing a homepage portrait-wrapper styling conflict, the affected card/gallery checks passed again (3 tests, 1,249 assertions).
- Every listed canonical profile and original archived profile route was exercised.
- All annual collection slugs and counts were compared with the supplied roster.
- Browser checks at 1440px and 390px: main archive, filtered repeat speaker, 2015 and 2024 collections, returning-speaker profile, new attendance-only profile, and homepage. No horizontal overflow, broken images, or browser exceptions.
- Screenshots/results: `research/speaker-attendance-2026-10-01/`.

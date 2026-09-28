# Site visual review

The [page gallery](../research/site-review/index.html) contains desktop and phone previews plus page overviews for all 80 public pages: 18 main/collection pages, 36 speaker biographies, 16 journal stories, and 10 older gallery empty states. Each card links to its live page. Search by name or URL.

The inner pages now carry the homepage's navy backdrop, ivory paper, gold and terracotta arches, existing festival illustrations, portrait frames, and illustrated invitation. Detail pages keep readable biography and article layouts. The previously approved compact navigation is retained.

The document pages provide Open and Download links and an optional embedded reader. The illustrations on those cards are decorative, not document previews. Earlier gallery years remain clearly marked as not indexed. No speakers, photographs, programme details, or archive content were invented.

Validation: all 80 URLs returned HTTP 200 and passed checks for horizontal overflow, missing loaded images, one page heading, and shared navigation/footer at 1440px and 390px. Interaction checks cover menu breakpoints down to 320px, search, filters, the gallery viewer, biography tabs, FAQs, form validation, contrast on dark cards, and PDF access. Raw results are in `research/site-review/checks.json` and `interactions.json`. Long overviews may be capped at 16,000px and show the default filter state; the live links provide the complete interactive page.

To view locally, run `php -S 127.0.0.1:8010 -t research/site-review` from the repository root and open `http://127.0.0.1:8010`. The main website should run on port 8000.

To regenerate, use a separate Chrome profile with remote debugging on port 9445, then run `node research/review-site.mjs` and `node research/check-site-interactions.mjs`. To refresh specific screenshots, pass `--paths=/schedule,/speakers/archive` to the review script.

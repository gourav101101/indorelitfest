# Indore Literature Festival

A responsive Indore and Malwa festival website built with Laravel 13, Blade, Vite and small native JavaScript interactions. The public pages render on the server and do not need a Node.js process on Hostinger.

## Local preview

The project lives in `D:/indorelitfest`. It is independent of `D:/Xampp/htdocs/fibro`; that project was used only as an architectural reference. Local preview: **http://127.0.0.1:8008**.

```powershell
composer install
npm.cmd ci
Copy-Item .env.example .env # only on a new installation; never overwrite an existing .env
php artisan key:generate
npm.cmd run build
php artisan serve --host=127.0.0.1 --port=8008
```

Use PHP 8.3+ and Node 22.12+ or 24 for the build. The local environment already has its own application key. Public content uses JSON; sessions and cache use files, so no database is required for this version. This build does not include an admin dashboard, payments or a mailing-list service.

## Where to edit

| Area | Location |
| --- | --- |
| Routes | `routes/frontend.php` |
| Public controller | `app/Http/Controllers/Frontend/FestivalController.php` |
| Homepage and inner pages | `resources/views/frontend/pages/` |
| Shared layout, navigation and cards | `resources/views/frontend/layouts/`, `resources/views/frontend/partials/` |
| Homepage styling and controls | `resources/css/frontend/home-2026.css`, `resources/js/frontend/home-2026.js` |
| Shared styling | `resources/css/frontend/app.css`, `festival.css`, `composition.css` |
| Search, mobile menu, lightbox, back-to-top | `resources/js/frontend/app.js` |
| Imported speaker, about and article content | `resources/data/legacy.json` |
| Dates, video and participation settings | `config/festival.php` and `.env` |
| Original generated illustrations | `public/images/` |
| Migrated photographs and original PDFs | `public/legacy/` |
| Locally hosted fonts | `public/fonts/` |

Run `npm.cmd run build` after CSS/JavaScript or new image changes. Blade changes render without an asset build. WebP assets are generated next to source images. To reprocess a replaced image, remove only its generated WebP before rebuilding. All public site links stay in the same tab; the downloadable PDF explicitly offers a download.

## Validation

```powershell
npm.cmd run lint
npm.cmd run build
php artisan test
composer validate --no-check-publish
```

Feature tests cover public routes, all 52 imported speaker/article detail pages, the confirmed 2026 dates and five supplied forms, optional announcement poster, archive labels, missing-resource responses, legacy redirects, sitemap and portrait availability. Current homepage browser evidence is in `research/screenshots/ilf-2026-*.png` and `research/home-2026-checks.json`.

## Content and deployment

- [Client brief coverage and remaining assets](docs/content-and-client-checklist.md)
- [Current 2026 homepage, Jaipur reference and artwork prompt](docs/homepage-2026-reference.md)
- [Hostinger deployment](docs/hostinger-deployment.md)
- [Generated artwork and prompts](docs/artwork.md)
- [Updated implementation plan](research/indore-lit-fest-plan.md)

The 12th edition is **27–29 November 2026 at Daly College, Indore**. All five client-supplied Google Forms are configured. The 2025 programme and participants remain explicitly archived. The new announcement PNG, main video/captions and 2026 programme/speakers are still required. Set `FESTIVAL_POSTER` to the supplied poster's public relative path when it arrives. This repository is the local preview; no production deployment has been performed.

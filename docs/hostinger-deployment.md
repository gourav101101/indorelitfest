# Hostinger deployment

This application uses Laravel 13 + Blade and prebuilt Vite assets. Production needs PHP 8.3 or newer compatible with `composer.lock`; it does **not** require a running Node server. Confirm the actual hosting plan offers the required PHP extensions, writable application storage and an appropriate web document root.

## Build and prepare

```text
npm ci
npm run build
composer install --no-dev --optimize-autoloader
composer check-platform-reqs --no-dev
```

Run the production Composer install on a separate deployment copy or in the target environment; the development workspace retains its testing tools. Deploy the built `public/build` folder and its manifest together. Include the WebP images, fonts, imported PDFs and `resources/data/legacy.json`.

Exclude `node_modules`, `research`, browser profiles, local `.env`, tests and local runtime caches from the upload. Retain `vendor`, all application source, configuration, routes, views, bootstrap files and writable storage directories. Do not upload any other project's credentials or application data.

## Preferred document-root arrangement

Keep the entire application outside the public document root and point the domain to its `public` directory. Only files under `public` should be web-accessible. The standard `public/index.php` already supports this arrangement.

## When the account requires public_html

Use sibling directories:

```text
<domain-directory>/
  indorelitfest/         app, bootstrap, config, resources, routes, storage, vendor, .env, artisan
  public_html/          contents of the application's public directory
```

Copy the contents of `public/` (including `.htaccess`) to `public_html/`. Use `deployment/index.php` as `public_html/index.php`. It points to the private sibling `indorelitfest` directory and tells Laravel the correct public path. Do not put `.env`, `vendor` or the entire application in `public_html`.

## Production configuration

For a **new installation**, copy `deployment/.env.hostinger.example` to `.env` in the private application directory. For an existing installation, edit its existing `.env` and preserve `APP_KEY`. Do not upload your local development `.env`. Configure:

```dotenv
APP_NAME="Indore Literature Festival"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-confirmed-domain.example
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
SESSION_SECURE_COOKIE=true
```

Generate a unique `APP_KEY` once for the new environment. Never rotate it during a routine redeployment. Set approved festival values in `.env`:

- `FESTIVAL_DATES`, `FESTIVAL_VENUE`
- `FESTIVAL_REGISTRATION_URL`, `FESTIVAL_OPEN_MIC_URL`, `FESTIVAL_STALL_URL`, `FESTIVAL_VOLUNTEER_URL`, `FESTIVAL_INTERNSHIP_URL`
- `FESTIVAL_JOURNEY_YOUTUBE=https://www.youtube.com/watch?v=aPCUji_k5BQ` for the supplied journey film. Leave `FESTIVAL_FILM` empty unless a separate, hosted MP4 is intentionally supplied.

Leave unknown values empty; the site renders pending states. The website currently does not store submissions: participation goes to the configured Google Forms and enquiries use email/phone. Consequently this version needs no database or queue worker. Add dedicated migrations and validation if an internal registration or admin system is later commissioned.

From the private application directory:

```text
php artisan key:generate
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

For the split `public_html` arrangement, set `APP_PUBLIC_PATH` to the absolute `public_html` path so CLI commands share the same public path as web requests. This setting is supported in `bootstrap/app.php`.

For example: `APP_PUBLIC_PATH=/home/u123456789/domains/your-domain.com/public_html`. Replace the account and domain with the actual path shown by your hosting account; do not use a Windows path. Set this **before** running the cache commands above. Never upload `bootstrap/cache/*.php` or compiled files from `storage/framework/views` from your computer: they can contain local paths and development package references. Keep the `.gitignore` files so Git deployments retain the empty runtime directories.

Ensure `storage/` and `bootstrap/cache/` are writable by the PHP process. Use the host's normal ownership and permissions, not blanket world-writable settings.

## Diagnose a failed upload

From the private application directory over SSH, run:

```sh
php -v
composer check-platform-reqs --no-dev
php deployment/check.php
```

The checker reports missing dependencies, extensions, writable directories, production configuration and built assets without printing secrets. It checks CLI PHP; confirm the website's PHP version separately in hPanel. This project's locked dependencies require PHP 8.3 or newer; do not bypass Composer platform checks. Hostinger documents PHP version selection in its [PHP settings help](https://support.hostinger.com/en/collections/3185619-php-versions).

If an older upload omitted directories, create them before Composer installation:

```sh
mkdir -p bootstrap/cache storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs
```

| Symptom | What to check |
| --- | --- |
| 403, directory listing, or Hostinger default page | Only the contents of `public/` belong in `public_html`; use `deployment/index.php` for the sibling layout above. Remove the host's placeholder index page if it takes precedence. |
| 500 / missing autoload.php | Upload `vendor/` from a production Composer install or run Composer on the server. Confirm the sibling folder is named `indorelitfest`. |
| 500 / missing encryption key | Generate `APP_KEY` once on a new installation, then rebuild configuration cache. Preserve existing keys on redeploys. |
| 500 / missing database or sessions table | Set `SESSION_DRIVER=file`, `CACHE_STORE=file`, `QUEUE_CONNECTION=sync`, then run `php artisan config:clear`. This site does not need MySQL or SQLite tables. |
| 500 / permission or missing view-cache directory | Ensure the runtime directories above exist and PHP can write to them. |
| 500 / Vite manifest missing | Upload the entire locally built `public/build` to `public_html/build` and set the correct `APP_PUBLIC_PATH`. |
| Page loads without CSS or JS | Remove a stale `public_html/hot`, upload the built assets, and verify their URLs return 200. |
| Homepage works but other pages return 404 | Include the hidden `public/.htaccess` file in `public_html`. |
| Changes to .env have no effect | Run `php artisan config:clear`, then rebuild `config:cache` on the server. |

For unexplained errors, read the newest error in the server's `storage/logs/laravel.log` (or PHP error log if Laravel cannot start). Keep `APP_DEBUG=false` on the live website. Local workspace logs do not establish the cause of a server failure.

## Final checks

Review HTTPS, homepage assets, all public pages, Hindi typography, PDF rendering/download, mobile navigation, speaker/article search, photo modal, 404, redirects and `/sitemap.xml`. Verify every live Google Form and the directly hosted video with client-approved values. Confirm no stale `public/hot` file is uploaded. No production deployment has been performed from this workspace.

## Prepared release copy

Run `node scripts/prepare-release.mjs` after a successful build. It creates a new timestamped copy under `deployment/releases/` with an allowlist of application files and built public assets, plus empty runtime directories and a file manifest. It excludes the local environment, development dependencies, research, database files and runtime caches. The copy includes **no vendor directory**: run the production Composer install shown above inside that copy (or on the target host) before serving it. The script never changes an existing release or deploys anything.

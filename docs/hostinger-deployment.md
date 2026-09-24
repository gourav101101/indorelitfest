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

Create a production `.env` from the example, then configure:

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
- `FESTIVAL_FILM=media/11-years-film.mp4` after copying the actual MP4 into the public media directory

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

Ensure `storage/` and `bootstrap/cache/` are writable by the PHP process. Use the host's normal ownership and permissions, not blanket world-writable settings.

## Final checks

Review HTTPS, homepage assets, all public pages, Hindi typography, PDF rendering/download, mobile navigation, speaker/article search, photo modal, 404, redirects and `/sitemap.xml`. Verify every live Google Form and the directly hosted video with client-approved values. Confirm no stale `public/hot` file is uploaded. No production deployment has been performed from this workspace.

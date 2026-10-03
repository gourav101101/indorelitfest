<?php

// Run privately over SSH: php deployment/check.php (never a web endpoint).
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$root = dirname(__DIR__);
$failures = 0;
$check = function (bool $ok, string $message) use (&$failures): void {
    echo ($ok ? '[OK] ' : '[FAIL] ').$message.PHP_EOL;
    if (! $ok) {
        $failures++;
    }
};

$check(PHP_VERSION_ID >= 80300, 'PHP 8.3+ required; CLI is '.PHP_VERSION.' (also check hPanel web PHP).');
foreach (['ctype', 'curl', 'dom', 'fileinfo', 'filter', 'hash', 'mbstring', 'openssl', 'pcre', 'PDO', 'session', 'tokenizer', 'xml'] as $extension) {
    $check(extension_loaded($extension), 'PHP extension: '.$extension);
}
$check(is_file($root.'/.env'), 'Private application .env exists.');
$check(is_file($root.'/vendor/autoload.php'), 'Composer dependencies exist.');
foreach (['bootstrap/cache', 'storage/framework/cache/data', 'storage/framework/sessions', 'storage/framework/views', 'storage/logs'] as $directory) {
    $check(is_dir($root.'/'.$directory) && is_writable($root.'/'.$directory), $directory.' exists and is writable.');
}
if ($failures) {
    exit(1);
}

try {
    require $root.'/vendor/autoload.php';
    $app = require $root.'/bootstrap/app.php';
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    $check((bool) config('app.key'), 'APP_KEY is set; generate once for a new installation.');
    $check(config('app.env') === 'production', 'APP_ENV=production.');
    $check(config('app.debug') === false, 'APP_DEBUG=false.');
    $url = (string) config('app.url');
    $host = parse_url($url, PHP_URL_HOST);
    $check(str_starts_with($url, 'https://') && (bool) $host && ! in_array($host, ['localhost', '127.0.0.1']) && ! str_ends_with($host, '.example'), 'APP_URL contains the real HTTPS domain.');
    $check(config('session.driver') === 'file', 'SESSION_DRIVER=file; this site needs no database.');
    $check(config('cache.default') === 'file', 'CACHE_STORE=file.');
    $check(config('queue.default') === 'sync', 'QUEUE_CONNECTION=sync.');
    $check(config('session.secure') === true, 'SESSION_SECURE_COOKIE=true for HTTPS.');
    $check(is_file(public_path('index.php')) && is_file(public_path('.htaccess')), 'Public path contains index.php and .htaccess; check APP_PUBLIC_PATH for split hosting.');
    $check(! is_file(public_path('hot')), 'No development Vite hot file in public directory.');
    $manifestPath = public_path('build/manifest.json');
    $manifest = is_file($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
    $check(is_array($manifest) && count($manifest) > 0, 'Built Vite manifest exists; upload public/build after npm run build.');
    foreach (is_array($manifest) ? $manifest : [] as $entry) {
        foreach (array_merge([$entry['file'] ?? ''], $entry['css'] ?? [], $entry['assets'] ?? []) as $file) {
            $check($file !== '' && is_file(public_path('build/'.$file)), 'Built asset: '.$file);
        }
    }
    foreach (['client-media-2026-09.json','gallery-2025.json','gallery-collections.json','home-speaker-selection.json','journal-videos.json','journal.json','legacy.json','participation.json','past-speakers.json','prominent-speaker-links.json','prominent-speakers.json','schedule-pages.json','speaker-attendance.json','speaker-biographies.json','speakers-2024.json'] as $file) {
        $dataPath = resource_path('data/'.$file);
        $valid = is_file($dataPath);
        if ($valid) {
            json_decode(file_get_contents($dataPath), true);
            $valid = json_last_error() === JSON_ERROR_NONE;
        }
        $check($valid, 'Content data exists and is valid JSON: '.$file);
    }
    echo 'Public directory: '.public_path().PHP_EOL;
    echo 'Configuration cache: '.($app->configurationIsCached() ? 'present; rebuild on this server after .env changes' : 'absent').PHP_EOL;
} catch (Throwable $exception) {
    $check(false, 'Laravel failed to bootstrap ('.get_class($exception).'). Check storage/logs/laravel.log or the private PHP error log.');
}

echo $failures ? 'Fix the failed checks and run again.'.PHP_EOL : 'Deployment checks passed. Verify the site in your browser.'.PHP_EOL;
exit($failures ? 1 : 0);

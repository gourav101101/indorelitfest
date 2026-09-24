<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(web: __DIR__.'/../routes/web.php', commands: __DIR__.'/../routes/console.php', health: '/up')
    ->withMiddleware(function (Middleware $middleware): void {})
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->create();

// Works with both uncached and cached configuration on shared hosting.
$app->afterBootstrapping(\Illuminate\Foundation\Bootstrap\LoadConfiguration::class, function () use ($app): void {
    if ($publicPath = config('app.public_path')) $app->usePublicPath($publicPath);
});
return $app;

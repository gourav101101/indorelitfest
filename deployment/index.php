<?php
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));
$applicationRoot = dirname(__DIR__).'/indorelitfest';
if (file_exists($maintenance = $applicationRoot.'/storage/framework/maintenance.php')) {
    require $maintenance;
}
require $applicationRoot.'/vendor/autoload.php';
$app = require_once $applicationRoot.'/bootstrap/app.php';
$app->usePublicPath(__DIR__);
$app->handleRequest(Request::capture());

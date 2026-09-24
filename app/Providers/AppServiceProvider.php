<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}
    public function boot(): void
    {
        View::composer('frontend.*', function ($view) {
            $view->with('festival', config('festival'));
            $view->with('image', function (string $path): string {
                $optimized=preg_replace('/\.(jpe?g|png)$/i','.webp',$path);
                return asset(file_exists(public_path(ltrim($optimized,'/'))) ? ltrim($optimized,'/') : ltrim($path,'/'));
            });
        });
    }
}

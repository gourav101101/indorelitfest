<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\FestivalController;

Route::get('/', [FestivalController::class, 'home'])->name('home');
Route::get('/speakers', [FestivalController::class, 'speakers'])->name('speakers');
Route::get('/speakers/archive', [FestivalController::class, 'archive'])->name('speakers.archive');
Route::get('/speakers/past/{slug}', [FestivalController::class, 'pastSpeaker'])->name('speakers.past.profile');
Route::get('/speakers/archive/{year}', [FestivalController::class, 'speakerYear'])->where('year', '2024|2025')->name('speakers.year');
Route::get('/speakers/archive/{year}/{slug}', [FestivalController::class, 'archiveSpeaker'])->where('year', '2024|2025')->name('speakers.archive.profile');
Route::get('/speakers/{slug}', [FestivalController::class, 'speaker'])->name('speaker');
Route::get('/journal', [FestivalController::class, 'journal'])->name('journal');
Route::get('/journal/{slug}', [FestivalController::class, 'article'])->name('article');
Route::get('/gallery', [FestivalController::class, 'gallery'])->name('gallery');
Route::get('/gallery/{season}', [FestivalController::class, 'season'])->name('season');
foreach (['about','schedule','malwa','contact','participate','film','faq','experiences','visit','community','media'] as $page) {
    Route::get('/'.$page, [FestivalController::class, 'page'])->defaults('page', $page)->name($page);
}
foreach (['index.php'=>'/', 'about.php'=>'/about', 'speakers.php'=>'/speakers', 'schedule.php'=>'/schedule', 'blog.php'=>'/journal', 'contact.php'=>'/contact'] as $old=>$new) {
    Route::redirect('/'.$old, $new, 301);
}
foreach (['day-one','day-two','day-three','sharmistha-mukherjee','ramayan-dhar-dwivedi','writing-toolkit','one-nation-one-election','mera-rachna-dharm','uday-mahurkar','ambi-parameswaran','rahagir','new-age-writing','budding-authors','vinay_blog','vikas_blog','kavita_blog'] as $slug) {
    Route::redirect('/'.$slug.'.php','/journal/'.$slug,301);
}
Route::get('/sitemap.xml', [FestivalController::class, 'sitemap']);
